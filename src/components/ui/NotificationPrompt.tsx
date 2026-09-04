"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";

export default function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (!("Notification" in window)) return;
    setPermission(Notification.permission);
    if (Notification.permission === "default") {
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShow(false);
    } catch {
      // ignored
    }
  };

  const dismiss = () => setShow(false);

  if (!show || permission !== "default") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm"
      >
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Bell size={20} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">تفعيل الإشعارات</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                اشترك لتصلك تنبيهات بالدروس الجديدة والملخصات المحدثة
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={requestPermission}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-xs font-bold transition-all"
                >
                  تفعيل
                </button>
                <button
                  onClick={dismiss}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  لاحقًا
                </button>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
