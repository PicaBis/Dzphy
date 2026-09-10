"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bell, Check, BellRing, AlertCircle, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import Tooltip from "@/components/ui/Tooltip";

type PermissionState = "default" | "granted" | "denied" | "unsupported";

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [permission, setPermission] = useState<PermissionState>("default");
  const boxRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { play } = useSound();

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission as PermissionState);
    } else {
      setPermission("unsupported");
    }
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const enablePush = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    try {
      const res = await Notification.requestPermission();
      setPermission(res as PermissionState);
      if (res === "granted") {
        play("success");
        try {
          new Notification("DzPhy", { body: t("notif.done") });
        } catch {
          /* some browsers require a service worker */
        }
      }
    } catch {
      /* ignore */
    }
  };

  const notices = [
    { key: "notif.n1", href: "/grade/4/lessons" },
    { key: "notif.n2", href: "/maktasabat-bem" },
    { key: "notif.n3", href: "/distributions" },
  ];

  return (
    <div ref={boxRef} className="relative">
      <Tooltip label={t("tt.notifications")} disabled={open}>
        <button
          onClick={() => { play(open ? "close" : "open"); setOpen((o) => !o); }}
          aria-label={t("tt.notifications")}
          aria-expanded={open}
          aria-haspopup="true"
          className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
        >
          <Bell size={19} />
          {permission === "default" && (
            <span className="absolute top-1.5 left-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-950" />
          )}
        </button>
      </Tooltip>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* Browser push notifications control */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <BellRing size={17} className="text-orange-500" />
                </div>
                <p className="font-black text-gray-900 dark:text-white text-sm">{t("notif.title")}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                {t("notif.desc")}
              </p>

              {permission === "granted" && (
                <span className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-2 rounded-lg">
                  <Check size={14} /> {t("notif.on")}
                </span>
              )}
              {permission === "default" && (
                <button
                  onClick={enablePush}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <Bell size={14} /> {t("notif.enable")}
                </button>
              )}
              {permission === "denied" && (
                <span className="flex items-center gap-2 text-xs font-bold text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-2 rounded-lg leading-relaxed">
                  <AlertCircle size={14} className="flex-shrink-0" /> {t("notif.blocked")}
                </span>
              )}
              {permission === "unsupported" && (
                <span className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 px-3 py-2 rounded-lg">
                  <AlertCircle size={14} className="flex-shrink-0" /> {t("notif.unsupported")}
                </span>
              )}
            </div>

            {/* Site updates */}
            <div className="p-2">
              <p className="px-2 pt-1 pb-2 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                {t("notif.updates")}
              </p>
              {notices.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => { play("click"); setOpen(false); }}
                  className="group flex items-center gap-2 px-2.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  <span className="flex-1 leading-relaxed">{t(n.key)}</span>
                  <ChevronLeft size={13} className="text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
