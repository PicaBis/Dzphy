// ============================================================================
// DzPhy — Supabase server client (Auth-aware, cookie-based session)
// ----------------------------------------------------------------------------
// Used ONLY in Server Components / Route Handlers / Server Actions. Reads the
// session from request cookies via next/headers, respects RLS as the signed
// -in user (anon key only — NEVER the service-role key). Returns null when
// not configured so callers can degrade gracefully.
// ============================================================================

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getSupabaseServer(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component that can't set cookies — safe to
          // ignore because the middleware refreshes the session on navigation.
        }
      },
    },
  });
}

/** Returns the authenticated user for the current request, or null. */
export async function getServerUser() {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}
