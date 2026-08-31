import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "DzPhy - منصة الفيزياء الجزائرية",
  description: "منصة DzPhy التعليمية الجزائرية للفيزياء - ملخصات، تمارين محلولة، فروض واختبارات، دورات تعليمية، وتطبيقات ذكية لطلاب الثانوي",
  keywords: "فيزياء, جزائر, ثانوي, ملخصات, تمارين, دروس, DzPhy",
  authors: [{ name: "Medjahed Abdelhadi" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "DzPhy - منصة الفيزياء الجزائرية",
    description: "تعلم الفيزياء بذكاء مع DzPhy",
    type: "website",
    locale: "ar_DZ",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "DzPhy" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
