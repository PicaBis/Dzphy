import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/splash/SplashScreen";
import jsonLd from "./json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://dzphy.vercel.app"),
  title: {
    default: "منصة الأستاذ بيكا للفيزياء",
    template: "%s | منصة الأستاذ بيكا للفيزياء",
  },
  description: "منصة الأستاذ بيكا للفيزياء التعليمية الجزائرية — ملخصات، تمارين محلولة، فروض واختبارات، دورات تعليمية، وتطبيقات ذكية لطلاب الثانوي",
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
    title: "منصة الأستاذ بيكا للفيزياء",
    description: "تعلم الفيزياء بذكاء مع الأستاذ بيكا - ملخصات وتمارين وفروض لكل المستويات",
    type: "website",
    locale: "ar_DZ",
    url: "https://dzphy.vercel.app",
    siteName: "منصة الأستاذ بيكا للفيزياء",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "منصة الأستاذ بيكا للفيزياء",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة الأستاذ بيكا للفيزياء",
    description: "تعلم الفيزياء بذكاء مع الأستاذ بيكا",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <SplashScreen />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
