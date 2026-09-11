# mcskingenerator.com 建站 Prompt（SEO 词网 + 技术框架）

> 用法：把本文件整体作为新会话的第一条指令。执行者按 §8「执行步骤」推进，每完成一个阶段先停下来让我确认。
> 数据来源：前期拓词 + 哥飞版 KD 精评 + Google 关键字规划师官方搜索量（US），外加 easynanobanana.com 项目的实现经验。

---

## 1. 角色与目标

你是一名全栈工程师兼 SEO 负责人，要从零搭建 **mcskingenerator.com**：一个 Minecraft 皮肤制作工具站。

- **业务目标**：首页拿下 `minecraft skin maker` / `skin maker for minecraft` 主词族（约 10 万月搜），5 个长尾内页形成「全站之力」词网。
- **产品定位**：免费像素编辑器是主干，差异化功能是 **AI 生成** 和 **Bedrock 皮肤包导出**。
- **成功标准**：上线 2 周内 GSC 收录首页 + 全部内页；首页主词进入可观测排名区间（前 100）。

---

## 2. 已验证的关键词数据（唯一可信数据源，不要自己编数字）

| 优先级 | 页面 | 目标词 | 月搜（US 官方） | KD（哥飞版） | 趋势 | 结论 |
|---|---|---|---|---|---|---|
| P0 | `/` | skin maker for minecraft | 60,500 | 32.9 | +15% | 首页核心词 |
| P0 | `/` | minecraft skin maker | 40,500 | 37.0 | +15% | 同一词族，首页一起打 |
| P1 | `/minecraft-skin-pack-maker` | minecraft skin pack maker | 1,000 | 31.7 | +4% | ⭐ 性价比最高；skinpackmaker.com（DR15）靠 EMD+首页聚焦拿到约 9.7 万月流量 |
| P1 | `/custom-minecraft-skin-maker` | custom minecraft skin maker | 1,300 | 44.6 | +25% | 体量最大但 KD 超 40，有 5 个专门页面在争，慢慢养 |
| P2 | `/ai-minecraft-skin-maker` | ai minecraft skin maker | 320 | 22.1 | +30%（12 个月 170→480） | 难度最低，是差异化功能的落点 |
| P2 | `/minecraft-bedrock-skin-maker` | minecraft bedrock skin maker | 320 | 26.8 | +32% | 版本词，没有专门占位的页面 |
| P3 | `/free-minecraft-skin-maker` | free minecraft skin maker | 590 | 37（**仅预筛，未经官方核实**） | — | 上线前补一次官方口径核实 |
| ❌ | — | minecraft skin editor | 60,500 | 46.7 | — | 被老牌站占住，不作为任何页面的主词 |

补充：
- 域名直拼的是 `mc skin generator`（约 1,300/月），**不是**主战场。页面上不要把 "skin generator" 当核心词反复强调，它只出现在品牌名里。
- 小语种可以复用 easynanobanana 已有的调研：`easynanobanana.com/src/data/seo/keywords-minecraft-skin.json`（es/pt/de 的 AI 生成词线，KD 14–38）。第一期**只做英文**。

---

## 3. SEO 硬性规则（哥飞方法论，逐条遵守）

1. **一站一核心词**：全站围绕 `minecraft skin maker`。每个内页都是它的长尾，不另开新主题。
2. **全站之力**：首页用「分门别类罗列」列出全部内页（标题 + 图片 + 链接），每个内页都链回首页，并链向 1–2 个相关内页。
3. **TDH，而不是 TDK**：只写 Title、Description、H1–H6。**不输出 `<meta name="keywords">`**。注意：easynanobanana 的 metadata 里带了 `keywords`，这里**不要照搬**。
4. **一页一个 H1**，而且 H1 要命中这一页的目标词；H2 用来承接长尾变体。
5. **首页直接满足需求**：编辑器放在首屏，紧跟 H1；分类罗列放在工具下面。
6. **服务端渲染**：右键「查看网页源代码」时，TDH 和正文必须都在 HTML 里。工具交互可以放在客户端组件，SEO 文案不行。
7. **URL 唯一**：统一用 `https://mcskingenerator.com`（无 www）。www→非 www、http→https 都做 301；每页都写 canonical。
8. **图片**：全部带描述性 alt；内容图不小于 300×300；写明 width/height。
9. **内页不能是模板页**：只换标题和描述、其余全都一样的页面，谷歌不收。每页都要有**独立功能或独立内容**（见 §6）。建议验收阈值：页面之间正文重复率低于 30%（这是我定的经验值，不是哥飞原话）。
10. **收录**：sitemap 提交 GSC → 首页和内页逐个「请求编入索引」→ 用启动外链吸引爬虫（V2EX 分享、老站友链）。

