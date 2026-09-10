import type { ReactNode } from "react";

type TooltipProps = {
  label: string;
  children: ReactNode;
  side?: "bottom" | "top";
  disabled?: boolean;
  className?: string;
};

/**
 * Lightweight CSS-only tooltip — shows on hover and keyboard focus,
 * never blocks content (pointer-events-none), RTL-safe (centered).
 */
export default function Tooltip({
  label,
  children,
  side = "bottom",
  disabled = false,
  className = "",
}: TooltipProps) {
  if (disabled) return <span className={`inline-flex ${className}`}>{children}</span>;

  const pos = side === "bottom" ? "top-full mt-2" : "bottom-full mb-2";

  return (
    <span className={`group/tt relative inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${pos} left-1/2 -translate-x-1/2 z-[70] whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-700 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-lg opacity-0 scale-95 transition-all duration-150 group-hover/tt:opacity-100 group-hover/tt:scale-100 group-focus-within/tt:opacity-100 group-focus-within/tt:scale-100 motion-reduce:transition-none`}
      >
        {label}
      </span>
    </span>
  );
}
