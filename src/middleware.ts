import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { config as appConfig } from './lib/config'

const intlMiddleware = createMiddleware(routing);

const hasSupabaseEnv = Boolean(appConfig.supabase.url && appConfig.supabase.anonKey);

export async function middleware(request: NextRequest) {
  // 1. Run intl middleware first to handle routing (e.g., / -> /en)
  // This returns a response with the correct headers
  const response = intlMiddleware(request);

  // 2. Refresh the Supabase session — only when credentials are configured.
  //    On a static-only deploy (no Supabase env) we skip this so the
  //    middleware never crashes; auth features simply stay off.
  if (hasSupabaseEnv) {
    try {
      const supabase = createServerClient(
        appConfig.supabase.url,
        appConfig.supabase.anonKey,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({ name, value, ...options })
              response.cookies.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({ name, value: '', ...options })
              response.cookies.set({ name, value: '', ...options })
            },
          },
        }
      )
      await supabase.auth.getUser()
    } catch (error) {
      // Never let auth refresh take down routing.
      console.warn('[middleware] Supabase session refresh skipped:', error)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/', 
    '/(de|en|fr|zh)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}