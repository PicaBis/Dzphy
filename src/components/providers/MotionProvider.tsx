"use client";
import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every Framer Motion animation automatically honours the
 * user's `prefers-reduced-motion` setting (transforms/opacity are skipped for
 * users who opt out). Kept as a tiny client boundary so the root layout can
 * stay a server component.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
