import { NextResponse } from 'next/server';
import { getSupabaseServer, getServerUser } from '@/lib/supabase-server';

// GET /api/quiz/results — the signed-in user's own quiz attempts, most
// recent first. RLS also enforces `user_id = auth.uid()` at the DB level.
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
    .from('quiz_attempts')
    .select('id, quiz_id, score, total, percentage, time_taken, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }

  return NextResponse.json({ results: data ?? [] });
}
