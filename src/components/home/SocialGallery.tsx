"use client";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { tiktokVideos, instagramPosts } from "@/data/social";
import { socialIconMap } from "@/components/icons/SocialIcons";

const TikTokIcon = socialIconMap.tiktok;
const InstagramIcon = socialIconMap.instagram;

export function SocialGallery() {
  const renderCard = (v: (typeof tiktokVideos)[number], i: number) => {
    const Icon = v.platform === "tiktok" ? TikTokIcon : InstagramIcon;
    return (
      <motion.a
        key={v.id}
        href={v.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        className="group block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-[9/16] sm:aspect-[3/4] bg-gray-900 overflow-hidden">
          <img
            src={v.thumbnail}
            alt={v.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
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
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white">
            <TikTokIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">أهم فيديوهات التيك توك</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">أفكار سريعة ومقاطع مختارة من @profpica</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tiktokVideos.map((v, i) => renderCard(v, i))}
        </div>
      </section>

      {/* Instagram */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 flex items-center justify-center text-white">
            <InstagramIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">أحدث منشورات إنستغرام</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">آخر ريلز ومنشورات من @prof_pica</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((v, i) => renderCard(v, i))}
        </div>
      </section>
    </>
  );
}
