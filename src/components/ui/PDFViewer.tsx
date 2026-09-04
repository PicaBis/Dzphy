"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Download,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PDFViewerProps {
  url: string;
  title: string;
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);

  const zoomIn = () => setZoom((z) => Math.min(200, z + 25));
  const zoomOut = () => setZoom((z) => Math.max(50, z - 25));
  const resetZoom = () => setZoom(100);

  return (
    <div className={fullscreen ? "fixed inset-0 z-[100] bg-gray-900" : ""}>
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-xs">{title}</h3>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={zoom <= 50}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="تصغير"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-center">{zoom}%</span>
          <button
            onClick={zoomIn}
            disabled={zoom >= 200}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="تكبير"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            aria-label="إعادة تعيين"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={url}
            download
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all"
          >
            <Download size={14} />
            تحميل
          </a>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            aria-label={fullscreen ? "تصغير" : "ملء الشاشة"}
          >
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        className={fullscreen ? "h-[calc(100vh-56px)]" : "h-[600px]"}
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
      >
        <iframe
          src={`${url}#toolbar=0&navpanes=0`}
          title={title}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