---

## 4. 技术框架（沿用 easynanobanana 的做法，按新站需要裁剪）

### 4.1 技术栈
Next.js App Router + TypeScript + Tailwind（与 easynanobanana 保持一致，方便直接迁移组件），部署在 Vercel，图片和资产放 Cloudflare R2。第一期**不上** Supabase 登录和积分：编辑器全免费，AI 生成先用匿名额度加限流（见 §4.5）。

**视觉规范**：一律以 `.stitch/DESIGN.md`（Voxel Workbench）为准，包括颜色、字体、组件和移动端规则。`.stitch/designs/` 里的 Stitch HTML 只作视觉参考，不要照抄它的 Tailwind 配置和图标字体。

### 4.2 目录结构（按功能组织）
```
src/
├── app/
│   ├── page.tsx                              # 首页（server）
│   ├── custom-minecraft-skin-maker/page.tsx
│   ├── minecraft-skin-pack-maker/page.tsx
│   ├── minecraft-bedrock-skin-maker/page.tsx
│   ├── ai-minecraft-skin-maker/page.tsx
│   ├── free-minecraft-skin-maker/page.tsx
│   ├── api/ai-skin/route.ts                  # AI 生成
│   ├── sitemap.ts                            # 动态 sitemap（替代 easynanobanana 手写的 public/sitemap.xml）
│   └── robots.ts
├── components/
│   ├── editor/        SkinEditor.tsx（client）、SkinPreview3D.tsx、Palette.tsx …
│   ├── pack/          SkinPackBuilder.tsx
│   ├── ai/            AiSkinExperience.tsx
│   ├── landing/       StepList / FeatureGrid / LandingFaq / RelatedPages / BackToHome
│   └── seo/           JsonLd / SoftwareAppSchema / FAQSchema / BreadcrumbSchema
├── content/pages/     home.json、custom.json、pack.json …   # 每页的 SEO 与正文数据
└── lib/
    ├── skin/          format.ts（64×64 布局与校验）、mcpack.ts（打包）、quantize.ts
    ├── seo.ts         buildMetadata()、canonicalFor()
    └── pages.ts       页面注册表：slug、目标词、相关页
```

### 4.3 可以直接迁移的 easynanobanana 模式
| 模式 | easynanobanana 出处 | 在本站的用法 |
|---|---|---|
| 双层页面：server `page.tsx` 负责 metadata 和 JSON-LD，client `*Experience.tsx` 负责交互 | `docs/AI_TOOL_PAGE_DEVELOPMENT_GUIDE.md` | 每个页面都这样拆，保证 SEO 文案在服务端渲染 |
| 用 JSON 驱动落地页内容（h1/lead/steps/features/faq/seo） | `src/data/minecraft-skin/landing.en.json` + `src/lib/minecraft-skin.ts` | 扩展成 `content/pages/*.json`，统一定义 `PageContent` 类型，加上 `h2Sections`、`related` 等字段 |
| 纯展示的落地页组件 | `src/components/minecraft-skin/MinecraftLandingUI.tsx` | 直接复制 StepList / FeatureGrid / LandingFaq |
| JSON-LD 组件 | `src/components/seo/*`（SoftwareApp、FAQ、Breadcrumb） | 直接复制；`applicationCategory` 用 `"DesignApplication"` |
| canonical / hreflang 的写法 | `src/app/[locale]/minecraft-skin/page.tsx` 里的 `canonicalFor()` | 第一期只有英文，不加 locale 前缀；以后加 es/pt/de 时，照搬它的 `x-default` + languages 写法 |
| metadata 长度规范 | `docs/seo-best-practices.md` | title 理想 ≤60（最多 70），description 理想 ≤160（最多 180） |
| AI 生成流程：上传 → 生成 → 轮询任务状态 → 下载 | `src/components/AiMinecraftSkinExperience.tsx`（`/api/upload-image` → `/api/generate-image` → `/api/kie/task-status`） | 复用调用链，**但输出必须是合法皮肤文件**，见 §4.5 |
| 预设图从 R2 加载 + 远端 KV 覆盖 | `ai-minecraft-skin-presets.json` + `fetchKvJson` | 模板库和 AI 风格预设沿用；`preset/_base.png` 可以作为 UV 布局参考图 |
| 带预设缩略图的页面生成流程 | `ai-effect-page-builder` / `preset-image-generator` skill | 生成模板和示例图时使用 |

