"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, FileText, Bell, Send, Play } from "lucide-react";
import { tiktokVideos, instagramPosts, TIKTOK_PROFILE, INSTAGRAM_PROFILE, type SocialVideo } from "@/data/social";
import { siteConfig, socialLinks } from "@/data/site";
import { InstagramIcon, TelegramIcon, FacebookIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import { useDbContent } from "@/lib/useDbContent";
import ZoomableImage from "@/components/ui/ZoomableImage";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

const facebookOfficial =
  socialLinks.find((s) => s.platform === "facebook")?.url ||
  "https://www.facebook.com/share/191btmBHho/";

type Platform = "tiktok" | "instagram";

const platformTheme: Record<
  Platform,
  { handle: string; iconBg: string; chip: string; ring: string; btn: string }
> = {
  tiktok: {
    handle: "@profpica",
    iconBg: "bg-gradient-to-br from-gray-800 to-black",
    chip: "bg-black/70 text-white",
    ring: "ring-gray-900/10",
    btn: "bg-gray-900 hover:bg-black text-white",
  },
  instagram: {
    handle: "@prof_pica",
    iconBg: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400",
    chip: "bg-black/70 text-white",
    ring: "ring-pink-500/10",
    btn: "bg-gradient-to-l from-fuchsia-500 via-pink-500 to-orange-400 text-white",
  },
};

/** A single post card — thumbnail + direct link to the exact post. */
function PostCard({ post, index }: { post: SocialVideo; index: number }) {
  const theme = platformTheme[post.platform];
  const Icon = post.platform === "tiktok" ? TikTokIcon : InstagramIcon;

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, ease: "easeOut", duration: 0.35 }}
      className={`group relative aspect-[9/16] block rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-2xl ring-1 ${theme.ring} dark:ring-white/10 transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.97]`}
    >
      {post.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.thumbnail}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
      )}

      {/* platform badge */}
      <span className={`absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full ${theme.chip} backdrop-blur-sm`}>
        <Icon className="h-3.5 w-3.5" />
      </span>

      {/* hover play */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Play size={22} className="ms-0.5 text-gray-900" fill="currentColor" />
        </span>
      </div>

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-8">
        <p className="line-clamp-2 text-[11px] font-bold leading-snug text-white drop-shadow sm:text-xs">
          {post.title}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-white/75">
          <span dir="ltr">{theme.handle}</span>
          <span className="mx-0.5">·</span>
          <span>{post.badge}</span>
        </p>
      </div>
    </motion.a>
  );
}

