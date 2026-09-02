"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  /** intrinsic dimensions for the thumbnail (next/image) */
  width: number;
  height: number;
  /** class applied to the clickable thumbnail wrapper */
  className?: string;
  /** class applied to the <Image> itself */
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Accessible image lightbox: the thumbnail opens a fullscreen viewer where the
 * image can be zoomed in/out. Closes on ESC, on backdrop click, or via the
 * close button. Body scroll is locked while open. Works for both the CV image
 * and the Telegram image (and any other zoomable picture).
 */
export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "object-cover w-full h-full",
  sizes,
  priority,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`تكبير الصورة: ${alt}`}
        className={`group relative block cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/60 ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={imgClassName}
        />
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-[11px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={12} /> تكبير
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
              >
                {/* Controls */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomed((z) => !z);
                    }}
                    aria-label={zoomed ? "تصغير" : "تكبير أكثر"}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="إغلاق"
                    autoFocus
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <X size={22} />
                  </button>
                </div>

                <motion.img
                  key="zoom-img"
                  src={src}
                  alt={alt}
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomed((z) => !z);
                  }}
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`max-h-[90vh] max-w-[95vw] select-none rounded-xl object-contain shadow-2xl transition-transform duration-300 ${
                    zoomed ? "scale-[1.6] cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  draggable={false}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