### 4.4 皮肤格式（所有功能共用，写在 `lib/skin/format.ts`，先写测试）
- 标准皮肤是 **64×64 RGBA PNG**；兼容读取旧版 64×32。
- 同时支持 **Classic（Steve，手臂 4px）** 和 **Slim（Alex，手臂 3px）** 两种模型。
- 分为基础层和外层（帽子/外套），外层可以透明；基础层的非空区域不能透明。
- 导出前统一校验：尺寸、模式、各 UV 区域的透明度规则，不通过就拦下并给出可读的报错。

### 4.5 AI 生成（与 easynanobanana 的关键区别）
easynanobanana 的 AI 工具输出的是一张「Minecraft 风格的角色图」，它**不是**可以导入游戏的皮肤贴图。本站必须输出能直接导入的 64×64 皮肤：
1. 用文字提示或上传照片，加上 `_base.png` UV 模板作为参考图，调用图像模型生成展开后的皮肤贴图；
2. 服务端后处理：按 UV 网格对齐 → 最近邻缩放到 64×64 → 调色板量化 → 按区域施加透明度掩码；
3. 用 §4.4 的校验函数验证，再同时返回 PNG 和 3D 预览；
4. 失败时重试一次，仍然失败就给出明确提示，**不要**把一张图片当成皮肤交给用户；
5. 匿名用户按 IP 限流（每天 N 次，N 放在配置里），API Key 只在服务端使用；上传的照片要做内容审核（可复用 easynanobanana 的 `src/lib/moderation.ts`）。

### 4.6 3D 预览
优先用成熟库 **skinview3d**（MIT），不要自己写 three.js 模型。它只在客户端动态加载，不能进入首屏关键 JS。

---

## 5. 首页 `/` 规格

```html
<title>Minecraft Skin Maker: Create Skins Online | MCSkinGenerator</title>
<meta name="description" content="Free skin maker for Minecraft. Draw your own skin with layers, colors and templates, preview it in 3D, and download a PNG for Java and Bedrock.">
<h1>Minecraft Skin Maker – Create Your Own Skin Online</h1>
```
> 原方案的 H1 写成 "Create Your Own Minecraft Skin Maker Online"，语义不通（用户做的是皮肤，不是 skin maker）。原 Title 有 80 字符，超出上限，已改短。

页面结构，从上到下：
1. H1 + 一句 lead（文案里自然带上 "skin maker for minecraft"）；
2. **编辑器（首屏）**，含 3D 预览和下载按钮；
3. 分门别类罗列：每个内页对应一个 H2 卡片（标题 + 预览图 + 一句说明 + 链接）。**H3 不要重复堆一遍关键词**；

| H2 | 链接 |
|---|---|
| Custom Minecraft Skin Maker | /custom-minecraft-skin-maker |
| Minecraft Skin Pack Maker | /minecraft-skin-pack-maker |
| AI Minecraft Skin Maker | /ai-minecraft-skin-maker |
| Minecraft Bedrock Skin Maker | /minecraft-bedrock-skin-maker |
| Free Minecraft Skin Maker | /free-minecraft-skin-maker |

