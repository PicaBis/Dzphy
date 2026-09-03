"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-orange-500/20 dark:bg-orange-500/10 z-[60] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 shadow-lg shadow-orange-500/50"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </motion.div>
  );
}
