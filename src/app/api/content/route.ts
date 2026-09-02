import { NextRequest } from "next/server";
import { getSupabase, type ContentRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Reads dynamic educational content from Supabase (persists across redeploys).
// If Supabase env vars are not configured, returns an empty list so the rest of
// the site keeps working with its built-in data — nothing breaks.
//
// Query params (all optional): ?type=video&level=bem&platform=youtube&limit=50
export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return Response.json({ configured: false, items: [] as ContentRow[] });
  }

  const sp = request.nextUrl.searchParams;
  const type = sp.get("type");
  const level = sp.get("level");
  const platform = sp.get("platform");
  const limit = Math.min(Number(sp.get("limit")) || 100, 200);

  let query = supabase
    .from("content")
    .select("*")
    .eq("is_active", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (type) query = query.eq("type", type);
  if (level) query = query.eq("level", level);
  if (platform) query = query.eq("platform", platform);

  const { data, error } = await query;
  if (error) {
    return Response.json(
      { configured: true, items: [] as ContentRow[], error: error.message },
      { status: 200 }
    );
  }

  return Response.json({ configured: true, items: (data ?? []) as ContentRow[] });
}
