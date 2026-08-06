"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import type { PlaylistResponse } from "@/app/api/playlists/route";
import { tiktokVideos } from "@/data/social";

const YT = ({ s = 16, c = "" }: { s?: number; c?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s} className={c}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
);

const TK = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" /></svg>
);

export default function VideosSection() {
  const [data, setData] = useState<PlaylistResponse[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/playlists")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then((json: PlaylistResponse[]) => setData(json))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="inline-block bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-3">الفيديوهات التعليمية</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">تعلم بالفيديو <span className="text-orange-500">مجانا</span></h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
              دروس مرتبة في قوائم تشغيل حسب المستوى — تُحدَّث تلقائيًا من قناة يوتيوب.
            </p>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm shrink-0"
          >
            كل الفيديوهات <ArrowLeft size={16} />
          </Link>
        </motion.div>

        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center"><YT s={16} c="text-white" /></div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              قوائم تشغيل YouTube -{" "}
              <a href="https://www.youtube.com/@ProfPica" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">@ProfPica</a>
            </h3>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 py-16 text-gray-400 dark:text-gray-500">
              <RefreshCw size={20} className="animate-spin" /> جارٍ جلب الفيديوهات...
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <AlertCircle size={32} className="text-red-400" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">تعذّر تحميل الفيديوهات، جرّب فتح صفحة الفيديوهات مباشرة.</p>
              <Link href="/videos" className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm">
                الانتقال إلى قوائم التشغيل <ArrowLeft size={14} />
              </Link>
            </div>
          )}

          {!loading && !error && data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.slice(0, 6).map((pl, i) => (
                <motion.a
                  key={pl.id}
                  href={`/videos?level=${pl.levelKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-200 dark:hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${pl.gradient}`}>
                    <img
                      src={`https://i.ytimg.com/vi/${pl.videoId}/mqdefault.jpg`}
                      alt={pl.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-70 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Play size={24} className="text-red-600 ms-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[11px] font-black bg-black/70 text-white px-2.5 py-1 rounded-lg">
                      {pl.videos.length} فيديو
                    </span>
                    <span className={`absolute top-2 right-2 text-[10px] font-black ${pl.accent} bg-white/90 dark:bg-black/60 px-2 py-0.5 rounded-lg`}>
                      {pl.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                      {pl.title}
                    </h4>
                    {pl.videos[0] && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 line-clamp-1">{pl.videos[0].title}</p>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/videos" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg shadow-red-200 hover:shadow-red-300">
              <YT s={18} />
              استعرض قوائم التشغيل كاملة
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center"><TK /></div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              آخر فيديوهات TikTok -{" "}
              <a href="https://www.tiktok.com/@profpica" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:underline">@profpica</a>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tiktokVideos.map((v, i) => (
              <motion.a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <img src={v.thumbnail} alt={v.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 flex flex-col justify-end p-3">
                  <p className="text-white text-[11px] font-bold leading-tight line-clamp-2 drop-shadow">{v.title}</p>
                </div>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center"><TK /></div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play size={20} fill="white" className="text-white" /></div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://www.tiktok.com/@profpica" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl">
              <TK /> مشاهدة المزيد على TikTok <ArrowLeft size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
