import { NextRequest } from 'next/server';

/** True when the request carries a valid admin session cookie. */
export function isAdminRequest(request: NextRequest): boolean {
  const adminToken = request.cookies.get('admin_token');
  const adminSecret = process.env.ADMIN_SECRET;
  return Boolean(adminToken && adminSecret && adminToken.value === adminSecret);
}
