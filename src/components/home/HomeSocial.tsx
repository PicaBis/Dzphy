"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, Bell, Send } from "lucide-react";
import { instagramPosts, type SocialVideo } from "@/data/social";
import { siteConfig, socialLinks } from "@/data/site";
import { InstagramIcon, TelegramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { useDbContent } from "@/lib/useDbContent";
import ZoomableImage from "@/components/ui/ZoomableImage";

const facebookOfficial =
  socialLinks.find((s) => s.platform === "facebook")?.url ||
  "https://www.facebook.com/share/191btmBHho/";

export default function HomeSocial() {
  // Instagram: curated posts, enriched/extended by any DB rows (newest first).
  const { items: dbInstagram } = useDbContent("instagram");
  const instagram = useMemo<SocialVideo[]>(() => {
    const seen = new Set(instagramPosts.map((p) => p.url));
    const extra: SocialVideo[] = dbInstagram
      .filter((r) => r.url && !seen.has(r.url))
      .map((r) => ({
        id: r.id,
        platform: "instagram",
        title: r.title,
        description: r.description ?? "",
        url: r.url as string,
        thumbnail: r.thumbnail ?? "",
        badge: r.badge ?? "جديد",
        gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
      }));
    return [...extra, ...instagramPosts].slice(0, 6);
  }, [dbInstagram]);

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            المنصات التعليمية
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
            الصور، الملفات <span className="text-orange-500">والمستجدات</span>
          </h2>
        </motion.div>

        {/* Instagram */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 flex items-center justify-center text-white">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg">إنستغرام — صور وملخصات</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">قوانين ومفاهيم بصرية سريعة من @prof_pica</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/prof_pica/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-pink-600 dark:text-pink-400 hover:opacity-80 font-bold text-sm shrink-0"
            >
              متابعة <ArrowLeft size={15} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {instagram.map((v, i) => (
              <motion.a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.05, ease: "easeOut" }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {v.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail} alt={v.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-3">
                  <p className="text-white text-[11px] font-bold leading-tight line-clamp-2 drop-shadow">{v.title}</p>
                </div>
                <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Telegram + Facebook */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Telegram — the teacher's file bag */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-500/20 bg-gradient-to-br from-sky-50 to-white dark:from-sky-500/10 dark:to-gray-900 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white">
                <TelegramIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg">تلغرام — حقيبة الملفات</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">PDF، سلاسل تمارين، ملخصات ومواضيع</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <ZoomableImage
                src="/about/telegram.png"
                alt="قناة التلغرام - الأستاذ بيكا"
                width={480}
                height={480}
                sizes="(max-width: 640px) 180px, 200px"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-4 ring-sky-100 dark:ring-sky-500/20 shadow-lg flex-shrink-0"
                imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="flex-1 text-center sm:text-right">
                <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2 justify-center sm:justify-start"><FileText size={15} className="text-sky-500" /> ملفات PDF جاهزة للتحميل</li>
                  <li className="flex items-center gap-2 justify-center sm:justify-start"><FileText size={15} className="text-sky-500" /> سلاسل تمارين ومواضيع</li>
                  <li className="flex items-center gap-2 justify-center sm:justify-start"><Bell size={15} className="text-sky-500" /> إعلانات وتحديثات مهمة</li>
                </ul>
                <a
                  href={siteConfig.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md"
                >
                  <Send size={16} /> انضم إلى قنوات التلغرام
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
                <h3 className="font-black text-gray-900 dark:text-white text-lg">فيسبوك — المستجدات الرسمية</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">أخبار وزارية، تنبيهات وملخصات شاملة</p>
              </div>
            </div>
            <div className="space-y-3">
              <a
                href={facebookOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-black text-gray-900 dark:text-white text-sm mb-0.5">الصفحة الرسمية</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">المنشورات والمستجدات اليومية والملخصات</p>
                </div>
                <ExternalLink size={17} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </a>
              <a
                href={siteConfig.facebookPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-black text-gray-900 dark:text-white text-sm mb-0.5">حساب الأستاذ الشخصي</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">تواصل مباشر وتفاعل مع الأستاذ بيكا</p>
                </div>
                <ExternalLink size={17} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </a>
              <Link
                href="/follow"
                className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 hover:opacity-80 font-bold text-sm pt-1"
              >
                كل المنصات والمجتمعات <ArrowLeft size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
