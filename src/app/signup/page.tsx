"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, AlertCircle, CheckCircle, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-3">
            <UserPlus size={26} />
          </div>
          <h1 className="text-2xl font-black">إنشاء حساب</h1>
          <p className="text-white/80 text-sm mt-1">احفظ تقدمك ونتائجك عبر كل أجهزتك</p>
        </div>

        <div className="p-6 space-y-4">
          {!isConfigured && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                خدمة الحسابات غير مفعّلة حاليًا على هذا الخادم.
              </p>
            </div>
          )}

          {success ? (
            <div className="text-center py-6">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <p className="text-gray-700 dark:text-gray-200 font-semibold">
                تم إنشاء الحساب! تحقق من بريدك الإلكتروني لتأكيد الحساب.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    الاسم
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
                      placeholder="اسمك الكامل"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      required
                      dir="ltr"
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
                      placeholder="6 أحرف على الأقل"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-black transition-all shadow-lg"
                >
                  {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-semibold">
                  تسجيل الدخول
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
