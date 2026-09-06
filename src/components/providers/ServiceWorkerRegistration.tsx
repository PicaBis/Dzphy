"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // SW registered successfully (silent in production)
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.warn("SW registration failed:", error);
          }
        });
    }
  }, []);

  return null;
}
