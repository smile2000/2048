# 鱼塘

一个放在 GitHub Pages 上的纯静态站点，包含小游戏、互动故事和实用工具，通过自定义域名 `dahuangyu.de5.net` 访问。全部无需后端、无需构建、无需登录。

- **仓库地址**：https://github.com/smile2000/dahuangyu
- **主页**：一池子会游的鱼（25 种配色随机分配），每条对应一个应用，点击鱼身即可进入；右上角可切换背景音乐与完整列表页。

## 站点内容

| 路径 | 名称 | 说明 |
| --- | --- | --- |
| `/` | 大黄鱼游乐场 | 水下场景主页，15 条游动的大黄鱼各对应一个入口（含 1 条缩小加速的传说大黄鱼彩蛋），点击鱼身进入；鱼以穿行模式左右游动，同屏约 5–10 条，含背景音乐与随机漫游；手机端自动降级滤镜与元素数量 |
| `/list/` | 完整列表 | 只放两个入口卡片：游戏合集、工具箱（子应用不在这一层重复出现），顶部与底部都有「返回鱼塘」 |
| `/games/` | 游戏合集 | 11 款游戏的分类目录，按益智 / 文字 / 数字 / 休闲筛选并支持搜索；围住小猫置顶、SBTI 人格测试排第二（归在休闲类），六个文字故事统一收拢进「文字游戏目录」一个入口（首页同样只保留一条文字游戏鱼） |
| `/games/dino/` | 小恐龙快跑 | 谷歌浏览器小恐龙复刻：跳跃、下蹲、仙人掌与翼龙、昼夜切换 |
| `/games/cat/` | 围住小猫（置顶） | 复刻原版 Chat Noir：11×11 错列六边形棋盘、8 块占 50%、7 块占 40%、6 块占 10%；小猫用「滴水法」BFS 算最短路径并在多条路中选逃生路线最多的一条，粉色点提示下一步，支持撤销 |
| `/personality/` | SBTI 人格测试 | 戏仿 MBTI 的娱乐测试：20 道日常题、4 个维度打分、16 种人格结果，含四维条形图与复制分享（作为游戏合集第二张卡片，不在完整列表单独出现） |
| `/games/2048/` | 2048 | 数字合并游戏，键盘与触屏、撤销、主题切换、清除记录 |
| `/games/suika/` | 合成大西瓜 | Canvas 物理碰撞合成，九级水果，一次撤销 |
| `/games/threes/` | Threes | 1+2=3、3+3=6 的数字合并，4×4 棋盘 |
| `/games/hex2048/` | 六边形 2048 | 37 格六向棋盘，键盘 QWEASD 与滑动操作 |
| `/games/minesweeper/` | 扫雷 | 三档难度 + 每日挑战（日期种子固定布局） |
| `/games/sudoku/` | 数独 | 唯一解随机出题，三档难度、笔记、提示、撤销、计时 |
| `/games/memory/` | 记忆翻牌 | 三档牌面，翻牌动画，记录最少步数与用时 |
| `/games/text/` | 文字游戏目录 | 四个互动故事的分支入口 |
| ├ `/games/text/escape/` | 第七封信 | 密室解谜，17 节点、6 线索、3 结局 |
| ├ `/games/text/horror/` | 别回头 | 悬疑恐怖，16 节点、6 线索、4 结局 |
| ├ `/games/text/store/` | 深夜便利店 | 角色扮演，体力 / 善意 / 诡异三值系统，4 结局 |
| ├ `/games/text/taxi/` | 雨夜出租车 | 分支剧情，18 节点、6 线索、5 结局 |
| ├ `/games/last-train/` | 最后一班地铁 | 悬疑解谜，14 节点、7 线索、4 结局 |
| └ `/games/lifeline/` | 信号 · 生命线 | 短信式互动小说，19 节点、5 结局 |
| `/tools/` | 工具箱 | 四个日常小工具的统一入口 |
| `/tools/food/` | 今天吃什么 | 决策骰子，滚轮动画、自定义候选清单、抽中历史 |
| `/tools/countdown/` | 佳期可数 | 节日倒计时，农历节日表 2026—2030、自定义纪念日 |
| `/tools/weather/` | 天气查询 | 城市搜索与定位、当前天气、未来五天预报、穿衣建议 |
| `/tools/news/` | 头条速览 | 知乎日报 + 9 个国内科技 / 精选信源，10 分钟缓存 |
| `/404.html` | 旧路径跳转 | 旧版根路径（如 `/cat/`）自动重定向到新位置，避免已分享链接失效 |

