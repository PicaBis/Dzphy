import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendContactNotification } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

// In-memory fallback so messages aren't silently dropped when Supabase isn't
// configured (matches the rest of the project's "never break, degrade
// gracefully" philosophy). Once Supabase IS configured, messages go there.
const fallbackContacts: Array<{ name: string; email: string; subject: string; message: string; date: string }> = [];

export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting: 5 submissions per 10 minutes per IP ----------------
    const ip = getClientIp(request);
    const { allowed, resetAt } = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: 'طلبات كثيرة جدًا. حاول مرة أخرى لاحقًا.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)) } }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const { name, email, subject, message } = body as Record<string, unknown>;

    // --- Server-side validation (never trust the client) -------------------
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const contact = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    };

    // --- Persist: Supabase if configured, in-memory fallback otherwise -----
    const supabaseAdmin = getSupabaseAdmin();
    let persisted: 'supabase' | 'memory' = 'memory';
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from('contact_messages').insert({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
      });
      if (!error) persisted = 'supabase';
      else console.error('Supabase contact insert failed:', error.message);
    }
    if (persisted === 'memory') {
      fallbackContacts.push(contact);
    }

    // --- Notify by email (best-effort; never fails the request) ------------
    const emailResult = await sendContactNotification(contact);

    return NextResponse.json({
      success: true,
      message: 'تم استقبال رسالتك بنجاح. شكرًا لتواصلك معنا.',
      persisted,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'حدث خطأ في معالجة الرسالة' }, { status: 500 });
  }
}

// Admin endpoint to view contacts (also exposed at /api/admin/messages).
export async function GET(request: NextRequest) {
  try {
    const adminToken = request.cookies.get('admin_token');
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminToken || !adminSecret || adminToken.value !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error) {
        return NextResponse.json({ count: data?.length ?? 0, contacts: data ?? [], source: 'supabase' });
      }
    }

    return NextResponse.json({
      count: fallbackContacts.length,
      contacts: fallbackContacts.slice(-50),
      source: 'memory',
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