4. How it works（3 步）→ FAQ（带 FAQPage JSON-LD）→ 页脚链到全部内页。

---

## 6. 内页规格（一页一个词，每页都有独立功能）

所有内页通用：只有一个 H1；2–3 个 H2；FAQ + JSON-LD；底部放一个锚文本为「Minecraft Skin Maker」的链接指回 `/`；另外链向 1–2 个相关内页；面包屑为 Home › 本页。

### ① `/custom-minecraft-skin-maker` — custom minecraft skin maker（1.3k，KD 44.6）
- T：`Custom Minecraft Skin Maker - Build Your Own Skin Online Free`
- D：`Create a custom Minecraft skin free online. Use layers, colors, brushes and templates, then download in seconds for Java & Bedrock.`
- H2：Design Your Skin Layer by Layer / Custom Skin Templates to Start From / How to Use the Custom Skin Maker
- **独立功能**：完整的编辑器模式，包括图层、调色板、镜像对称绘制、放大镜，以及 Classic/Slim 切换，还有 20+ 个模板。
- 相关页：pack、free

### ② `/minecraft-skin-pack-maker` — minecraft skin pack maker（1k，KD 31.7）⭐ 先做
- T：`Minecraft Skin Pack Maker – Make Bedrock .mcpack Files Free`
- D：`Make your own Minecraft skin pack free. Add multiple skins, name them, and export a ready-to-import .mcpack for Bedrock Edition.`
- H2：Build a Skin Pack from Your Skins / Export Your Skin Pack (.mcpack) / How to Import a Skin Pack into Minecraft Bedrock
- **独立功能**：把多个皮肤打包，生成 `manifest.json`（每次新的 UUID）+ `skins.json` + `texts/en_US.lang`，然后导出 **`.mcpack`**。
- ⚠️ 这是对原方案的修正：原方案写的是「导出 .zip，Java 和 Bedrock 两套安装教程」。实际上**皮肤包是 Bedrock 独有的概念**，Java 没有原生皮肤包。所以这页以 Bedrock 为主；Java 用户只提供「打包下载多个 PNG」作为次要选项，并注明 Java 只能一次换一个皮肤。
- 相关页：bedrock、custom

### ③ `/ai-minecraft-skin-maker` — ai minecraft skin maker（320，KD 22.1）⭐ 先做
- T：`AI Minecraft Skin Maker - Generate Skins from Text or Photo`
- D：`Generate a Minecraft skin with AI from a text prompt or your photo. Get a real 64×64 skin file, preview it in 3D, and download for Java & Bedrock.`
- H2：Generate a Skin from a Text Prompt / Turn Your Photo into a Minecraft Skin / AI Skin Ideas & Example Prompts（10+ 条可以一键套用的提示词）
- **独立功能**：§4.5 的 AI 生成流程；生成结果可以「在编辑器中继续修改」。
- 必须写明免责声明：上传的照片怎么处理、会保留多久、生成的皮肤可以怎么使用。
- 相关页：custom、free

### ④ `/minecraft-bedrock-skin-maker` — minecraft bedrock skin maker（320，KD 26.8）
- T：`Minecraft Bedrock Skin Maker – Make & Import Skins Free`
- D：`Make Minecraft Bedrock skins online free. Design a 64×64 PNG, preview it in 3D, and import it into Bedrock Edition with our step-by-step guide.`
- H2：Create Bedrock-Compatible Skins / Download Your Bedrock Skin (.png) / How to Import a Skin into Bedrock Edition
- **独立内容**：分平台的图文导入教程。
- ⚠️ 原方案写的是「登录 minecraft.net 导入」，这其实是 **Java** 的方式。Bedrock 在游戏内导入，路径大致是 Dressing Room → Classic Skins → Import（Windows/移动端可以，主机端无法直接导入 PNG）。写教程前必须对照 Minecraft 官方帮助中心核实步骤，并注明核实日期。
- 相关页：pack、ai