所有进度与设置都保存在各自浏览器的 `localStorage` 中，不上传服务器。

## 目录结构

```text
.
├── index.html              大黄鱼游乐场主页（水下动画 + Web Audio 音乐）
├── list/index.html         完整列表页（只有游戏合集、工具箱两个入口）
├── 404.html                旧路径跳转映射
├── CNAME                   自定义域名声明
├── README.md               本文件
├── personality/index.html  SBTI 人格测试（单文件，独立于游戏合集）
├── games/                  —— 游戏类 ——
│   ├── index.html          游戏合集分类页（单文件）
│   ├── dino/index.html     小恐龙快跑（单文件）
│   ├── cat/index.html      围住小猫（单文件，合集置顶）

│   ├── 2048/               游戏页面 + 样式 + 逻辑 + 图标（4 文件）
│   ├── suika/index.html    合成大西瓜（单文件）
│   ├── threes/index.html   Threes（单文件）
│   ├── hex2048/index.html  六边形 2048（单文件）
│   ├── minesweeper/index.html  扫雷（单文件）
│   ├── sudoku/index.html   数独（单文件）
│   ├── memory/index.html   记忆翻牌（单文件）
│   ├── text/               文字游戏目录 + 4 个故事
│   ├── last-train/index.html   最后一班地铁（单文件）
│   └── lifeline/index.html 信号 · 生命线（单文件）
└── tools/                  —— 工具类 ——
    ├── index.html          工具箱分类页（单文件）
    ├── food/index.html     今天吃什么（单文件）
    ├── countdown/index.html 节日倒计时（单文件）
    ├── weather/index.html  天气查询（单文件）
    └── news/index.html     新闻聚合（单文件）
```

除 2048 外，其余页面都是单文件，CSS 与 JS 全部内联，方便单独部署或分享。

## 本地预览

在站点根目录执行：

```bash
python3 -m http.server 8000
```

然后打开 <http://localhost:8000>。注意两个游戏用的是相对路径，必须通过 HTTP 服务访问，直接双击 `index.html` 也能玩，但部分浏览器会限制本地存储。

## 部署到 GitHub Pages

目标仓库：**https://github.com/smile2000/dahuangyu**

1. 解压 `arcade-site-*.zip`，把里面全部文件**覆盖上传**到仓库根目录（不要多套一层文件夹）。旧目录 `2048/`、`countdown/`、`food/`、`news/`、`weather/`、`text/`、`last-train/`、`lifeline/` 已被 `games/` 和 `tools/` 取代，可在网页上把这些旧目录删掉；即使留着也不影响新页面。
2. 进入仓库 **Settings → Pages**
3. **Build and deployment → Source** 选择 **Deploy from a branch**
4. Branch 选 `main`，Folder 选 **`/ (root)`**，保存
5. 等待部署完成，访问 `https://dahuangyu.de5.net/` 或 `https://smile2000.github.io/dahuangyu/`

> 上传方式：GitHub 网页点 **Add file → Upload files**，把解压后的文件全选拖进去即可。连接器的写权限未开放（403），所以这一步需要手动完成。

仓库名不影响站点运行；改名后 `github.io` 地址会变，但绑定好的自定义域名不受影响。旧的根路径（如 `/cat/`）由 `404.html` 自动跳转到新路径，不用单独处理。

## 绑定自定义域名

仓库根目录的 `CNAME` 文件内容为：

```text
dahuangyu.de5.net
```

DNS 侧添加一条记录（以子域名为例）：

| 类型 | 名称 | 值 | 代理状态 |
| --- | --- | --- | --- |
| CNAME | `dahuangyu` | `smile2000.github.io` | DNS only（灰云） |

注意 DNS 指向的是 **用户名**.github.io，不是仓库名，所以仓库改名后无需改动解析。若域名托管在 Cloudflare，代理状态务必选灰云；若 NS 仍在 dnshe.com，则在 dnshe.com 的解析面板添加记录。

解析生效后，在 Pages 设置里勾选 **Enforce HTTPS**。

## 外部数据接口

两个页面会调用无需密钥的公开接口，只在访客自己的浏览器里发起请求：

- `/weather/`：`geocoding-api.open-meteo.com`（城市搜索）、`api.open-meteo.com`（天气数据）
- `/news/`：10 个公开 RSS 源，依次尝试 `api.rss2json.com`、`api.allorigins.win`（浏览器直接解析 XML）、`feed2json.org` 三种转换方式；结果在本机缓存 10 分钟，页面上会标出暂时不可用的信源。知乎日报通过 RSSHub 公共实例获取
- `/countdown/`：不请求外部接口，农历与节气日期按 2026—2030 年公开日历表内置

