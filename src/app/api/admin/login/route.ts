import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Simple password validation (should be in env)
    const correctPassword = process.env.ADMIN_SECRET;

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Admin not configured' },
        { status: 500 }
      );
    }

    if (!password || password !== correctPassword) {
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
