"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const shortcuts = [
  { key: "/", desc: "بحث", descEn: "Search" },
  { key: "t", desc: "تبديل الثيم", descEn: "Toggle theme" },
  { key: "h", desc: "الصفحة الرئيسية", descEn: "Home" },
  { key: "?", desc: "إظهار الاختصارات", descEn: "Show shortcuts" },
  { key: "Esc", desc: "إغلاق", descEn: "Close" },
];

export default function KeyboardShortcuts() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "?") {
        e.preventDefault();
        setVisible((v) => !v);
      }
      if (e.key === "Escape") {
        setVisible(false);
      }
      if (e.key === "/") {
        e.preventDefault();
        router.push("/search");
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTheme();
      }
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, toggleTheme]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            onClick={() => setVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] w-full max-w-md mx-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <Keyboard size={20} className="text-orange-500" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">اختصارات لوحة المفاتيح</h3>
                </div>
                <button
                  onClick={() => setVisible(false)}
                  className="w-8 h-8 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((s) => (
                  <div key={s.key} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</span>
                    <kbd className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-mono font-bold border border-gray-200 dark:border-gray-700">
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
