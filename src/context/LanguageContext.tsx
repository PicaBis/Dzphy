"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "ar" | "fr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  ar: {
    home: "الرئيسية",
    grade1: "السنة الأولى ثانوي",
    grade2: "السنة الثانية ثانوي",
    grade3: "السنة الثالثة ثانوي",
    teacherBag: "حقيبة الأستاذ",
    courses: "الدورات التعليمية",
    apps: "التطبيقات والبرامج",
    about: "من نحن؟",
    follow: "تابعونا",
    admin: "لوحة التحكم",
    search: "ابحث...",
    heroTitle: "منصة الفيزياء الجزائرية التي تجمع كل ما يحتاجه الطالب في مكان واحد",
    heroDesc: "ملخصات، تمارين محلولة، فروض واختبارات، دورات تعليمية، تطبيقات ذكية، وآخر الفيديوهات التعليمية",
    startLearning: "ابدأ التعلم",
    exploreCourses: "استكشف الدورات",
    scientificStreams: "الشعب العلمية",
    literaryStreams: "الشعب الأدبية",
    sciExp: "علوم تجريبية",
    mathTech: "تقني رياضي",
    math: "رياضيات",
    selectStream: "اختر الشعبة للوصول للمحتوى المخصص",
    summaries: "الملخصات",
    exercises: "التمارين والحلول",
    devoirs: "الفروض والاختبارات",
    tp: "الأعمال التطبيقية",
    videos: "الفيديوهات التعليمية",
    latestContent: "أحدث الإضافات",
    whyDzPhy: "لماذا DzPhy؟",
    discoverApps: "اكتشف أدوات DzPhy الذكية",
    educationalVideos: "الفيديوهات التعليمية",
    watchMore: "مشاهدة المزيد",
    contactUs: "تواصل معنا",
    sendMessage: "أرسل رسالة",
    quickLinks: "روابط سريعة",
    rights: "© DzPhy – جميع الحقوق محفوظة",
    madeWithLove: "صُمِّم بـ ❤️ للطالب الجزائري",
  },
  fr: {
    home: "Accueil",
    grade1: "1ère Année Secondaire",
    grade2: "2ème Année Secondaire",
    grade3: "3ème Année Secondaire",
    teacherBag: "Sac de l'Enseignant",
    courses: "Cours",
    apps: "Applications",
    about: "À Propos",
    follow: "Suivez-Nous",
    admin: "Tableau de Bord",
    search: "Rechercher...",
    heroTitle: "La plateforme algérienne de physique qui rassemble tout ce dont l'étudiant a besoin",
    heroDesc: "Résumés, exercices corrigés, examens, cours, applications intelligentes et dernières vidéos éducatives",
    startLearning: "Commencer",
    exploreCourses: "Explorer les Cours",
    scientificStreams: "Filières Scientifiques",
    literaryStreams: "Filières Littéraires",
    sciExp: "Sciences Exp",
    mathTech: "Tech Math",
    math: "Mathématiques",
    selectStream: "Choisissez votre filière pour accéder au contenu",
    summaries: "Résumés",
    exercises: "Exercices & Solutions",
    devoirs: "Examens & Devoirs",
    tp: "Travaux Pratiques",
    videos: "Vidéos Éducatives",
    latestContent: "Derniers Ajouts",
    whyDzPhy: "Pourquoi DzPhy ?",
    discoverApps: "Découvrez les Outils DzPhy",
    educationalVideos: "Vidéos Éducatives",
    watchMore: "Voir Plus",
    contactUs: "Contactez-Nous",
    sendMessage: "Envoyer un Message",
    quickLinks: "Liens Rapides",
    rights: "© DzPhy – Tous Droits Réservés",
    madeWithLove: "Conçu avec ❤️ pour l'étudiant algérien",
  },
  en: {
    home: "Home",
    grade1: "1st Year Secondary",
    grade2: "2nd Year Secondary",
    grade3: "3rd Year Secondary",
    teacherBag: "Teacher's Bag",
    courses: "Courses",
    apps: "Apps & Tools",
    about: "About Us",
    follow: "Follow Us",
    admin: "Dashboard",
    search: "Search...",
    heroTitle: "The Algerian Physics Platform That Brings Everything a Student Needs in One Place",
    heroDesc: "Summaries, solved exercises, exams, courses, smart apps, and the latest educational videos",
    startLearning: "Start Learning",
    exploreCourses: "Explore Courses",
    scientificStreams: "Scientific Streams",
    literaryStreams: "Literary Streams",
    sciExp: "Experimental Sciences",
    mathTech: "Technical Math",
    math: "Mathematics",
    selectStream: "Choose your stream to access dedicated content",
    summaries: "Summaries",
    exercises: "Exercises & Solutions",
    devoirs: "Exams & Tests",
    tp: "Practical Work",
    videos: "Educational Videos",
    latestContent: "Latest Additions",
    whyDzPhy: "Why DzPhy?",
    discoverApps: "Discover DzPhy Tools",
    educationalVideos: "Educational Videos",
    watchMore: "Watch More",
    contactUs: "Contact Us",
    sendMessage: "Send Message",
    quickLinks: "Quick Links",
    rights: "© DzPhy – All Rights Reserved",
    madeWithLove: "Made with ❤️ for the Algerian Student",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ar";
    const stored = localStorage.getItem("dzphy-lang") as Lang | null;
    return stored || "ar";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("dzphy-lang", l);
    document.documentElement.lang = l === "ar" ? "ar" : l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  const t = (key: string) => translations[lang]?.[key] || translations.ar[key] || key;

  if (!mounted) return <>{children}</>;

  return <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
