"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Confetti from "@/components/ui/Confetti";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setShowConfetti(true);
    setEmail("");
    setTimeout(() => {
      setStatus("idle");
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <>
      <Confetti trigger={showConfetti} />
      <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 dark:from-orange-600 dark:via-orange-600 dark:to-orange-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Mail size={28} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
            {t("newsletter.title")}
          </h2>
          <p className="text-orange-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            {t("newsletter.desc")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full px-5 py-3.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl text-sm font-medium placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50 transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-w-[140px]"
            >
              <AnimatePresence mode="wait">
                {status === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-5 h-5 border-2 border-white/30 dark:border-gray-900/30 border-t-white dark:border-t-gray-900 rounded-full animate-spin"
                  />
                ) : status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Check size={18} />
                    <span>{t("newsletter.success")}</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {t("newsletter.subscribe")}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <p className="text-orange-200 text-xs mt-4">
            {t("newsletter.privacy")}
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
}
