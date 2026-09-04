import Link from 'next/link';
import { Home, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4 pt-20">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-9xl font-black text-orange-500 dark:text-orange-400 drop-shadow-lg">
            404
          </h1>
        </div>

        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
          صفحة غير موجودة
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم حذفها.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <Home size={20} />
            العودة إلى الرئيسية
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 w-full border-2 border-orange-500 text-orange-600 dark:text-orange-400 px-6 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all"
          >
            <Search size={20} />
            البحث في المنصة
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">هل تحتاج مساعدة؟</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-semibold text-sm"
          >
            اتصل بنا
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
