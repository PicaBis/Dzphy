import { NextRequest } from "next/server";
import { getSupabase, type ContentRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Validates query parameters for content endpoint
function validateContentQuery(params: Record<string, string | null>) {
  const type = params.type;
  const level = params.level;
  const platform = params.platform;
  const limit = params.limit ? Number(params.limit) : 100;

  // Validation
  if (limit < 1 || limit > 1000 || isNaN(limit)) {
    throw new Error("Invalid limit parameter");
  }

  if (type && !["lesson", "summary", "exercise", "solution", "video", "post"].includes(type)) {
    throw new Error("Invalid type parameter");
  }

  if (level && !["bem", "1as", "2as", "3as", "bac"].includes(level)) {
    throw new Error("Invalid level parameter");
  }

  if (platform && !["youtube", "tiktok", "instagram", "internal"].includes(platform)) {
    throw new Error("Invalid platform parameter");
  }

  return { type, level, platform, limit: Math.min(limit, 200) };
}

// Reads dynamic educational content from Supabase (persists across redeploys).
// If Supabase env vars are not configured, returns an empty list so the rest of
// the site keeps working with its built-in data — nothing breaks.
//
// Query params (all optional): ?type=video&level=bem&platform=youtube&limit=50
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return Response.json({ configured: false, items: [] as ContentRow[] });
    }

    const sp = request.nextUrl.searchParams;
    const params = Object.fromEntries(sp.entries());

    // Validate query parameters
    const validated = validateContentQuery(params);

    let query = supabase
      .from("content")
      .select("*")
      .eq("is_active", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(validated.limit);

    if (validated.type) query = query.eq("type", validated.type);
    if (validated.level) query = query.eq("level", validated.level);
    if (validated.platform) query = query.eq("platform", validated.platform);

    const { data, error } = await query;
    if (error) {
      return Response.json(
        { configured: true, items: [] as ContentRow[], error: "Database error" },
        { status: 200 }
      );
    }

    return Response.json({ configured: true, items: (data ?? []) as ContentRow[] });
  } catch (error) {
    return Response.json(
      { configured: false, items: [], error: "Invalid request parameters" },
      { status: 400 }
    );
  }
}
