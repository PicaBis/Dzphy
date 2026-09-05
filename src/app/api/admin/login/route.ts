import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Brute-force protection: 5 attempts per 15 minutes per IP.
    const ip = getClientIp(request);
    const { allowed } = rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: 'محاولات كثيرة جدًا. حاول لاحقًا.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const password = body && typeof body === 'object' ? (body as Record<string, unknown>).password : undefined;

    const correctPassword = process.env.ADMIN_SECRET;

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Admin not configured' },
        { status: 500 }
      );
    }

    if (typeof password !== 'string' || password !== correctPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Set secure cookie with token
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
