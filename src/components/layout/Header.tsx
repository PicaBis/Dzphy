"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  GraduationCap,
  CalendarRange,
  Briefcase,
  BookOpen,
  Boxes,
  Users,
  Sun,
  Moon,
  Globe,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage, LANG_NAMES, Lang } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

// ---------------------------------------------------------------------------
// Navigation model — grouped so the top bar stays uncluttered (no overlap).
//   الرئيسية · السنوات الدراسية ▾ · الفيديوهات · الموارد ▾ · المنصات · من نحن
// ---------------------------------------------------------------------------
type NavItem =
  | { kind: "link"; key: string; href: string }
  | {
      kind: "group";
      key: string;
      children: { key: string; href: string; icon: typeof BookOpen }[];
    };

const yearChildren = [
  { key: "grade1", href: "/grade/1", icon: GraduationCap },
  { key: "grade2", href: "/grade/2", icon: GraduationCap },
  { key: "grade3", href: "/grade/3", icon: GraduationCap },
  { key: "grade4", href: "/grade/4", icon: GraduationCap },
];

const resourceChildren = [
  { key: "distributions", href: "/distributions", icon: CalendarRange },
  { key: "teacherBag", href: "/teacher", icon: Briefcase },
  { key: "courses", href: "/courses", icon: BookOpen },
  { key: "apps", href: "/apps", icon: Boxes },
];

const navItems: NavItem[] = [
  { kind: "link", key: "home", href: "/" },
  { kind: "group", key: "years", children: yearChildren },
  { kind: "link", key: "videosNav", href: "/videos" },
  { kind: "group", key: "resources", children: resourceChildren },
  { kind: "link", key: "follow", href: "/follow" },
  { kind: "link", key: "about", href: "/about" },
];

type NavChild = { key: string; href: string; icon: typeof BookOpen };

const flagMap: Record<Lang, string> = { ar: "🇩🇿", fr: "🇫🇷", en: "🇬🇧" };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { enabled: soundOn, toggle: toggleSound, play } = useSound();
  const router = useRouter();
  const pathname = usePathname();

  const label = (key: string) =>
    key === "years" ? t("nav.years") : key === "resources" ? t("nav.resources") : t(key);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const groupActive = (children: { href: string }[]) =>
    children.some((c) => isActive(c.href));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    play("nav");
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change so nothing lingers over a new page.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    setLangOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Accessibility: Escape closes any open menu/dropdown/search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenGroup(null);
      setLangOpen(false);
      setSearchOpen(false);
      setMobileOpen(false);
      setMobileGroup(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      data-sound-managed
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800"
          : "bg-white/85 dark:bg-gray-950/85 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 h-16">
          {/* ---------- Right (RTL start): brand ---------- */}
          <Link
            href="/"
            onClick={() => play("nav")}
            className="flex items-center gap-2 flex-shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10">
              <Image src="/logo.png" alt={t("splash.logoTitle")} width={40} height={40} sizes="40px" className="object-contain" priority />
            </div>
            <span className="text-lg sm:text-xl font-black leading-none" style={{ color: "#FF7A00" }}>
              بيكا
            </span>
          </Link>

          {/* ---------- Center: grouped navigation ---------- */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0">
            {navItems.map((item) =>
              item.kind === "link" ? (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => play("nav")}
                  className={`px-3 py-2 text-[13px] font-semibold rounded-lg whitespace-nowrap transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                  }`}
                >
                  {label(item.key)}
                </Link>
              ) : (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => {
                    if (openGroup !== item.key) play("hover");
                    setOpenGroup(item.key);
                  }}
                  onMouseLeave={() => setOpenGroup((g) => (g === item.key ? null : g))}
                >
                  <button
                    onClick={() => {
                      play("open");
                      setOpenGroup((g) => (g === item.key ? null : item.key));
                    }}
                    aria-expanded={openGroup === item.key}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-lg whitespace-nowrap transition-colors duration-200 ${
                      groupActive(item.children) || openGroup === item.key
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                    }`}
                  >
                    {label(item.key)}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${openGroup === item.key ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openGroup === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 p-2"
                      >
                        {item.children.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => play("click")}
                              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors duration-150 group ${
                                isActive(sub.href)
                                  ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400"
                              }`}
                            >
                              <span className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                <Icon size={15} className="text-orange-500" />
                              </span>
                              {t(sub.key)}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>

          {/* ---------- Left (RTL end): actions ---------- */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 ms-auto lg:ms-0">
            <button
              onClick={() => { play("click"); setSearchOpen((s) => !s); }}
              aria-label={t("nav.searchAria")}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
            >
              <Search size={19} />
            </button>

            {/* Sound on/off */}
            <button
              onClick={toggleSound}
              aria-label={soundOn ? t("nav.soundOn") : t("nav.soundOff")}
              title={soundOn ? t("nav.soundEnabled") : t("nav.soundMuted")}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
            >
              {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => { play("toggle"); toggleTheme(); }}
              aria-label={theme === "dark" ? t("nav.themeDay") : t("nav.themeNight")}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Language */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => { play("open"); setLangOpen((o) => !o); }}
                aria-label={t("nav.changeLang")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all flex items-center gap-1 text-sm"
              >
                <Globe size={19} />
                <span>{flagMap[lang]}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 min-w-[120px]"
                  >
                    {(["ar", "fr", "en"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { play("click"); setLang(l); setLangOpen(false); }}
                        className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap ${lang === l ? "text-orange-500 font-bold bg-orange-50 dark:bg-orange-500/10" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {flagMap[l]} {LANG_NAMES[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary CTA — تابعونا */}
            <Link
              href="/follow"
              onClick={() => play("nav")}
              className="hidden md:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-500/20"
            >
              <Users size={15} /> {t("follow")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => { play(mobileOpen ? "close" : "open"); setMobileOpen((o) => !o); }}
              aria-label={t("nav.menu")}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
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
                  placeholder={t("nav.searchPh")}
                  className="w-full pr-10 sm:pr-12 pl-3 sm:pl-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all dark:text-white dark:placeholder-gray-500"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Mobile menu ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[72vh] overflow-y-auto">
              {navItems.map((item) =>
                item.kind === "link" ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => { play("nav"); setMobileOpen(false); }}
                    className={`block px-4 py-3 text-sm rounded-xl font-semibold transition-all ${
                      isActive(item.href)
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                    }`}
                  >
                    {label(item.key)}
                  </Link>
                ) : (
                  <div key={item.key}>
                    <button
                      onClick={() => { play("open"); setMobileGroup((g) => (g === item.key ? null : item.key)); }}
                      aria-expanded={mobileGroup === item.key}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all"
                    >
                      {label(item.key)}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${mobileGroup === item.key ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileGroup === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mr-3 mt-1 space-y-1 border-r-2 border-orange-100 dark:border-orange-500/20 pr-2"
                        >
                          {item.children.map((sub) => {
                            const Icon = sub.icon;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => { play("click"); setMobileOpen(false); }}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all"
                              >
                                <Icon size={15} className="text-orange-400 flex-shrink-0" />
{t(sub.key)}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}

              {/* Mobile actions row */}
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
                {(["ar", "fr", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { play("click"); setLang(l); }}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${lang === l ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  >
                    {flagMap[l]}
                  </button>
                ))}
                <Link
                  href="/follow"
                  onClick={() => { play("nav"); setMobileOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  <Users size={15} /> {t("follow")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
