"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Bookmark, Share2 } from "lucide-react";
import { useFocusMode } from "./FocusMode";

export default function QuickActions() {
  const [open, setOpen] = useState(false);
  const { isFocused } = useFocusMode();

  if (isFocused) return null;

  const actions = [
    { icon: Search, label: "بحث", href: "/search", color: "bg-blue-500" },
    { icon: Bookmark, label: "المفضلة", href: "#", color: "bg-purple-500" },
    { icon: Share2, label: "مشاركة", href: "#", color: "bg-green-500" },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="group relative flex items-center"
              >
                <span className="absolute right-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {action.label}
                </span>
                <div className={`w-10 h-10 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform`}>
                  <Icon size={18} />
                </div>
              </motion.a>
            );
          })}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="إجراءات سريعة"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={24} />
        </motion.div>
      </motion.button>
    </div>
  );
}
