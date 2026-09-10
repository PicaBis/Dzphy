"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, AlertCircle, CheckCircle, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const name = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!name) {
      setError("يرجى إدخال اسمك الكامل");
      return;
    }
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
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">إنشاء حساب</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">
            احفظ مفضلتك وتقدمك عبر كل أجهزتك
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-4">
          {!isConfigured && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                خدمة الحسابات غير مفعّلة حاليًا على هذا الخادم.
              </p>
            </div>
          )}

          {success ? (
            <div className="text-center py-8">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <p className="text-gray-700 dark:text-gray-200 font-bold">
                تم إنشاء الحساب
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">
                تحقق من بريدك الإلكتروني لتأكيد الحساب، ثم سجّل الدخول.
              </p>
              <div className="mt-4 h-1 w-32 mx-auto overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full bg-orange-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.4, ease: "linear" }}
                />
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                {/* Name — organized: first + last */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className={labelCls}>الاسم</label>
                    <div className="relative">
                      <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="firstName"
                        required
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputCls}
                        placeholder="الاسم"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelCls}>اللقب</label>
                    <div className="relative">
                      <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="lastName"
                        required
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputCls}
                        placeholder="اللقب"
                      />
                    </div>
                  </div>
                </div>

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
                      minLength={6}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputCls}
                      placeholder="6 أحرف على الأقل"
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
                </div>

                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3.5 rounded-xl font-black transition-all shadow-lg shadow-orange-200 dark:shadow-orange-500/20 active:scale-[0.99]"
                >
                  <UserPlus size={17} />
                  {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 font-bold">
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
