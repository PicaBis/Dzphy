"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    router.push("/profile");
  };

  const inputCls =
    "w-full pr-10 pl-10 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 dark:text-white transition-colors";
  const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 w-full max-w-md overflow-hidden shadow-sm"
      >
        {/* Brand header — clean, no gradient banner */}
        <div className="p-7 sm:p-8 text-center border-b border-gray-100 dark:border-gray-700">
          <div className="mx-auto h-14 w-14 mb-4">
            <Image src="/logo.png" alt="DzPhy" width={64} height={64} sizes="56px" className="h-full w-full object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">تسجيل الدخول</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">
            ادخل لحفظ تقدمك عبر كل أجهزتك
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-4">
          {!isConfigured && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                خدمة الحسابات غير مفعّلة حاليًا على هذا الخادم. يمكنك متابعة استخدام الموقع بدون حساب — تقدمك سيُحفظ في متصفحك فقط.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className={labelCls}>البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  dir="ltr"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={labelCls}>كلمة المرور</label>
              <div className="relative">
                <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  dir="ltr"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Link href="/reset-password" className="block text-xs text-orange-500 hover:text-orange-600 mt-1.5 font-semibold">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !isConfigured}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3.5 rounded-xl font-black transition-all shadow-lg shadow-orange-200 dark:shadow-orange-500/20 active:scale-[0.99]"
            >
              <LogIn size={17} />
              {loading ? "جاري الدخول..." : "دخول"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-bold">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
