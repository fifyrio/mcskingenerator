# 复用方案：从 easynanobanana 搬到 mcskingenerator

> 决策（2026-09-10，用户已定）：
> 1. **AI 生成整套照搬登录 + 积分 + Creem 支付**（不做匿名限流版）。
> 2. **复用的「生成→how-to→use case→FAQ」页面流放 `/ai-minecraft-skin-maker` 子页**；首页保持 Stitch 的像素编辑器（editor-first）。
> 3. 配合 [[build-prompt]] 的词网规划与 `.stitch/DESIGN.md` 的视觉规范。

## 0. 现状
- `mcskingenerator` 是空仓库（只有 README.md + 未提交的 docs/、.stitch/）。
- `easynanobanana.com` 是完整可跑的 Next.js 14 App Router 应用，含约 80 个 AI 工具、Supabase 鉴权、积分、Creem 支付、KIE 生成栈。
- 既然要「整套照搬」，**以 easynanobanana 整个 app 为脚手架克隆**，再裁剪改品牌，比手工挪几十个互相依赖的文件安全得多。

## 1. Bootstrap：克隆并裁剪
1. 复制 easynanobanana 的应用骨架到 mcskingenerator（不含 .git、node_modules、.next、.env、各类 *.md 运营文档、UI/ 截图）。
2. **保留**：
   - `src/lib/kie-api/*`、`r2.ts`、`cloudflare-kv.ts`、`rate-limiter.ts`、`moderation.ts`
   - `src/lib/supabase*`、`credits.ts`、`payment/`（Creem）、`api-keys.ts`
   - `src/contexts/AuthContext.tsx`
   - `src/app/api/`：`upload-image`、`generate-image`、`kie/*`、`credits`、`subscription`、`profile`、`user`、`referral`、`download-image`、`auth` 相关
   - `src/components/common/Header`、`ui/*`（Button、ShareModal、ImagePreviewModal、LoginModal、FreeOriginalDownloadButton 等）、`auth/*`、`subscription/*`
   - `src/app/[locale]`：`auth`、`login`、`billing`、`pricing`、`settings`、`free-credits`、`privacy`、`terms`、`contact`、`layout.tsx`
   - i18n 基建：`src/i18n/*`、`src/middleware.ts`、`messages/*.json`（只保留通用命名空间 + minecraft）
   - 数据库：`database.sql`、`supabase/migrations/*`（user_profiles、credit_transactions、subscriptions、orders、payment_plans、referrals、images 等）
3. **删除**（哥飞「一站一核心词」，与皮肤无关的全部清掉）：
   - `src/app/[locale]/ai-image-effects/` 下除 `ai-minecraft-skin`、`layout.tsx` 外的约 79 个工具目录
   - `personal-color`、`video`、`ai-anime-generator`、`ai-infographic-generator`、`ai-prompt-assistant`、`nano-banana-prompt-gallery`、`prompts`、`prompt-history`、`image-editor`、`remove-background`、`mcp`、`templates`、`blog`、`history`、`skills`、`cli`、`docs`、`faq`、`about`、`assets`
   - 对应的 `src/components/*`、`src/data/*`、`src/lib/*`（personal-color、qr-art、qr-tree、portrait-module、prompts、mcp、backgroundRemoval 等）
   - `messages/*.json` 里除通用命名空间（common、components、errors、pages、pricing、freeCredits、apiKeys、mcp?）和 `aiMinecraftSkin` 外的所有工具命名空间
   - `scripts/` 里与皮肤无关的生成脚本
4. **改品牌**：站名、`config.ts`、canonical base（`https://mcskingenerator.com`）、OG、siteName、i18n 默认（第一期只留 `en`，其余语言后续按 [[build-prompt]] §10 再开）、favicon、`package.json` name/description。

