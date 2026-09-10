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
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
              {t("cs.free")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              {t("cs.freeTitle")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl text-sm sm:text-base">
              {t("cs.freeDesc")}
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-sm border-2 border-orange-300 dark:border-orange-500/30 hover:border-orange-500 dark:hover:border-orange-500/50 px-5 py-2.5 rounded-xl transition-all hover:bg-orange-50 dark:hover:bg-orange-500/10 shrink-0"
          >
            {t("cs.all")} <DirectionArrow size={16} />
          </Link>
        </motion.div>

        {/* The single free playlist */}
        {loading && (
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 p-5 sm:p-7">
            <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-gray-700" />
            <div className="space-y-4 py-2">
              <div className="h-6 w-3/4 rounded-lg bg-gray-100 dark:bg-gray-700" />
              <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-gray-700" />
              <div className="h-4 w-2/3 rounded-lg bg-gray-100 dark:bg-gray-700" />
              <div className="h-11 w-44 rounded-xl bg-gray-100 dark:bg-gray-700" />
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
            className="group grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 p-5 sm:p-7 hover:shadow-2xl hover:border-red-300 dark:hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${playlist.videoId}/hqdefault.jpg`}
                alt={playlist.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 group-hover:scale-110 flex items-center justify-center shadow-2xl transition-all duration-300">
                  <Play size={26} className="text-white ms-0.5" fill="currentColor" />
                </span>
              </div>
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full">
                {t("common.free")}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-full mb-3">
                <YT /> YouTube
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {playlist.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                {playlist.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-red-200 dark:shadow-red-500/20 group-hover:shadow-xl">
                  <Play size={16} fill="currentColor" />
                  {t("cs.watch")}
                </span>
                {playlist.videosCount > 0 && (
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
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
