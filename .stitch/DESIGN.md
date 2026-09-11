# DESIGN.md — MCSkinGenerator「Voxel Workbench」设计规范

> 这是设计的唯一依据。定稿来源：Stitch 项目 `3372204810367895523`，桌面 `home-light-v4`（screen `4613b34d…`）、移动 `home-light-mobile-v2`（screen `f84d1cd3…`）。
> Stitch 导出的 HTML 里有**偏离规范**的地方：primary 用的是 `#186b04`，字体用了 Manrope、Space Grotesk、Pixelify Sans 三种，图标是 Material Symbols 字体。**开发一律以本文件为准**，不要照抄 Stitch 的 Tailwind 配置。

---

## 1. 风格定位
一张摊开的**创客工作台**：石白纸面、墨黑描边、硬投影，控件像能按下去的实体方块。整体保持克制，让用户画的皮肤成为画面里最鲜艳的东西。
- 关键词：tactile、tool-first、neo-brutalist precision、playful but disciplined
- 不要：渐变光斑、圆润的 SaaS 卡片、玻璃拟态、Minecraft 官方 logo/字体/贴图

---

## 2. 颜色 Token（语义命名）

| Token | 值 | 用途 |
|---|---|---|
| `--color-paper` | `#F4F1EA` | 页面底色、区块标题的实底条 |
| `--color-surface` | `#FFFFFF` | 面板、卡片、输入框 |
| `--color-ink` | `#1B1B1F` | 主文字、所有描边、硬投影、选中态底色 |
| `--color-ink-muted` | `#3A3D42` | lead 和正文段落 |
| `--color-slate` | `#5B5F66` | 次要文字、说明 |
| `--color-action` | `#3E8E2A` | 主操作（Download、开始画）、选中的复选框、链接悬停 |
| `--color-action-ink` | `#2F6E1F` | 草绿色文字链接和小号绿字（保证与纸面的对比度） |
| `--color-ai` | `#1FB5AC` | 一切 AI 相关：按钮底、卡片描边、标签 |
| `--color-ai-tint` | `#E6F7F5` | AI 卡片的浅底 |
| `--color-danger` | `#C8372D` | 删除、清空、错误 |
| `--color-dirt` | `#8A5A36` | 仅用于小面积点缀（当前图层指示条、logo） |
| `--color-checker` | `#EEEAE1` | 透明像素用的棋盘格 |

对比度规则：
- 草绿底上的按钮文字用白色 `#FFFFFF`；
- 青色底上的按钮文字用墨黑 `#1B1B1F`，**不要用白字**，白字在青底上对比度不够；
- 纸面上的绿色小字（14px 以下）用 `--color-action-ink`。

---

## 3. 字体（最多两种）

| 角色 | 字体 | 用途 |
|---|---|---|
| Display | **Pixelify Sans**（700） | H1、区块 H2、步骤编号 01/02/03、bento 标题 |
| Body/UI | **Manrope**（400/500/700/800） | 正文、按钮、标签、表单 |
| Mono 读数 | 系统等宽栈 `ui-monospace, SFMono-Regular, Menlo, monospace` | 坐标 `X: 24, Y: 18`、`CANVAS: 64×64 RGBA` 这类读数（不额外加载网页字体） |

两种网页字体都用 `next/font` 自托管，`display: swap`，只预加载 Pixelify Sans 700（H1 用）。

| 字号 Token | 桌面 | 移动 | 行高 | 用于 |
|---|---|---|---|---|
| `--text-h1` | 44px | 24px | 1.15 | H1（桌面必须一行排下） |
| `--text-h2` | 32px | 20px | 1.2 | 区块标题 |
| `--text-h2-tile` | 22px | 18px | 1.25 | bento 格子标题（语义上是 H2） |
| `--text-lead` | 18px | 16px | 1.5 | hero 的 lead |
| `--text-body` | 15px | 15px | 1.55 | 正文 |
| `--text-label` | 12px（uppercase，letter-spacing 0.06em，800） | 同 | 1.3 | 面板标题、eyebrow 标签 |

