import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token');
    const adminSecret = process.env.ADMIN_SECRET;

    // Allow if correct token is provided
    if (!adminToken || !adminSecret || adminToken.value !== adminSecret) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
