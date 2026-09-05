// ============================================================================
// DzPhy — Supabase browser client (Auth-aware, cookie-based session)
// ----------------------------------------------------------------------------
// Used ONLY in client components ("use client"). Reads the public URL/anon
// key. Returns null when not configured so callers can show a friendly
// "sign-in unavailable" state instead of crashing.
// ============================================================================

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    cached = null;
    return null;
  }

  cached = createBrowserClient(url, anonKey);
  return cached;
}

export const isAuthConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
