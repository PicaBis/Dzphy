"use client";
import { motion } from "framer-motion";

type DividerType = "wave" | "curve" | "gradient" | "dots" | "zigzag" | "triangle";

interface SectionDividerProps {
  type?: DividerType;
  flip?: boolean;
  height?: "sm" | "md" | "lg";
  dark?: boolean;
}

const heightMap = {
  sm: "h-6 sm:h-8",
  md: "h-10 sm:h-14",
  lg: "h-14 sm:h-20",
};

export default function SectionDivider({
  type = "wave",
  flip = false,
  height = "md",
  dark = false,
}: SectionDividerProps) {
  const fillColor = dark ? "fill-gray-900 dark:fill-gray-950" : "fill-gray-50 dark:fill-gray-900";

  if (type === "dots") {
    return (
      <div className={`relative ${heightMap[height]} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="w-2 h-2 rounded-full bg-orange-300 dark:bg-orange-500/40"
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "gradient") {
    return (
      <div
        className={`${heightMap[height]}`}
        style={{
          background: dark
            ? "linear-gradient(to bottom, #111827, #030712)"
            : "linear-gradient(to bottom, #f9fafb, #ffffff)",
        }}
      />
    );
  }

  if (type === "zigzag") {
    return (
      <div className={`relative ${heightMap[height]} overflow-hidden`}>
        <svg
          className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L50 20L100 0L150 20L200 0L250 20L300 0L350 20L400 0L450 20L500 0L550 20L600 0L650 20L700 0L750 20L800 0L850 20L900 0L950 20L1000 0L1050 20L1100 0L1150 20L1200 0V120H0V0Z"
            className={fillColor}
          />
        </svg>
      </div>
    );
  }

  if (type === "triangle") {
    return (
      <div className={`relative ${heightMap[height]} overflow-hidden`}>
        <svg
          className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M600 0L1200 120H0L600 0Z"
            className={fillColor}
          />
        </svg>
      </div>
    );
  }

  if (type === "curve") {
    return (
      <div className={`relative ${heightMap[height]} overflow-hidden`}>
        <svg
          className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120C300 40 900 40 1200 120V120H0V120Z"
            className={fillColor}
          />
          <path
            d="M0 120C300 40 900 40 1200 120"
            stroke="url(#gradient-stroke)"
            strokeWidth="2"
            fill="none"
            className="opacity-30"
          />
          <defs>
            <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="50%" stopColor="#FF9A3C" />
              <stop offset="100%" stopColor="#FF7A00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${heightMap[height]} overflow-hidden`}>
      <svg
        className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0C200 100 400 100 600 50C800 0 1000 0 1200 50V120H0V0Z"
          className={fillColor}
        />
        <path
          d="M0 0C200 100 400 100 600 50C800 0 1000 0 1200 50"
          stroke="url(#wave-gradient)"
          strokeWidth="2"
          fill="none"
          className="opacity-30"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="50%" stopColor="#FF9A3C" />
            <stop offset="100%" stopColor="#FF7A00" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