Pixelify Sans 的 letter-spacing 保持 `normal`，**不要**加宽字距（移动端第一版就因为字距太散而难读）。

---

## 4. 形状、描边、阴影

| Token | 值 |
|---|---|
| `--radius` | `0`（大多数元素）/ `2px`（小控件：chip、复选框） |
| `--border` | `2px solid var(--color-ink)` |
| `--shadow-block` | `4px 4px 0 var(--color-ink)`（按钮、卡片） |
| `--shadow-block-sm` | `2px 2px 0 var(--color-ink)`（工具按钮、chip） |
| `--shadow-inset` | `inset 2px 2px 0 rgb(27 27 31 / 0.15)`（画布、输入框这类凹槽） |
| `--shadow-modal` | `8px 8px 0 var(--color-ink)`，描边 3px |

交互状态（只用 transform 和 box-shadow，不做布局动画）：
- Hover：`translate(-1px,-1px)`，阴影变成 `5px 5px 0`
- Active：`translate(4px,4px)`，阴影变成 `0 0 0`
- Focus-visible：`outline: 2px solid var(--color-action); outline-offset: 2px`
- 过渡：`transform, box-shadow 120ms ease-out`；如果用户开启了 `prefers-reduced-motion`，去掉位移，只改阴影

---

## 5. 背景纹理
- `.workbench-bg`：`#F4F1EA` 底，加 `radial-gradient(#1B1B1F 0.85px, transparent 0.85px)`，`background-size: 16px 16px`。
- **文字下面不能有网点**：H1、lead、区块 H2 和 eyebrow 都放在 `--color-paper` 实底条上。
- `.pixel-checker-bg`：用 `--color-checker` 画 16px 棋盘格，用在 UV 画布和模板缩略图背后。
- 所有像素图都加 `image-rendering: pixelated`。

---

## 6. 间距与布局
- 基础单位 4px，常用 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64。
- 桌面容器宽 1392px（1440 减左右各 24），栅格 12 列，gutter 16px。
- 区块之间的垂直间距：桌面 80px、移动 56px，**不要**全站一个值。hero 和编辑器之间只留 16px，两者读作一个整体。
- 桌面编辑器三栏：左 330px（工具箱）｜中间 fluid（UV 画布）｜右 450px（3D 预览）。在 1440×900 下，整个编辑器（包括 Export/Copy 两个按钮）都要在首屏内，底部至少留 40px。
- 断点：`sm 640 / md 768 / lg 1024 / xl 1280`。小于 1024 时，编辑器改为上下堆叠。

---

## 7. 组件规范

### 7.1 按钮
| 变体 | 底色 | 文字 | 描边/阴影 | 用途 |
|---|---|---|---|---|
| Primary | `--color-action` | 白 | border + shadow-block | Download Skin (.PNG)（每屏只放一个） |
| AI | `--color-ai` | 墨黑 | border + shadow-block | Generate skin |
| Secondary | 白 | 墨黑 | border + shadow-block-sm | Export .mcpack、Copy URL、Edit template |
| Ghost | 透明 | 墨黑 | border | 顶栏的 Import PNG |
| Danger | `--color-danger` | 白 | border + shadow-block-sm | Clear canvas |

高度：桌面主按钮 56px，其他 40px；移动端所有可点元素 ≥ 44px。

### 7.2 编辑器
- **工具按钮**：48×40，白底加 2px 描边；选中时反相（墨黑底、白图标）。顺序固定：Pencil、Eraser、Picker、Bucket、Mirror、Shade、Noise、Clear（Clear 用 danger 色图标）。
- **色板**：16 个方块色块，分两行，每行 8 个；当前颜色有 2px 墨黑外框加 2px 白内框。
- **UV 画布**：白底、棋盘格、1px 像素网格；右下角放读数标签 `CANVAS: 64×64 RGBA`（墨黑底、白色等宽字）。
- **分段切换**（Classic | Slim、Stand/Walk/Run）：子项之间共用 2px 分隔线，选中项反相。
- **复选框**：18px 方形，勾选后填草绿、打像素勾；AI 相关的开关用青色。

