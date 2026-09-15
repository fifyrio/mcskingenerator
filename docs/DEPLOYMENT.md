# 部署配置（Vercel + Supabase）

## 1. Supabase

| 项 | 值 |
| --- | --- |
| 项目名 | `mcskingenerator` |
| 区域 | eu-central-1（法兰克福） |
| 套餐 | Free（$0/月） |
| Project ref | `rbmgytajthxaowlppuah` |
| API URL | `https://rbmgytajthxaowlppuah.supabase.co` |
| Dashboard | https://supabase.com/dashboard/project/rbmgytajthxaowlppuah |

已经通过 migration 建好的内容（远端 `supabase_migrations.schema_migrations` 有完整记录，
本地可用 `supabase link --project-ref rbmgytajthxaowlppuah && supabase db pull` 拉回来）：

- `init_core_schema` — 18 张表：user_profiles / images / videos / image_templates /
  categories / payment_plans / orders / subscriptions / credit_transactions /
  referrals / check_in_rewards / user_activity / prompt_folders / saved_prompts /
  prompts / api_keys
- `functions_and_triggers`
  - `handle_new_user()` + `on_auth_user_created`：注册时自动建 profile，送 10 积分
  - `sync_credits_from_transaction()`：写 credit_transactions 自动同步 user_profiles.credits
  - `deduct_credits_atomic()`：行锁扣费（`src/lib/credits.ts` 调的就是它）
  - `set_updated_at()`：各表 updated_at
  - `generate_referral_code()`：邀请码
- `rls_policies` — 全表开 RLS。浏览器端 anon key 只能读自己的行 + 公开内容
  （prompts / payment_plans / categories / image_templates），写操作一律走服务端 service role。
- `performance_indexes` — 按查询模式建的索引（含 prompts 全文检索 GIN）
- `harden_function_grants` — 触发器函数与扣费函数对 anon/authenticated 收回 EXECUTE

Security advisor 当前为 0 条告警。

### 还要手动做的

1. **拿 service role key**：Dashboard → Project Settings → API Keys → `service_role`，
   填进 `.env.local` 的 `SUPABASE_SERVICE_ROLE_KEY`，以及 Vercel 环境变量。
2. **Google 登录**：Dashboard → Authentication → Providers → Google，填 Client ID / Secret，
   回调 `https://rbmgytajthxaowlppuah.supabase.co/auth/v1/callback`。
3. **Site URL / Redirect URLs**：Authentication → URL Configuration
   填生产域名 + `http://localhost:3001`。
4. **payment_plans 建档**：结账流程按 `plan.name` 映射 Waffo 产品 ID，表目前是空的，
   要先插入你的套餐行。

## 2. Vercel 环境变量

> 部署失败的直接原因：`.env.local` 在 `.gitignore` 里，Vercel 上一个变量都没有，
> 所以 `createClient()` 拿到 undefined，报
> `Your project's URL and Key are required to create a Supabase client!`

在 Vercel → Project → Settings → Environment Variables 里逐条加（Production + Preview 都勾）：

### 必填

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rbmgytajthxaowlppuah.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard 上的 anon key（可公开） |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key，**仅服务端**，绝不能加 NEXT_PUBLIC_ 前缀 |
| `JWT_SECRET` | 随机 32 字节，`openssl rand -base64 32` |
| `NEXTAUTH_SECRET` | 同上，另生成一个 |
| `NEXTAUTH_URL` | 生产域名，如 `https://mcskingenerator.com` |
| `NEXT_PUBLIC_SITE_URL` | 同上 |

### 功能相关（缺了对应功能不可用，但不会挂站）

| 变量 | 用途 |
| --- | --- |
| `KIE_API_TOKEN` | KIE 出图/出视频，缺了生成接口返回未配置 |
| `KIE_API_URL` | 默认 `https://api.kie.com`（`src/lib/config.ts`） |
| `KIE_CALLBACK_URL` | `https://<域名>/api/webhooks/kie-callback` |
| `KIE_VIDEO_CALLBACK_URL` | 视频回调 |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET_NAME` / `R2_ENDPOINT` | Cloudflare R2 存图 |
| `R2_PUBLIC_BASE_URL` | R2 自定义公开域名 |
| `NEXT_PUBLIC_R2_ENDPOINT` | 前端拼图片 URL 用 |
| `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_KV_API_TOKEN` / `CLOUDFLARE_KV_NAMESPACE_ID` | KV 缓存 |
| `PAYMENT_ENV` | `test` 或 `production` |
| `WAFFO_TEST_*` / `WAFFO_PROD_*` | MERCHANT_ID / STORE_ID / PRIVATE_KEY_BASE64 / BASIC_PRODUCT_ID / PRO_PRODUCT_ID / MAX_PRODUCT_ID |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google One Tap |

### 可选（有默认值）

`CREDITS_DEFAULT=10`、`CREDITS_PROMPT_ENHANCEMENT=2`、`CREDITS_IMAGE_GENERATION=5`、
`CREDITS_BACKGROUND_REMOVAL_ORIGINAL=1`、`RATE_LIMIT_MAX=100`、
`RATE_LIMIT_WINDOW_MS=900000`、`MODERATION_ENABLED=false`、`NEXT_PUBLIC_GA_TRACKING_ID`

`NODE_ENV` 不要手动设，Vercel 自己会给。

### 注意

- `NEXT_PUBLIC_*` 是**构建期**注入的。在 Vercel 上改了这类变量必须重新 deploy，
  光 redeploy 用缓存不生效。
- `.env.local` 里 `CREEM_API_KEY` / `CREEM_ENVIRONMENT` / `NEXT_PUBLIC_CREEM_PUBLISHABLE_KEY`
  已经删掉了 —— 代码里没有任何地方读它们，支付走的是 Waffo。

## 3. 代码改动

- `src/app/api/subscription/{status,cancel,create-checkout}/route.ts`：
  原来 `process.env.NEXT_PUBLIC_SUPABASE_URL!` 直接丢给 `createClient()`，
  变量缺失时抛的就是那条 Supabase 报错。现在改成先判空，缺配置返回 503 并打日志，
  不再整个请求崩掉。
- 新增 `.env.example`（可提交），列全部变量。
