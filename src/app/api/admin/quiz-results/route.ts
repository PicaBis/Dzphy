import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/adminAuth';

// GET /api/admin/quiz-results — all quiz attempts across all users, for the
// admin dashboard (aggregate view). Uses the service-role key server-side.
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, attempts: [] });
  }

  const limit = Math.min(Number(request.nextUrl.searchParams.get('limit')) || 100, 500);

  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('id, user_id, quiz_id, score, total, percentage, time_taken, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    // Degrade gracefully (e.g. table not created yet) so the dashboard renders.
    console.error('admin/quiz-results query failed:', error.message);
    return NextResponse.json({ configured: true, attempts: [], dbError: error.message });
  }

  return NextResponse.json({ configured: true, attempts: data ?? [] });
}
