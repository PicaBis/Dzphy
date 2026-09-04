'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError('كلمة المرور غير صحيحة');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('حدث خطأ. حاول مرة أخرى.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Lock size={32} className="text-orange-600" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-center text-gray-900 mb-2">لوحة التحكم</h1>
        <p className="text-center text-gray-500 text-sm mb-6">أدخل كلمة المرور الإدارية</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 flex items-center gap-2">
            <AlertCircle size={18} className="text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          هذه الصفحة محمية بكلمة مرور إدارية
        </p>
      </div>
    </div>
  );
}
