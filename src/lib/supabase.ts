import { createClient } from '@supabase/supabase-js'
import { config } from './config'

// Fall back to harmless placeholders so the app can build/render even when
// Supabase env vars are not configured yet (e.g. a static-only first deploy).
// Auth simply won't work until real credentials are provided.
const SUPABASE_URL = config.supabase.url || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = config.supabase.anonKey || 'placeholder-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function signInWithGoogle() {
  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/callback`
    : `${config.app.url}/auth/callback`
    
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl
    }
  })
  
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}