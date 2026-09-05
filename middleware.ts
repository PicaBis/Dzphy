import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // --- Refresh the Supabase Auth session cookie on every navigation --------
  // Guarded: if Supabase isn't configured, this is a no-op (site still works
  // with localStorage-only features, same as every other Supabase call here).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    // Touching auth.getUser() refreshes the session token if needed.
    await supabase.auth.getUser().catch(() => null);
  }

  // --- Protect /admin routes (separate from user auth — single shared
  // password, see /admin-login) --------------------------------------------
  // NOTE: must be an exact-segment match, not a plain startsWith("/admin"),
  // otherwise it would also swallow /admin-login itself (startsWith would
  // match "/admin-login" as a substring of "/admin"), locking everyone out
  // of the login page in an infinite redirect.
  const path = request.nextUrl.pathname;
  if (path === '/admin' || path.startsWith('/admin/')) {
    const adminToken = request.cookies.get('admin_token');
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminToken || !adminSecret || adminToken.value !== adminSecret) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every route except static assets, so the Supabase session
     * cookie stays fresh, while excluding heavy/static paths for performance.
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)',
  ],
};
