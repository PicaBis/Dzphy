import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/adminAuth';

// GET /api/admin/messages — list contact form submissions (paginated).
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, messages: [] });
  }

  const limit = Math.min(Number(request.nextUrl.searchParams.get('limit')) || 50, 200);

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    // Degrade gracefully (e.g. table not created yet / migrations not applied)
    // so the admin dashboard still renders instead of erroring out.
    console.error('admin/messages query failed:', error.message);
    return NextResponse.json({ configured: true, messages: [], dbError: error.message });
  }

  return NextResponse.json({ configured: true, messages: data ?? [] });
}

// PATCH /api/admin/messages — update a message's status (new/read/replied/archived).
export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const { id, status } = body as Record<string, unknown>;
  const validStatuses = ['new', 'read', 'replied', 'archived'];
  if (typeof id !== 'string' || typeof status !== 'string' || !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid id/status' }, { status: 400 });
  }

  const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
  if (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