### 7.3 卡片
- **工作台卡片**：白底，加 border 和 shadow-block。卡头有一条 2px 分隔线，卡头背景用 paper 色。
- **模板卡片**：棋盘格缩略区里放像素角色，右上角标签（墨黑或主题色底，uppercase label），名字用 Pixelify，底部 Secondary 按钮「Edit template」。
- **AI 卡片**：`--color-ai-tint` 底，外加 2px `--color-ai` 描边。内容依次是输入框、3 个提示词 chip、「提示词 → 64×64 PNG」结果行、AI 按钮。

### 7.4 Bento（首页罗列 5 个内页）
| 格子 | 跨列 | 视觉 | 标题（H2，逐字一致） |
|---|---|---|---|
| 皮肤包 | 8/12 | 5 张扇形叠放的皮肤卡片，中间的 King 抬高 | Minecraft Skin Pack Maker |
| AI | 4/12，青色 | 提示词加生成出的小皮肤 | AI Minecraft Skin Maker |
| Custom | 5/12 | Base + Outer = Final 图示 | Custom Minecraft Skin Maker |
| Bedrock | 4/12 | 4 步编号列表 + 主机限制说明 | Minecraft Bedrock Skin Maker |
| Free | 3/12，paper 底 | 印章「No sign-up · No watermark」 | Free Minecraft Skin Maker |

每格底部有一个「… →」文字链接（`--color-action-ink`，悬停时出现下划线），整格可点。移动端改为单列，顺序：皮肤包 → AI → Custom → Bedrock → Free。

### 7.5 FAQ
- 手风琴式，最大宽度 760px，左对齐；每项白底加 border，展开时底色变 paper。
- 用原生 `<details>/<summary>` 实现，答案要出现在服务端渲染的 HTML 里（SEO 需要），同时输出 FAQPage JSON-LD。

### 7.6 页脚
- 左侧：logo 加一句 tagline。
- 右侧两组链接：
  - **Skin Makers**：5 个内页全部列出，锚文本就是目标词；
  - **More**：Templates、Privacy Policy、Terms of Service。
- 底部：© 年份，以及 "Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft."

---

## 8. 图标
用 **lucide-react**，内联 SVG，按需引入；stroke 2px，尺寸 20px，颜色随文字。**不用** Material Symbols 图标字体，它体积大，还会在字体加载前闪出图标名称的文字。

---

## 9. 移动端（390px 基准）
1. 顶栏：logo 加汉堡菜单，不放 Import 按钮。
2. Hero：H1 24px，排 2–3 行；lead 16px；隐藏快捷键提示。
3. 编辑器顺序：3D 预览（正方形）+ Classic/Slim → UV 画布 → 可横向滚动的工具条（图标下方带文字）→ 两行色板。
4. **底部固定操作栏**：Download Skin (.PNG) 通栏，下面一行是 Export .mcpack 和 Copy URL；为 iOS 底部安全区留出 `env(safe-area-inset-bottom)`。
5. 模板横向滑动，一屏露出约 2.3 张；AI 卡片通栏。
6. 区块标题放在 paper 实底条上，20px。

---

## 10. 可访问性与性能底线
- 正文对比度 ≥ 4.5:1，大标题 ≥ 3:1（按 §2 的配色规则执行）。
- 工具按钮必须有 `aria-label` 和 `aria-pressed`；分段切换用 `role="radiogroup"`。
- 画布提供键盘操作：方向键移动光标，空格落笔。
- 3D 预览（skinview3d）在首屏之后动态 import，先显示一张静态 PNG 占位，避免 CLS。
- 所有图片写明 width/height，并带描述性 alt。

---

## 11. 资产与出处
- 设计稿：`.stitch/designs/home-light-v4.html`、`home-light-mobile-v2.html`（仅作视觉参考）
- 每一轮的 prompt：`.stitch/prompts/`（可复现）
- Stitch 原始返回：`.stitch/raw/`
