(() => {
  'use strict';

  const SIZE = 4;
  const STORE_BEST = 'g2048_best';
  const STORE_THEME = 'g2048_theme';

  const boardEl = document.getElementById('board');
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const undoBtn = document.getElementById('undoBtn');
  const newBtn = document.getElementById('newBtn');
  const shareBtn = document.getElementById('shareBtn');
  const themeBtn = document.getElementById('themeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayDesc = document.getElementById('overlayDesc');
  const overlayBtn = document.getElementById('overlayBtn');

  const DARK = [
    null,
    { bg: '#444441', fg: '#D3D1C7', border: '#B4B2A9' },
    { bg: '#633806', fg: '#FAC775', border: '#EF9F27' },
    { bg: '#712B13', fg: '#F5C4B3', border: '#F0997B' },
    { bg: '#72243E', fg: '#F4C0D1', border: '#ED93B1' },
    { bg: '#3C3489', fg: '#CECBF6', border: '#AFA9EC' },
    { bg: '#0C447C', fg: '#B5D4F4', border: '#85B7EB' },
    { bg: '#085041', fg: '#9FE1CB', border: '#5DCAA5' },
    { bg: '#27500A', fg: '#C0DD97', border: '#97C459' },
    { bg: '#791F1F', fg: '#F7C1C1', border: '#F09595' },
    { bg: '#26215C', fg: '#CECBF6', border: '#7F77DD' },
    { bg: '#04342C', fg: '#9FE1CB', border: '#1D9E75' }
  ];
  const LIGHT = [
    null,
    { bg: '#F1EFE8', fg: '#444441', border: '#B4B2A9' },
    { bg: '#FAEEDA', fg: '#854F0B', border: '#EF9F27' },
    { bg: '#FAECE7', fg: '#993C1D', border: '#F0997B' },
    { bg: '#FBEAF0', fg: '#993556', border: '#ED93B1' },
    { bg: '#EEEDFE', fg: '#534AB7', border: '#AFA9EC' },
    { bg: '#E6F1FB', fg: '#185FA5', border: '#85B7EB' },
    { bg: '#E1F5EE', fg: '#0F6E56', border: '#5DCAA5' },
    { bg: '#EAF3DE', fg: '#3B6D11', border: '#97C459' },
    { bg: '#FCEBEB', fg: '#A32D2D', border: '#F09595' },
    { bg: '#EEEDFE', fg: '#3C3489', border: '#7F77DD' },
    { bg: '#E1F5EE', fg: '#085041', border: '#1D9E75' }
  ];

  let grid = [];
  let score = 0;
  let best = Number(localStorage.getItem(STORE_BEST) || 0);
  let history = [];
  let over = false;
  let won = false;
  let overlayMode = '';
  let lastSpawn = -1;

  function currentTheme() {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme, persist = true) {
    document.documentElement.dataset.theme = theme;
    if (persist) localStorage.setItem(STORE_THEME, theme);
    themeBtn.setAttribute('aria-label', theme === 'light' ? '切换到深色主题' : '切换到浅色主题');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'light' ? '#f7f7f5' : '#0f1115');
  }

  function colorFor(value) {
    const map = currentTheme() === 'light' ? LIGHT : DARK;
    const idx = Math.min(Math.round(Math.log2(value)), map.length - 1);
    return map[idx] || map[map.length - 1];
  }

  function render() {
    boardEl.innerHTML = '';
    for (let i = 0; i < SIZE * SIZE; i++) {
      const value = grid[i];
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('role', 'gridcell');
      if (value) {
        const c = colorFor(value);
        cell.classList.add('filled');
        cell.textContent = value;
        cell.style.setProperty('--tile-bg', c.bg);
        cell.style.setProperty('--tile-fg', c.fg);
        cell.style.setProperty('--tile-border', c.border);
        if (i === lastSpawn) cell.classList.add('new');
      }
      boardEl.appendChild(cell);
    }
    lastSpawn = -1;
    scoreEl.textContent = score;
    bestEl.textContent = best;
    undoBtn.disabled = history.length === 0;
  }

  function spawn() {
    const empty = [];
    for (let i = 0; i < SIZE * SIZE; i++) if (!grid[i]) empty.push(i);
    if (!empty.length) return;
    const idx = empty[Math.floor(Math.random() * empty.length)];
    grid[idx] = Math.random() < 0.9 ? 2 : 4;
    lastSpawn = idx;
  }

  function slideLine(line) {
    const vals = line.filter(x => x);
    const out = [];
    let gain = 0;
    for (let i = 0; i < vals.length; i++) {
      if (i < vals.length - 1 && vals[i] === vals[i + 1]) {
        const n = vals[i] * 2;
        out.push(n);
        gain += n;
        i++;
      } else {
        out.push(vals[i]);
      }
    }
    while (out.length < SIZE) out.push(0);
    return { line: out, gain: gain };
  }

  function indices(dir, i) {
    if (dir === 'left') return [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3];
    if (dir === 'right') return [i * 4 + 3, i * 4 + 2, i * 4 + 1, i * 4];
    if (dir === 'up') return [i, i + 4, i + 8, i + 12];
    return [i + 12, i + 8, i + 4, i];
  }

  function canMove() {
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (!grid[i]) return true;
      if (i % 4 < 3 && grid[i] === grid[i + 1]) return true;
      if (i < 12 && grid[i] === grid[i + 4]) return true;
    }
    return false;
  }

  function move(dir) {
    if (over) return;
    const before = grid.slice();
    const beforeScore = score;
    let changed = false;
    let gain = 0;
    for (let i = 0; i < SIZE; i++) {
      const idx = indices(dir, i);
      const res = slideLine(idx.map(j => grid[j]));
      idx.forEach((j, k) => {
        if (grid[j] !== res.line[k]) changed = true;
        grid[j] = res.line[k];
      });
      gain += res.gain;
    }
    if (!changed) return;
    history.push({ grid: before, score: beforeScore });
    if (history.length > 30) history.shift();
    score += gain;
    if (score > best) {
      best = score;
      localStorage.setItem(STORE_BEST, String(best));
    }
    spawn();
    render();
    if (!won && grid.includes(2048)) {
      won = true;
      showOverlay('2048 达成', `得分 ${score}，还能继续往上合`, 'continue');
    } else if (!canMove()) {
      over = true;
      showOverlay('游戏结束', `本局得分 ${score}`, 'restart');
    }
  }

  function undo() {
    if (!history.length) return;
    const prev = history.pop();
    grid = prev.grid.slice();
    score = prev.score;
    over = false;
    won = grid.includes(2048);
    hideOverlay();
    render();
  }

  function newGame() {
    grid = Array(SIZE * SIZE).fill(0);
    score = 0;
    history = [];
    over = false;
    won = false;
    hideOverlay();
    spawn();
    spawn();
    render();
  }

  function showOverlay(title, desc, mode) {
    overlayMode = mode;
    overlayTitle.textContent = title;
    overlayDesc.textContent = desc;
    overlayBtn.textContent = mode === 'continue' ? '继续玩' : '再来一局';
    overlay.hidden = false;
  }

  function hideOverlay() {
    overlay.hidden = true;
    overlayMode = '';
  }

  function flash(btn, text) {
    const old = btn.textContent;
    btn.textContent = text;
    setTimeout(() => { btn.textContent = old; }, 1500);
  }

  function clearRecords() {
    if (!window.confirm('确定清除最高分和主题设置吗？')) return;
    localStorage.removeItem(STORE_BEST);
    localStorage.removeItem(STORE_THEME);
    best = 0;
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark', false);
    render();
    flash(clearBtn, '已清除');
  }

  async function share() {
    const text = `我在 2048 拿到了 ${score} 分，最高 ${best} 分！`;
    try {
      await navigator.clipboard.writeText(text);
      flash(shareBtn, '已复制');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        flash(shareBtn, '已复制');
      } catch (_) {
        flash(shareBtn, '复制失败');
      }
      ta.remove();
    }
  }

  document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    const map = {
      arrowleft: 'left', a: 'left',
      arrowright: 'right', d: 'right',
      arrowup: 'up', w: 'up',
      arrowdown: 'down', s: 'down'
    };
    if (map[k]) {
      e.preventDefault();
      move(map[k]);
      return;
    }
    if (k === 'u') undo();
    if (k === 'r') newGame();
  });

  let touchStart = null;
  boardEl.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  boardEl.addEventListener('touchend', (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left');
    else move(dy > 0 ? 'down' : 'up');
  }, { passive: true });

  undoBtn.addEventListener('click', undo);
  newBtn.addEventListener('click', newGame);
  shareBtn.addEventListener('click', share);
  themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'light' ? 'dark' : 'light'));
  clearBtn.addEventListener('click', clearRecords);
  overlayBtn.addEventListener('click', () => {
    if (overlayMode === 'continue') hideOverlay();
    else newGame();
  });

  const saved = localStorage.getItem(STORE_THEME);
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved === 'light' || saved === 'dark' ? saved : (prefersLight ? 'light' : 'dark'));
  newGame();
})();
