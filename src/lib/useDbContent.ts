"use client";
import { useEffect, useState } from "react";

// Shape returned by /api/content (subset we actually use in the UI).
export interface DbContentItem {
  id: string;
  platform: string;
  type: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  url: string | null;
  badge?: string | null;
  published_at: string | null;
}

interface ApiResponse {
  configured: boolean;
  items: DbContentItem[];
}

/**
 * Reads dynamic content from Supabase via /api/content for a given platform.
 * When Supabase isn't configured (or is empty / errors), it simply returns an
 * empty list — callers merge it over their curated data so the UI always works.
 * This is the single, safe bridge that lets the site go fully DB-driven later
 * without touching components.
 */
export function useDbContent(platform: string): { items: DbContentItem[]; loading: boolean } {
  const [items, setItems] = useState<DbContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    fetch(`/api/content?platform=${encodeURIComponent(platform)}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((json: ApiResponse) => {
        if (!alive) return;
        setItems(Array.isArray(json.items) ? json.items : []);
      })
      .catch(() => {
        /* keep curated fallback — never break the section */
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
      controller.abort();
    };
  }, [platform]);

  return { items, loading };
}
