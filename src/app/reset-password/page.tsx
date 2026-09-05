"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, KeyRound, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const { resetPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setSent(true);
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
            <KeyRound size={26} />
          </div>
          <h1 className="text-2xl font-black">استعادة كلمة المرور</h1>
          <p className="text-white/80 text-sm mt-1">سنرسل رابط إعادة التعيين إلى بريدك</p>
        </div>

        <div className="p-6 space-y-4">
          {!isConfigured && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400">خدمة الحسابات غير مفعّلة حاليًا.</p>
            </div>
          )}

          {sent ? (
            <div className="text-center py-6">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <p className="text-gray-700 dark:text-gray-200 font-semibold">
                تحقق من بريدك الإلكتروني لإكمال إعادة تعيين كلمة المرور.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}
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
              <button
                type="submit"
                disabled={loading || !isConfigured}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-black transition-all shadow-lg"
              >
                {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-semibold">
              العودة لتسجيل الدخول
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
