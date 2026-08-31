// ============================================================================
// DzPhy — Supabase clients (guarded / optional)
// ----------------------------------------------------------------------------
// Nothing here throws when env vars are missing: the site keeps working with
// its built-in data and simply skips Supabase. Wire it up by setting these in
// Vercel → Settings → Environment Variables:
//
//   NEXT_PUBLIC_SUPABASE_URL        = https://gmuruowuodywknbpxvhk.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY   = <publishable / anon key>   (safe for browser)
//   SUPABASE_SERVICE_ROLE_KEY       = <service role key>         (server ONLY, never public)
//
// The service-role key MUST stay server-side. It is read from a non-public env
// var and used only inside API routes / server code — never sent to the client.
// ============================================================================

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when the public (read) client can be created. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Public, read-only client (anon key). Safe on server or browser. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/**
 * Privileged client (service-role). SERVER ONLY — never import into a client
 * component. Returns null if the service key is not configured.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export interface ContentRow {
  id: string;
  platform: string;
  source: string | null;
  external_id: string | null;
  type: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  url: string | null;
  subject: string | null;
  level: string | null;
  category: string | null;
  stream: string | null;
  published_at: string | null;
  is_active: boolean;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
