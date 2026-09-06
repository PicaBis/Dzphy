// Server-side protection for /admin routes
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for valid admin token
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminToken || !adminSecret || adminToken.value !== adminSecret) {
    redirect('/admin-login');
  }

  return children;
}
