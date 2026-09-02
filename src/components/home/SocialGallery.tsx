"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { tiktokVideos, instagramPosts, type SocialVideo } from "@/data/social";
import type { TikTokEnriched } from "@/lib/tiktok";
import { socialIconMap } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/context/LanguageContext";

const TikTokIcon = socialIconMap.tiktok;
const InstagramIcon = socialIconMap.instagram;

type Card = SocialVideo & { localThumb?: string };

export function SocialGallery() {
  const { t } = useLanguage();
  // Start with the curated list; enrich TikTok cards live from oEmbed so covers
  // are real and every link is verified to open the exact original video.
  const [tiktok, setTiktok] = useState<Card[]>(tiktokVideos);

  useEffect(() => {
    let alive = true;
    fetch("/api/tiktok")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((rows: TikTokEnriched[]) => {
        if (!alive || !Array.isArray(rows) || rows.length === 0) return;
        const base = new Map(tiktokVideos.map((v) => [v.id, v]));
        // Show only videos oEmbed could verify → every card opens a real video.
        const next = rows
          .filter((r) => r.verified)
          .map((r) => {
            const b = base.get(r.id);
            return {
              ...(b ?? ({} as Card)),
              id: r.id,
              platform: "tiktok" as const,
              url: r.url,
              title: r.title,
              thumbnail: r.thumbnail || b?.thumbnail || "",
              localThumb: r.localThumb || b?.thumbnail,
            } as Card;
          });
        if (next.length > 0) setTiktok(next);
      })
      .catch(() => {
        /* keep curated fallback */
      });
    return () => {
      alive = false;
    };
  }, []);

  const renderCard = (v: Card, i: number) => {
    const Icon = v.platform === "tiktok" ? TikTokIcon : InstagramIcon;
    return (
      <motion.a
        href={v.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05, ease: "easeOut" }}
        className="group block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
      >
        <div className="relative aspect-[9/16] sm:aspect-[3/4] bg-gray-900 overflow-hidden">
          <img
            src={v.thumbnail}
            alt={v.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const fb = v.localThumb;
              if (fb && e.currentTarget.src !== fb) e.currentTarget.src = fb;
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play size={22} className="text-gray-900 ms-0.5" fill="currentColor" />
            </div>
          </div>
          <span className={`absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] font-black text-white px-2.5 py-1 rounded-lg bg-gradient-to-br ${v.gradient} shadow`}>
            <Icon className="w-3.5 h-3.5" />
            {v.badge}
          </span>
        </div>
        <div className="p-3.5">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
            {v.title}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 line-clamp-2">{v.description}</p>
          <div className="flex items-center gap-1.5 mt-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors">
            <ExternalLink size={11} />
            <span dir="ltr">{v.platform === "tiktok" ? "@profpica" : "@prof_pica"}</span>
          </div>
        </div>
      </motion.a>
    );
  };

  return (
    <>
      {/* TikTok */}
      <section className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white">
            <TikTokIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{t("sg.tiktokTitle")}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{t("sg.tiktokSub")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {tiktok.map((v, i) => renderCard(v, i))}
        </div>
      </section>

      {/* Instagram */}
      <section className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 flex items-center justify-center text-white">
            <InstagramIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{t("sg.igTitle")}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{t("sg.igSub")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((v, i) => renderCard(v, i))}
        </div>
      </section>
    </>
  );
}
