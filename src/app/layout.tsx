import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LANG_COOKIE, LANG_OPTIONS, dirForLang, type Lang } from "@/context/i18n";
import { SoundProvider } from "@/context/SoundContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/splash/SplashScreen";
import MotionProvider from "@/components/providers/MotionProvider";
import TipsOverlay from "@/components/ui/TipsOverlay";
import ReadingProgressBar from "@/components/ui/ReadingProgressBar";
import BackToTop from "@/components/ui/BackToTop";
import KeyboardShortcuts from "@/components/ui/KeyboardShortcuts";
import { FocusModeProvider, FocusModeToggle } from "@/components/ui/FocusMode";
import QuickActions from "@/components/ui/QuickActions";
import { ToastProvider } from "@/components/ui/Toast";
import { BookmarksProvider } from "@/components/ui/Bookmarks";
import ServiceWorkerRegistration from "@/components/providers/ServiceWorkerRegistration";
import NotificationPrompt from "@/components/ui/NotificationPrompt";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import jsonLd from "./json-ld";

const meta = {
  ar: {
    title: "منصة الأستاذ بيكا للفيزياء",
    description:
      "منصة الأستاذ بيكا للفيزياء التعليمية الجزائرية — ملخصات، تمارين محلولة، فروض واختبارات، دورات تعليمية، وتطبيقات ذكية لطلاب الثانوي",
    og: "تعلم الفيزياء بذكاء مع الأستاذ بيكا - ملخصات وتمارين وفروض لكل المستويات",
    ogTwitter: "تعلم الفيزياء بذكاء مع الأستاذ بيكا",
    ogLocale: "ar_DZ",
    template: "%s | منصة الأستاذ بيكا للفيزياء",
  },
  fr: {
    title: "Plateforme de l'enseignant Pica pour la physique",
    description:
      "La plateforme éducative algérienne de physique — résumés, exercices corrigés, devoirs et examens, cours et applications intelligentes pour les élèves du secondaire",
    og: "Apprends la physique intelligemment avec l'enseignant Pica — résumés, exercices et devoirs pour tous les niveaux",
    ogTwitter: "Apprends la physique intelligemment avec l'enseignant Pica",
    ogLocale: "fr_FR",
    template: "%s | Plateforme de l'enseignant Pica pour la physique",
  },
  en: {
    title: "Prof. Pica's Physics Platform",
    description:
      "Prof. Pica's Algerian educational physics platform — summaries, solved exercises, exams, courses and smart apps for secondary students",
    og: "Learn physics smartly with Prof. Pica — summaries, exercises and exams for every level",
    ogTwitter: "Learn physics smartly with Prof. Pica",
    ogLocale: "en_US",
    template: "%s | Prof. Pica's Physics Platform",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const store = await cookies();
  const cookieLang = store.get(LANG_COOKIE)?.value;
  const lang: Lang = cookieLang && LANG_OPTIONS.includes(cookieLang as Lang) ? (cookieLang as Lang) : "ar";
  const m = meta[lang];

  return {
    metadataBase: new URL("https://dzphy.vercel.app"),
    title: {
      default: m.title,
      template: m.template,
    },
    description: m.description,
    keywords: ["فيزياء", "جزائر", "ثانوي", "ملخصات", "تمارين", "دروس", "الأستاذ بيكا", "Medjahed Abdelhadi", "بيكا"],
    authors: [{ name: "Medjahed Abdelhadi", url: "https://github.com/PicaBis" }],
    creator: "Medjahed Abdelhadi",
    publisher: "Medjahed Abdelhadi",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: m.title,
      description: m.og,
      type: "website",
      locale: m.ogLocale,
      url: "https://dzphy.vercel.app",
      siteName: m.title,
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: m.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.ogTwitter,
      images: ["/logo.png"],
    },
    icons: {
      icon: [
        { url: "/logo.png", sizes: "32x32", type: "image/png" },
        { url: "/logo.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
      shortcut: [{ url: "/logo.png" }],
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const cookieLang = store.get(LANG_COOKIE)?.value;
  const lang: Lang = cookieLang && LANG_OPTIONS.includes(cookieLang as Lang) ? (cookieLang as Lang) : "ar";

  return (
    <html lang={lang} dir={dirForLang(lang)}>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ErrorBoundary>
          <ThemeProvider>
            <LanguageProvider initialLang={lang}>
              <SoundProvider>
                <FocusModeProvider>
                  <ToastProvider>
                    <BookmarksProvider>
                      <MotionProvider>
                        <ReadingProgressBar />
                        <SplashScreen />
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <TipsOverlay />
                        <BackToTop />
                        <FocusModeToggle />
                        <QuickActions />
                        <KeyboardShortcuts />
                        <NotificationPrompt />
                        <ServiceWorkerRegistration />
                      </MotionProvider>
                    </BookmarksProvider>
                  </ToastProvider>
                </FocusModeProvider>
              </SoundProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}