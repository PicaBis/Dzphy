"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GraduationCap, PlayCircle, FileDown, Image as ImageIcon, Newspaper, X, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DISMISS_KEY = "dzphy-starthere-dismissed";

const steps = [
  { n: 1, icon: GraduationCap, titleKey: "sh.1title", descKey: "sh.1desc", href: "/grade/3", color: "from-amber-400 to-yellow-600" },
  { n: 2, icon: PlayCircle, titleKey: "sh.2title", descKey: "sh.2desc", href: "/videos", color: "from-red-500 to-rose-600" },
  { n: 3, icon: FileDown, titleKey: "sh.3title", descKey: "sh.3desc", href: "/distributions", color: "from-sky-500 to-sky-600" },
  { n: 4, icon: ImageIcon, titleKey: "sh.4title", descKey: "sh.4desc", href: "/follow", color: "from-fuchsia-500 to-pink-500" },
  { n: 5, icon: Newspaper, titleKey: "sh.5title", descKey: "sh.5desc", href: "/follow", color: "from-blue-600 to-blue-700" },
];

export default function StartHere() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(true); // hidden until we read storage (avoids flash for returning users)

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  const close = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden bg-gradient-to-b from-orange-50/60 to-white dark:from-orange-500/5 dark:to-gray-950"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="relative rounded-3xl border border-orange-100 dark:border-orange-500/20 bg-white/70 dark:bg-gray-900/50 p-5 sm:p-7">
              <button
                onClick={close}
                aria-label={t("sh.close")}
                className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <Compass size={18} />
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">{t("sh.title")}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t("sh.subtitle")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={s.href}
                        className="group flex h-full flex-col rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white group-hover:scale-110 transition-transform`}>
                            <Icon size={19} />
                          </span>
                          <span className="text-2xl font-black text-gray-100 dark:text-gray-700 leading-none">{s.n}</span>
                        </div>
                        <p className="font-black text-gray-900 dark:text-white text-sm">{t(s.titleKey)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t(s.descKey)}</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
