import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, getServerUser } from '@/lib/supabase-server';

const VALID_TYPES = ['video', 'lesson', 'flashcard', 'quiz'];

// GET /api/lessons/progress — signed-in user's completed items.
export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('lesson_progress')
    .select('item_id, item_type, completed, completed_at')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
  return NextResponse.json({ progress: data ?? [] });
}

// POST /api/lessons/progress — mark one item complete for the signed-in user.
export async function POST(request: NextRequest) {
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
  const { itemId, itemType } = body as Record<string, unknown>;
  if (typeof itemId !== 'string' || !itemId || itemId.length > 200) {
    return NextResponse.json({ error: 'Invalid itemId' }, { status: 400 });
  }
  const type = typeof itemType === 'string' && VALID_TYPES.includes(itemType) ? itemType : 'video';

  const { error } = await supabase.from('lesson_progress').upsert(
    { user_id: user.id, item_id: itemId, item_type: type, completed: true, completed_at: new Date().toISOString() },
    { onConflict: 'user_id,item_id,item_type' }
  );

  if (error) {
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
