import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, getServerUser } from '@/lib/supabase-server';

// GET /api/favorites — signed-in user's server-synced bookmarks.
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
    .from('favorites')
    .select('id, item_id, item_type, title, url, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
  return NextResponse.json({ favorites: data ?? [] });
}

// POST /api/favorites — add/sync one bookmark for the signed-in user.
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
  const { id, title, url, type } = body as Record<string, unknown>;
  if (typeof id !== 'string' || !id || id.length > 200) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const { error } = await supabase.from('favorites').upsert(
    {
      user_id: user.id,
      item_id: id,
      item_type: typeof type === 'string' ? type.slice(0, 30) : 'video',
      title: typeof title === 'string' ? title.slice(0, 300) : null,
      url: typeof url === 'string' ? url.slice(0, 500) : null,
    },
    { onConflict: 'user_id,item_id' }
  );

  if (error) {
    return NextResponse.json({ error: 'Failed to save favorite' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/favorites?id=xxx — remove one bookmark for the signed-in user.
export async function DELETE(request: NextRequest) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('item_id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to delete favorite' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