### ⑤ `/free-minecraft-skin-maker` — free minecraft skin maker（590，KD 37 待核实）
- T：`Free Minecraft Skin Maker - No Sign-Up, No Watermark`
- D：`Create Minecraft skins 100% free online. No sign-up, no watermark, no download limits. Use the free editor and template library.`
- H2：The Best Free Minecraft Skin Editor / Free Minecraft Skin Templates / Why Our Free Skin Maker（H2 里自然带上 editor/creator 等变体）
- **独立内容**：免费模板库（可以筛选、一键在编辑器中打开）+ 说明「免费」到底包括什么。
- ⚠️ 承诺必须和实际一致：编辑器、模板和下载确实无限免费；AI 生成有每日额度，这一点要在页面上写明，不能写成「everything unlimited」。
- 相关页：custom、ai

所有 T/D 都要在构建时自动检查长度（见 §9）。

---

## 7. 上线顺序
1. 格式库 `lib/skin` + 编辑器 + 首页 → 部署 → 提交 sitemap 到 GSC，请求编入索引；
2. `/minecraft-skin-pack-maker` + `/ai-minecraft-skin-maker` 同时上线（KD 最低、差异化最强，用来向搜索引擎证明这不是模板站）；
3. `/minecraft-bedrock-skin-maker`（教程页，最容易收录）；
4. `/custom-minecraft-skin-maker`（最难，慢慢养）；
5. `/free-minecraft-skin-maker`（先补官方搜索量核实）；
6. 启动外链：V2EX、老站友链（不改动 easynanobanana 的 Minecraft 页面，见 §10）。

预期：词选对的话，2 周左右开始看到排名反馈，不要期待上线就有流量。

---

## 8. 执行步骤（每一步完成后停下来等我确认）
1. 输出实现计划：文件清单、`PageContent` 类型、页面注册表；
2. TDD：先写 `lib/skin/format.ts`、`mcpack.ts`、`seo.ts` 的测试，看到它们失败（RED）后再实现；
3. 编辑器和首页；
4. 按 §7 的顺序逐个做内页；
5. sitemap / robots / 301 / canonical；
6. 按 §9 验收，然后跑一次 code-reviewer 和 security-reviewer（重点检查上传和 AI 接口）。

---

## 9. 验收标准
- [ ] 每个页面的 `curl` 源码里都能看到 title、description、唯一的 H1、全部 H2 和正文
- [ ] 全站没有 `<meta name="keywords">`
- [ ] title ≤60（最多 70）、description ≤160（最多 180），由脚本自动检查
- [ ] 每页都有 canonical（无 www、https），www 和 http 访问都是 301
- [ ] 首页链到全部 5 个内页；每个内页都链回首页，并至少链向 1 个相关内页
- [ ] 导出的 PNG 全部通过 64×64 校验；`.mcpack` 能在 Bedrock（Windows 或移动端）实际导入成功（手测并截图）
- [ ] AI 接口有限流、有审核、输入经过 schema 校验，前端拿不到任何 key
- [ ] 所有 img 都有 alt 和 width/height；LCP <2.5s、CLS <0.1（Lighthouse 移动端）
- [ ] 在 320 / 768 / 1440 三个宽度下截图检查编辑器，没有横向溢出
- [ ] 格式库和 SEO 工具函数的单元测试覆盖率 ≥80%

---

## 10. 待我决定的事项（执行者不要自行拍板）
1. ~~自家站互相抢词~~ **已决定（2026-09-10）：保持现状，两站都打。** easynanobanana 的 `/minecraft-skin` 和 `/ai-image-effects/ai-minecraft-skin` 不做改动。由此带来一条执行约束：本站的文案、FAQ、示例图都必须原创，**不能复制或改写** easynanobanana 的落地页内容（`landing.en.json`、`aiMinecraftSkin` 的翻译文案和 cases 图片），避免两站之间出现重复内容。
2. AI 生成的每日免费额度 N，以及以后是否接入积分体系（可复用 easynanobanana 的 Supabase 积分模块）。
3. 小语种（es/pt/de）什么时候上线。
