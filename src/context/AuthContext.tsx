"use client";
// ============================================================================
// DzPhy — Auth context (Supabase Auth, guarded)
// ----------------------------------------------------------------------------
// Wraps Supabase's browser client so the rest of the app can call
// useAuth() without worrying whether Supabase is configured. When it isn't
// configured, isConfigured=false and every action resolves with a clear
// error instead of throwing — the site keeps working with the existing
// localStorage-only profile/quiz features either way.
// ============================================================================
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser, isAuthConfigured } from "@/lib/supabase-browser";

interface AuthContextType {
  user: User | null;
  /** Display name from the account (metadata name, fallback to email prefix). */
  displayName: string | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  displayName: null,
  loading: false,
  isConfigured: false,
  signUp: async () => ({ error: "Auth not configured" }),
  signIn: async () => ({ error: "Auth not configured" }),
  signOut: async () => {},
  resetPassword: async () => ({ error: "Auth not configured" }),
});

/** Derive a clean display name from the Supabase user object. */
function nameOf(user: User | null): string | null {
  if (!user) return null;
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const metaName = typeof meta.name === "string" ? meta.name.trim() : "";
  if (metaName) return metaName;
  const first = typeof meta.first_name === "string" ? meta.first_name.trim() : "";
  const last = typeof meta.last_name === "string" ? meta.last_name.trim() : "";
  const joined = [first, last].filter(Boolean).join(" ").trim();
  if (joined) return joined;
  if (user.email) return user.email.split("@")[0];
  return null;
}

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isAuthConfigured);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp: AuthContextType["signUp"] = async (email, password, name) => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return { error: "خدمة الحسابات غير مفعّلة حاليًا" };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: name ? { name } : undefined },
    });
    return { error: error?.message ?? null };
  };

  const signIn: AuthContextType["signIn"] = async (email, password) => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return { error: "خدمة الحسابات غير مفعّلة حاليًا" };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  const resetPassword: AuthContextType["resetPassword"] = async (email) => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return { error: "خدمة الحسابات غير مفعّلة حاليًا" };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined,
    });
    return { error: error?.message ?? null };
  };

  return (
    <AuthContext.Provider
      value={{ user, displayName: nameOf(user), loading, isConfigured: isAuthConfigured, signUp, signIn, signOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
