import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, getServerUser } from '@/lib/supabase-server';

// GET /api/profile — the signed-in user's own profile row. RLS guarantees a
// user can never read another user's profile even if this code had a bug.
export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  return NextResponse.json({ profile: data });
}

// PUT /api/profile — update the signed-in user's own profile. RLS also
// enforces `id = auth.uid()` at the database level as a second layer.
export async function PUT(request: NextRequest) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, grade, avatar, goal } = body as Record<string, unknown>;
  const update: Record<string, unknown> = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    update.name = name.trim();
  }
  if (grade !== undefined) {
    const g = Number(grade);
    if (!Number.isInteger(g) || g < 1 || g > 4) {
      return NextResponse.json({ error: 'Invalid grade' }, { status: 400 });
    }
    update.grade = g;
  }
  if (avatar !== undefined) {
    if (typeof avatar !== 'string' || avatar.length > 10) {
      return NextResponse.json({ error: 'Invalid avatar' }, { status: 400 });
    }
    update.avatar = avatar;
  }
  if (goal !== undefined) {
    if (typeof goal !== 'string' || goal.length > 200) {
      return NextResponse.json({ error: 'Invalid goal' }, { status: 400 });
    }
    update.goal = goal.trim();
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(update)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}