如果某个接口暂时不可用，页面会给出提示，不影响其他页面。第三方转换服务有频率限制，属于正常现象。

## 清除本地数据

| 页面 | localStorage 键 | 说明 |
| --- | --- | --- |
| 2048 | `g2048_best`、`g2048_theme` | 游戏内底部有「清除记录」按钮 |
| 合成大西瓜 | `suika_best_v1` | 最高分 |
| Threes | `threes_best_v1` | 最高分 |
| 六边形 2048 | `hex2048_best_v1` | 最高分 |
| 扫雷 | `minesweeper_best_v1` | 各难度最佳用时 |
| 数独 | `sudoku_state_v1` | 当前题目与进度 |
| 记忆翻牌 | `memory_best_v1` | 各难度最佳步数与用时 |
| 小恐龙快跑 | `dino_best_v1` | 最高分 |
| 围住小猫 | `cat_best_v1`、`cat_stats_v1` | 最佳步数、胜负场次 |
| 大黄鱼主页 | `fish_music_v1` | 背景音乐开关状态（默认关闭） |
| 最后一班地铁 | `lasttrain_save_v1` | 进度与结局收藏 |
| 今天吃什么 | `fooddice_v1` | 候选清单与抽中历史 |
| 信号 · 生命线 | `lifeline_signal_v1` | 剧情进度与已解锁结局 |
| 第七封信 | `text_escape_v1` | 剧情进度与已解锁结局 |
| 别回头 | `text_horror_v1` | 剧情进度与已解锁结局 |
| 深夜便利店 | `text_store_v1` | 剧情进度与已解锁结局 |
| 雨夜出租车 | `text_taxi_v1` | 剧情进度与已解锁结局 |
| 佳期可数 | `countdown_custom_v1`、`countdown_pin_v1` | 自定义纪念日、置顶项 |
| 天气 | `weather_city_v1` | 上次查询的城市 |
| 头条 | `news_cache_v2` | 新闻缓存 |

在对应页面的浏览器控制台执行 `localStorage.removeItem('键值')` 后刷新即可重置该项。文字游戏页面内也有「重来」按钮。

## 出处与致谢

- **围住小猫 `/cat/`**：玩法源头是日本设计师 Taro Ito 的《黑猫》（Chat Noir，gamedesign.jp）；开源原型为 gamedilong 的 `catch-the-cat`，后由 ganlv 用 Phaser 3 重写为 [ganlvtech/phaser-catch-the-cat](https://github.com/ganlvtech/phaser-catch-the-cat)（MIT）。本站复刻其默认规则：11×11 错列六边形网格、8 块占 50%、7 块占 40%、6 块占 10%、猫用 `nearestAndMoreRoutesSolver`（从边缘 BFS「滴水法」求最短距离，只朝更近的方向走，多条路时选逃生路线数最多的一条）。方向编号为 0 左 / 1 左上 / 2 右上 / 3 右 / 4 右下 / 5 左下。因聪明猫到边缘仅需 5 步，随机落子几乎必输，需借石头提前围堵。

## 新增一个应用

首页的鱼和具体应用是**解绑**的，新增应用不需要挑配色：

1. 在 `index.html` 的 `APPS` 数组里加一行：`{n:'名称',p:'路径/',e:'🐟'}`（只要名称、路径、emoji 三个字段）
2. 鱼的外形会在每次加载时从 15 种配色里随机分配，15 个应用以内不会重复
3. 如果这个应用还要出现在游戏合集里，再去 `games/index.html` 的 `GAMES` 数组加一条，并按需调整分类标签的数量

只有传说大黄鱼是固定的金色，其他鱼都不使用金黄色系。

## 后续可加

- 新游戏：在 `games/` 下新建子目录放 `index.html`，在 `games/index.html` 的 `GAMES` 数组中加一项（路径写同级子目录），更新首页数量
- 新工具：在 `tools/` 下新建子目录放 `index.html`，在 `tools/index.html` 的 `TOOLS` 数组中加一项，并在首页工具区加卡片
- 新文字游戏：在 `games/text/` 下新建子目录，并在 `games/text/index.html` 中加一张卡片；游戏引擎模板位于各游戏页面的内联脚本中
- 倒计时在 2030 年之后需要补充农历日期表
- 成绩卡片、只读排行榜、好友对战等
