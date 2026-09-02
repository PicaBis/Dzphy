"use client";
import { motion } from "framer-motion";
import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  hint?: string;
  action?: { label: string; onClick?: () => void; href?: string };
}

/** Friendly empty state — an icon, a helpful message, and an optional action. */
export function EmptyState({ icon: Icon = Inbox, title, hint, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-3 py-14 sm:py-20 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
        <Icon size={30} className="text-gray-400 dark:text-gray-500" />
      </div>
      <p className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-200">{title}</p>
      {hint && <p className="max-w-sm text-sm text-gray-400 dark:text-gray-500">{hint}</p>}
      {action &&
        (action.href ? (
          <a
            href={action.href}
            className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600"
          >
            {action.label}
          </button>
        ))}
    </motion.div>
  );
}

interface ErrorStateProps {
  title?: string;
  hint?: string;
  onRetry?: () => void;
}

/** Resilient error state — never a broken page; offers a retry. */
export function ErrorState({
  title = "تعذّر تحميل هذا القسم حاليًا",
  hint = "قد تكون هناك مشكلة مؤقتة في الشبكة. حاول مرة أخرى بعد قليل.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-3 py-14 sm:py-20 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
        <AlertCircle size={30} className="text-red-400" />
      </div>
      <p className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-200">{title}</p>
      {hint && <p className="max-w-sm text-sm text-gray-400 dark:text-gray-500">{hint}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-600"
        >
          <RefreshCw size={16} /> إعادة المحاولة
        </button>
      )}
    </motion.div>
  );
}
