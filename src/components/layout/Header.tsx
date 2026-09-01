"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, BookOpen, FileText, ClipboardList, FlaskConical, Video, Sun, Moon, Globe, CalendarRange } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage, Lang } from "@/context/LanguageContext";

const gradeDropdown = [
  { label: "التوزيعات السنوية", icon: CalendarRange, href: "/distributions?level={level}" },
  { label: "الملخصات", icon: BookOpen, href: "/grade/{grade}/resumes" },
  { label: "التمارين والحلول", icon: FileText, href: "/grade/{grade}/exercises" },
  { label: "الفروض والاختبارات", icon: ClipboardList, href: "/grade/{grade}/devoirs" },
  { label: "الأعمال التطبيقية", icon: FlaskConical, href: "/grade/{grade}/tp" },
  { label: "الفيديوهات التعليمية", icon: Video, href: "/videos?level={videoLevel}" },
];

const gradeLevelLabels: Record<string, string> = {
  "1": "السنة الأولى ثانوي",
  "2": "السنة الثانية ثانوي",
  "3": "السنة الثالثة ثانوي",
  "4": "شهادة التعليم المتوسط (BEM)",
};

const gradeVideoLevels: Record<string, string> = {
  "1": "1as",
  "2": "2as",
  "3": "3as",
  "4": "bem",
};

const buildHref = (template: string, grade: string) =>
  template
    .replace("{grade}", grade)
    .replace("{level}", encodeURIComponent(gradeLevelLabels[grade] || ""))
    .replace("{videoLevel}", gradeVideoLevels[grade] || "");

// key → translation key in LanguageContext (UI chrome only; content stays Arabic)
const navItems: { key: string; href: string; grade?: string }[] = [
  { key: "home", href: "/" },
  { key: "g1", href: "/grade/1", grade: "1" },
  { key: "g2", href: "/grade/2", grade: "2" },
  { key: "g3", href: "/grade/3", grade: "3" },
  { key: "g4", href: "/grade/4", grade: "4" },
  { key: "distributions", href: "/distributions" },
  { key: "videosNav", href: "/videos" },
  { key: "teacherBag", href: "/teacher" },
  { key: "courses", href: "/courses" },
  { key: "apps", href: "/apps" },
  { key: "about", href: "/about" },
  { key: "follow", href: "/follow" },
];

const flagMap: Record<Lang, string> = { ar: "🇩🇿", fr: "🇫🇷", en: "🇬🇧" };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800"
          : "bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="DzPhy Logo" width={40} height={40} sizes="40px" className="object-contain" />
            </div>
            <span className="text-xl font-black">
              <span style={{ color: "#FF7A00" }}>Dz</span>
              <span className="text-gray-900 dark:text-white">Phy</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.grade && setActiveDropdown(item.grade)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                  {item.grade ? (
                    <>
                      <button className="flex items-center gap-1 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200 whitespace-nowrap">
                        {t(item.key)}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.grade ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.grade && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full right-0 mt-1 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                          >
                          <div className="p-2">
                            {gradeDropdown.map((sub) => {
                              const Icon = sub.icon;
                              const href = buildHref(sub.href, item.grade!);
                              return (
                                <Link
                                  key={sub.label}
                                  href={href}
                                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl transition-all duration-150 group"
                                >
                                  <span className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                    <Icon size={15} className="text-orange-500" />
                                  </span>
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                 ) : (
                  <Link
                    href={item.href}
                    className="px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200 whitespace-nowrap"
                  >
                    {t(item.key)}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
              title={theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all flex items-center gap-1 text-sm"
              >
                <Globe size={19} />
                <span className="hidden sm:inline">{flagMap[lang]}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 min-w-[100px]"
                  >
                    {(["ar", "fr", "en"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap ${lang === l ? "text-orange-500 font-bold bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {flagMap[l]} {l === "ar" ? "العربية" : l === "fr" ? "Français" : "English"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
            >
              <Search size={20} />
            </button>

            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-orange-200 dark:hover:shadow-orange-500/20 hover:shadow-md"
            >
              {t("admin")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-3"
            >
              <form onSubmit={submitSearch} className="relative">
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن ملخصات، تمارين، دروس..."
                  className="w-full pr-10 sm:pr-12 pl-3 sm:pl-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all dark:text-white dark:placeholder-gray-500"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl font-medium transition-all"
                  >
                    {t(item.key)}
                  </Link>
                  {item.grade && (
                    <div className="mr-3 sm:mr-4 mt-1 space-y-1">
                      {gradeDropdown.map((sub) => {
                        const href = buildHref(sub.href, item.grade!);
                        return (
                          <Link
                            key={sub.label}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all"
                          >
                            - {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
