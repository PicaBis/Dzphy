"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";
import type { PlaylistResponse } from "@/app/api/playlists/route";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

const YT = ({ s = 13 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
);

// The one free-courses playlist shown on the home page.
// Static fallback mirrors the real playlist so the section never breaks
// even when the live API is unreachable.
const FALLBACK = {
  title: "الدورات والبثوث",
  description: "تسجيلات الدورات التأسيسية والبثوث المباشرة — من الصفر إلى الاحتراف.",
  playlistUrl: "https://youtube.com/playlist?list=PLENnjsac87c8",
  videoId: "0toWJ_u6ttc",
  videosCount: 0,
};

interface PlaylistCard {
  title: string;
  description: string;
  playlistUrl: string;
  videoId: string;
  videosCount: number;
}

export default function CoursesSection() {
  const { t } = useLanguage();
  const [playlist, setPlaylist] = useState<PlaylistCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/playlists?type=courses")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then((data: PlaylistResponse[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const pl = data[0];
          setPlaylist({
            title: pl.title,
            description: pl.description,
            playlistUrl: pl.playlistUrl,
            videoId: pl.videoId,
            videosCount: pl.videos.length,
          });
        } else {
          setPlaylist(FALLBACK);
        }
      })
      .catch(() => setPlaylist(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-18 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-12"
        >
          <div>
            <span className="inline-block bg-green-100 dark:bg-green-500/25 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-sm">
              {t("cs.free")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
              {t("cs.freeTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-xl text-base sm:text-lg leading-relaxed">
              {t("cs.freeDesc")}
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400 font-bold text-sm border-2 border-orange-300 dark:border-orange-500/40 hover:border-orange-500 dark:hover:border-orange-500/60 px-5 py-3 rounded-lg transition-all hover:bg-orange-50 dark:hover:bg-orange-500/15 shrink-0 shadow-sm"
          >
            {t("cs.all")} <DirectionArrow size={18} />
          </Link>
        </motion.div>

        {/* The single free playlist */}
        {loading && (
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-9 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <div className="aspect-video rounded-2xl bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-5 py-2">
              <div className="h-7 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-2/3 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="h-12 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        )}

        {!loading && playlist && (
          <motion.a
            href={playlist.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-9 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 hover:shadow-2xl hover:border-red-400 dark:hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 active:scale-[0.99]"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${playlist.videoId}/hqdefault.jpg`}
                alt={playlist.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                <span className="w-20 h-20 rounded-full bg-red-600 group-hover:bg-red-500 group-hover:scale-125 flex items-center justify-center shadow-2xl transition-all duration-300">
                  <Play size={28} className="text-white ms-1" fill="currentColor" />
                </span>
              </div>
              <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
                {t("common.free")}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/15 px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                <YT /> YouTube
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {playlist.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {playlist.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-7 py-3.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-200 dark:shadow-red-500/30 group-hover:shadow-xl">
                  <Play size={17} fill="currentColor" />
                  {t("cs.watch")}
                </span>
                {playlist.videosCount > 0 && (
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {playlist.videosCount} {t("cs.videosUnit")}
                  </span>
                )}
              </div>
            </div>
          </motion.a>
        )}
      </div>
    </section>
  );
}
