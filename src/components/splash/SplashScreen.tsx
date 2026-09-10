"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

// New splash (v2) — shows once per browser, then never blocks the site again.
const SPLASH_KEY = "dzphy-splash-v2-seen";
const DURATION = 1800;

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem(SPLASH_KEY)) setShow(true);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(SPLASH_KEY, "true");
    } catch {
      /* ignore */
    }
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show || !mounted) return;
    const timer = setTimeout(dismiss, reduce ? 500 : DURATION);
    return () => clearTimeout(timer);
  }, [show, mounted, reduce, dismiss]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          role="status"
          aria-label="DzPhy"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white cursor-pointer select-none"
        >
          {/* Logo — clean, single entrance */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="h-28 w-28 sm:h-32 sm:w-32"
          >
            <Image
              src="/logo.png"
              alt="DzPhy"
              width={160}
              height={160}
              sizes="128px"
              className="h-full w-full object-contain"
              priority
            />
          </motion.div>

          {/* Wordmark */}
          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="mt-7 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl"
          >
            منصة الأستاذ بيكا
          </motion.h1>

          {/* Hand-crafted divider — line, diamond, line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mt-4 flex items-center gap-2"
            aria-hidden
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.45, ease: "easeOut" }}
              className="h-px w-12 origin-right bg-gray-300"
            />
            <span className="h-1.5 w-1.5 rotate-45 bg-orange-500" />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.45, ease: "easeOut" }}
              className="h-px w-12 origin-left bg-gray-300"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="mt-4 text-sm font-semibold text-gray-400 sm:text-base"
          >
            للفيزياء التعليمية
          </motion.p>

          {/* Progress line */}
          <div className="mt-10 h-[3px] w-44 overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-orange-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: reduce ? 0.3 : 1.35, ease: "easeInOut" }}
            />
          </div>

          {/* Skip */}
          <motion.button
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 text-xs font-bold text-gray-300 hover:text-gray-500 transition-colors"
          >
            تخطي
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
