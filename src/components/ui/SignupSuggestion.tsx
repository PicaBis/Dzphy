"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, LogIn, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const DISMISS_KEY = "dzphy-signup-suggestion-dismissed";
const HIDDEN_ROUTES = ["/login", "/signup", "/reset-password"];

/**
 * First-visit signup suggestion — a calm inline banner (not a popup).
 * Shown once per browser to guests only; never blocks the site.
 */
export default function SignupSuggestion() {
  const { user, loading, isConfigured } = useAuth();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return;
    }
    // Small delay so it feels part of the page, not an aggressive popup.
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!mounted || loading || !isConfigured || user) return null;
  if (HIDDEN_ROUTES.some((r) => pathname?.startsWith(r))) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto", marginTop: "4rem" }}
          exit={{ opacity: 0, y: -16, height: 0, marginTop: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10">
                  <UserPlus size={19} className="text-orange-500" />
                </span>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center sm:text-right leading-relaxed">
                  أنشئ حسابك للوصول إلى المفضلة وحفظ تقدمك عبر كل أجهزتك.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/signup"
                  onClick={dismiss}
                  className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors"
                >
                  <UserPlus size={14} />
                  إنشاء حساب
                </Link>
                <Link
                  href="/login"
                  onClick={dismiss}
                  className="flex items-center gap-1.5 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500/40 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors"
                >
                  <LogIn size={14} />
                  تسجيل الدخول
                </Link>
                <button
                  onClick={dismiss}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-2 transition-colors"
                >
                  متابعة كزائر
                </button>
                <button
                  onClick={dismiss}
                  aria-label="إغلاق"
                  className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
