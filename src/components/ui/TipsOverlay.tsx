"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { tips, TIPS_NO_REPEAT_WINDOW, type Tip } from "@/data/tips";
import { useSound } from "@/context/SoundContext";

const RECENT_KEY = "dzphy-tips-recent";
const FIRST_DELAY_MS = 25_000; // first tip ~25s after arrival (let the page settle)
const INTERVAL_MS = 5 * 60_000; // then roughly every 5 minutes
const VISIBLE_MS = 10_000; // stays ~10s then fades away
const RETRY_MS = 20_000; // if the user is busy, try again shortly

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeRecent(ids: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(-TIPS_NO_REPEAT_WINDOW)));
  } catch {
    /* ignore */
  }
}

/** Pick a tip that wasn't shown in the recent window (varies index by time). */
function pickTip(seed: number): Tip {
  const recent = new Set(readRecent());
  const pool = tips.filter((t) => !recent.has(t.id));
  const list = pool.length > 0 ? pool : tips;
  const tip = list[seed % list.length];
  writeRecent([...readRecent(), tip.id]);
  return tip;
}

/** True when it would be a bad moment to pop a tip (typing / modal / hidden tab). */
function isBusy(): boolean {
  if (typeof document === "undefined") return true;
  if (document.hidden) return true;
  // A modal/splash/lightbox locks body scroll — don't cover it.
  if (document.body.style.overflow === "hidden") return true;
  if (document.querySelector('[role="dialog"]')) return true;
  const el = document.activeElement as HTMLElement | null;
  if (el) {
    const tag = el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable) {
      return true;
    }
  }
  return false;
}

export default function TipsOverlay() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const { play } = useSound();
  const timers = useRef<{ show?: ReturnType<typeof setTimeout>; hide?: ReturnType<typeof setTimeout> }>({});
  const tickRef = useRef(0);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const showTip = useCallback(() => {
    if (isBusy()) {
      // Defer: reschedule a nearer retry without consuming the main cycle.
      timers.current.show = setTimeout(showTip, RETRY_MS);
      return;
    }
    tickRef.current += 1;
    setTip(pickTip(tickRef.current + Math.floor(Date.now() / INTERVAL_MS)));
    setVisible(true);
    timers.current.hide = setTimeout(() => setVisible(false), VISIBLE_MS);
    // schedule the next appearance
    timers.current.show = setTimeout(showTip, INTERVAL_MS);
  }, []);

  useEffect(() => {
    timers.current.show = setTimeout(showTip, FIRST_DELAY_MS);
    const t = timers.current;
    return () => {
      if (t.show) clearTimeout(t.show);
      if (t.hide) clearTimeout(t.hide);
    };
  }, [showTip]);

  const onClose = () => {
    play("close");
    hide();
  };

  return (
    <AnimatePresence>
      {visible && tip && (
        <motion.div
          key={tip.id}
          role="status"
          aria-live="polite"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[90] sm:max-w-sm"
        >
          <div className="relative overflow-hidden rounded-2xl border border-orange-100 dark:border-orange-500/20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl shadow-orange-500/10">
            <div className="flex items-start gap-3 p-4 pe-9">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
                <Lightbulb size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-black text-orange-600 dark:text-orange-400 mb-1">
                  💡 نصيحة الأستاذ بيكا
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">{tip.text}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق النصيحة"
                className="absolute top-2.5 left-2.5 flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <X size={15} />
              </button>
            </div>
            {/* auto-dismiss progress bar */}
            {!reduce && (
              <motion.div
                key={`${tip.id}-bar`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: VISIBLE_MS / 1000, ease: "linear" }}
                style={{ transformOrigin: "right" }}
                className="h-1 w-full bg-gradient-to-l from-orange-500 to-orange-300"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
