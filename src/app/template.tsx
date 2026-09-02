"use client";
import { motion } from "framer-motion";

/**
 * App Router template — re-mounts on every navigation, giving a subtle,
 * flicker-free page transition. Opacity-only (no transform) so it never breaks
 * sticky/fixed layouts or scroll restoration, never reloads, and keeps
 * browser back/forward intact. Providers live in layout.tsx, so no state is
 * lost between routes. `MotionConfig reducedMotion="user"` (in layout) makes
 * this honour prefers-reduced-motion automatically.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