## 2. 首页 `/`（editor-first，来自 Stitch 定稿）
- 按 `.stitch/DESIGN.md`（Voxel Workbench）实现，结构见 [[build-prompt]] §5。
- 像素编辑器组件按 DESIGN.md §7.2 开发；3D 预览用 skinview3d，首屏后动态 import。
- 首页不含 AI 生成流；用 bento 罗列 5 个内页。

## 3. `/ai-minecraft-skin-maker` 子页（复用生成页流）
- 直接以 `AiMinecraftSkinExperience.tsx` 为模板：**保留**上传、宽高比、预设横滑、Generate、before/after 滑块、How-it-works、use-case 对比卡、FAQ 手风琴、Share/Preview 弹窗、轮询逻辑、`/api/upload-image`→`/api/generate-image`→`/api/kie/task-status` 链路。
- **改**：
  - 配色从香蕉黄换成 Voxel Workbench（DESIGN.md §2）。
  - 目标词、H1/H2、文案换成 [[build-prompt]] §6 ④ 的真实内容，去掉编造数据。
  - 预设/示例图重新生成（不复用 easynanobanana 的 cases 图，避免两站重复内容——见 [[build-prompt]] §10）。
  - SEO：canonical/hreflang、SoftwareApp + FAQ + Breadcrumb JSON-LD，沿用现有 seo 组件。
- **产品债提醒**：此模块产出的是「Minecraft 风格角色图」，不是可导入的 64×64 皮肤。第一版先原样上线，紧接第二步按 [[build-prompt]] §4.5 加皮肤后处理（UV 对齐→最近邻缩放→量化→透明掩码→格式校验），让下载物是真皮肤。

## 4. 其余 4 个 SEO 内页
按 [[build-prompt]] §6 ①②④⑤ 建：custom / skin-pack / bedrock / free。每页独立功能，内链回首页 + 相关页。皮肤包页产出 `.mcpack`（Bedrock），格式库见 [[build-prompt]] §4.4。

## 5. 基建：上线前需要你提供/确认的账号资源
克隆代码我可以做，但这些密钥/账号我造不出来，需要你给或确认：
| 资源 | 建议 | 说明 |
|---|---|---|
| Supabase 项目 | **新建独立项目** | 跑 database.sql 建表。不建议与 easynanobanana 共用一套用户库。 |
| Creem 支付 | **新建 products** | 新站的 basic/pro/max product id 与 payment url。 |
| KIE_API_TOKEN | 可复用现有 | 同一个 KIE 账号即可。 |
| KIE_CALLBACK_URL | 新站域名 | `https://mcskingenerator.com/api/kie/callback`。 |
| R2 | 可复用桶，**新 key 前缀** | 资产放 `mcskin/` 前缀，或另开桶。 |
| 域名/环境变量 | 需确认 | `NEXT_PUBLIC_SITE_URL` 等。 |
| 审核/OpenRouter/Resend | 可复用现有 | 按需。 |

## 6. 执行顺序（每步完成停下确认）
1. Bootstrap 克隆 + 裁剪 + 改品牌，`npm run build` 跑通（先用占位首页）。
2. 接基建密钥（.env），验证鉴权/积分/支付链路能起。
3. `/ai-minecraft-skin-maker`：迁移生成页流 + 换肤 + 真实文案 + SEO。端到端测一次生成。
4. 首页 editor-first（Stitch 定稿 + skin 格式库，TDD 先行）。
5. 其余 4 内页 + sitemap/robots/canonical。
6. code-reviewer + security-reviewer（重点：上传、生成 API、支付回调）。

## 7. 风险
- 克隆后裁剪容易漏删导致 build 报错——用 `npm run build` + `tsc --noEmit` 逐步收敛，必要时用 build-error-resolver。
- 两站同词竞争已决定「都打」，靠**内容原创**避免重复惩罚（[[build-prompt]] §10）。
- 生成模块的「角色图 vs 真皮肤」债务，务必在第 3 步之后立刻补，别让它长期留在线上误导用户。