export default function HomeSocial() {
  const { t } = useLanguage();
  const [platform, setPlatform] = useState<Platform>("tiktok");

  // Curated posts (local thumbnails) enriched by any DB rows for each platform.
  const { items: dbTiktok } = useDbContent("tiktok");
  const { items: dbInstagram } = useDbContent("instagram");

  const tiktokPosts = useMemo<SocialVideo[]>(() => {
    const seen = new Set(tiktokVideos.map((p) => p.url));
    const extra = dbTiktok
      .filter((r) => r.url && !seen.has(r.url))
      .map((r) => ({
        id: r.id,
        platform: "tiktok" as const,
        title: r.title,
        description: r.description ?? "",
        url: r.url as string,
        thumbnail: r.thumbnail ?? "",
        badge: r.badge ?? t("common.new"),
        gradient: "from-gray-800 to-black",
      }));
    return [...extra, ...tiktokVideos].slice(0, 6);
  }, [dbTiktok, t]);

  const igPosts = useMemo<SocialVideo[]>(() => {
    const seen = new Set(instagramPosts.map((p) => p.url));
    const extra = dbInstagram
      .filter((r) => r.url && !seen.has(r.url))
      .map((r) => ({
        id: r.id,
        platform: "instagram" as const,
        title: r.title,
        description: r.description ?? "",
        url: r.url as string,
        thumbnail: r.thumbnail ?? "",
        badge: r.badge ?? t("common.new"),
        gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
      }));
    return [...extra, ...instagramPosts].slice(0, 6);
  }, [dbInstagram, t]);

  const posts = platform === "tiktok" ? tiktokPosts : igPosts;
  const theme = platformTheme[platform];
  const profileUrl = platform === "tiktok" ? TIKTOK_PROFILE : INSTAGRAM_PROFILE;

  const tabs: { id: Platform; label: string; icon: React.ElementType }[] = [
    { id: "tiktok", label: t("hs.tiktok"), icon: TikTokIcon },
    { id: "instagram", label: t("hs.igTab"), icon: InstagramIcon },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8 sm:mb-12 text-center"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            {t("hs.postsBadge")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
            {t("hs.postsT1")} <span className="text-orange-500">{t("hs.postsT2")}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("hs.postsDesc")}
          </p>
        </motion.div>

        {/* Posts showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 p-4 sm:p-6 lg:p-8 shadow-sm"
        >
          {/* Platform switcher */}
          <div className="mb-6 flex flex-col items-center gap-4">
            <div className="relative inline-flex items-center gap-1 rounded-2xl bg-white dark:bg-gray-800 p-1.5 shadow-inner ring-1 ring-gray-100 dark:ring-gray-700">
              {tabs.map((tab) => {
                const active = platform === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPlatform(tab.id)}
                    className={`relative z-10 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition-colors sm:px-6 sm:py-2.5 ${
                      active ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="social-tab-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className={`absolute inset-0 -z-10 rounded-xl ${tab.id === "tiktok" ? "bg-gray-900 dark:bg-black" : "bg-gradient-to-l from-fuchsia-500 via-pink-500 to-orange-400"}`}
                      />
                    )}
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Profile row */}
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span dir="ltr" className="font-bold">{theme.handle}</span>
              <span>·</span>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                {t("hs.visitProfile")}
              </a>
            </div>
          </div>

          {/* Posts grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, x: platform === "tiktok" ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: platform === "tiktok" ? 24 : -24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
            >
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Per-platform CTA */}
          <div className="mt-7 text-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${theme.btn}`}
            >
              {platform === "tiktok" ? <TikTokIcon className="h-4 w-4" /> : <InstagramIcon className="h-4 w-4" />}
              {t("hs.watch")} {t("hs.visitProfile")}
              <DirectionArrow size={15} />
            </a>
          </div>
        </motion.div>

        {/* Telegram + Facebook */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10">
          {/* Telegram — the teacher's file bag */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-500/20 bg-gradient-to-br from-sky-50 to-white dark:from-sky-500/10 dark:to-gray-900 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white">
                <TelegramIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg">{t("hs.telegram")}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{t("hs.telegramSub")}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <ZoomableImage
                src="/about/telegram.png"
                alt={t("telegram.tagline")}
                width={480}
                height={480}
                sizes="(max-width: 640px) 180px, 200px"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-4 ring-sky-100 dark:ring-sky-500/20 shadow-lg flex-shrink-0"
                imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="flex-1 text-center sm:text-right">
                <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2 justify-center sm:justify-start"><FileText size={15} className="text-sky-500" /> {t("hs.tg1")}</li>
                  <li className="flex items-center gap-2 justify-center sm:justify-start"><FileText size={15} className="text-sky-500" /> {t("hs.tg2")}</li>
                  <li className="flex items-center gap-2 justify-center sm:justify-start"><Bell size={15} className="text-sky-500" /> {t("hs.tg3")}</li>
                </ul>
                <a
                  href={siteConfig.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md"
                >
                  <Send size={16} /> {t("hs.tgCta")}
                </a>
              </div>
            </div>
          </div>

          {/* Facebook — official + personal */}
          <div className="rounded-3xl border border-blue-100 dark:border-blue-500/20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-500/10 dark:to-gray-900 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg">{t("hs.facebook")}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{t("hs.facebookSub")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <a
                href={facebookOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-black text-gray-900 dark:text-white text-sm mb-0.5">{t("hs.fbOfficial")}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t("hs.fbOfficialSub")}</p>
                </div>
                <ExternalLink size={17} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </a>
              <a
                href={siteConfig.facebookPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-black text-gray-900 dark:text-white text-sm mb-0.5">{t("hs.fbPersonal")}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t("hs.fbPersonalSub")}</p>
                </div>
                <ExternalLink size={17} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </a>
              <Link
                href="/follow"
                className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 hover:opacity-80 font-bold text-sm pt-1"
              >
                {t("hs.all")} <DirectionArrow size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
