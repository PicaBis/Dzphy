import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/adminAuth';

// GET /api/admin/stats — aggregate counts for the admin dashboard.
// Uses the service-role key (server only) which bypasses RLS by design —
// this route is itself the access-control boundary, gated by isAdminRequest.
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false });
  }

  const [profiles, attempts, messages, content] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('quiz_attempts').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
    supabase.from('content').select('id', { count: 'exact', head: true }),
  ]);

  return NextResponse.json({
    configured: true,
    users: profiles.count ?? 0,
    quizAttempts: attempts.count ?? 0,
    contactMessages: messages.count ?? 0,
    contentItems: content.count ?? 0,
  });
}
