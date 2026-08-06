// ============================================================================
// DzPhy — Annual distributions (التوزيعات السنوية)
// Structured resource records used by the /distributions page.
// Each record follows the schema: id, title, level, stream, category,
// fileUrl (direct PDF), date (+ optional description / sizeMB).
// PDFs live in /public/files/distributions and are served from /files/...
// ============================================================================

export type DistributionLevel =
  | "السنة الأولى ثانوي"
  | "السنة الثانية ثانوي"
  | "السنة الثالثة ثانوي"
  | "الرابعة متوسط";

export type DistributionCategory =
  | "التوزيعات السنوية"
  | "ملخصات"
  | "فروض واختبارات"
  | "تمارين";

export interface DistributionResource {
  id: string;
  title: string;
  level: DistributionLevel;
  stream: string; // الشعبة (علوم وآداب, علوم تجريبية, تقني رياضي, رياضيات, عام...)
  category: DistributionCategory;
  fileUrl: string | null; // direct PDF link, or null for "قريبًا"
  date: string; // ISO date
  description?: string;
  sizeMB?: number;
}

// Filter option lists (drive the UI chips)
export const levels: DistributionLevel[] = [
  "السنة الأولى ثانوي",
  "السنة الثانية ثانوي",
  "السنة الثالثة ثانوي",
  "الرابعة متوسط",
];

export const streams: string[] = [
  "علوم وآداب",
  "علوم تجريبية",
  "تقني رياضي",
  "رياضيات",
  "آداب وفلسفة",
  "عام",
];

export const categories: DistributionCategory[] = [
  "التوزيعات السنوية",
  "ملخصات",
  "فروض واختبارات",
  "تمارين",
];

const SECONDARY_PDF = "/files/distributions/tawziaat-thanawi-adab-oloum.pdf";
const BEM_PDF = "/files/distributions/tawziaat-4am-bem.pdf";
const PDF_1AS = "/files/distributions/tawziaat-1as-adab-oloum.pdf";
const PDF_2AS = "/files/distributions/tawziaat-2as-adab-oloum.pdf";
const PDF_3AS = "/files/distributions/tawziaat-3as-adab-oloum.pdf";

export const distributions: DistributionResource[] = [
  {
    id: "dist-1as-2026",
    title: "التوزيع السنوي — السنة الأولى ثانوي (آداب وعلوم)",
    level: "السنة الأولى ثانوي",
    stream: "علوم وآداب",
    category: "التوزيعات السنوية",
    fileUrl: PDF_1AS,
    date: "2026-08-06",
    description:
      "التوزيع السنوي الرسمي لمادة العلوم الفيزيائية للسنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا + جذع مشترك آداب.",
    sizeMB: 0.6,
  },
  {
    id: "dist-2as-2026",
    title: "التوزيع السنوي — السنة الثانية ثانوي (علوم وآداب)",
    level: "السنة الثانية ثانوي",
    stream: "علوم وآداب",
    category: "التوزيعات السنوية",
    fileUrl: PDF_2AS,
    date: "2026-08-06",
    description:
      "التوزيع السنوي الرسمي لمادة العلوم الفيزيائية للسنة الثانية ثانوي — علوم تجريبية + تقني رياضي + آداب وفلسفة.",
    sizeMB: 0.9,
  },
  {
    id: "dist-3as-2026",
    title: "التوزيع السنوي — السنة الثالثة ثانوي (علوم وآداب)",
    level: "السنة الثالثة ثانوي",
    stream: "علوم وآداب",
    category: "التوزيعات السنوية",
    fileUrl: PDF_3AS,
    date: "2026-08-06",
    description:
      "التوزيع السنوي الرسمي لمادة العلوم الفيزيائية للسنة الثالثة ثانوي — علوم تجريبية + تقني رياضي.",
    sizeMB: 0.6,
  },
  {
    id: "dist-4am-bem-2026",
    title: "التوزيع السنوي — الرابعة متوسط (BEM)",
    level: "الرابعة متوسط",
    stream: "عام",
    category: "التوزيعات السنوية",
    fileUrl: BEM_PDF,
    date: "2026-08-06",
    description:
      "التوزيع السنوي الرسمي لمادة العلوم الفيزيائية والتكنولوجيا للسنة الرابعة متوسط — تحضيرًا لشهادة التعليم المتوسط (BEM).",
    sizeMB: 0.4,
  },
  {
    id: "dist-full-2026",
    title: "الملف الشامل — التوزيعات السنوية للطور الثانوي كاملًا",
    level: "السنة الثالثة ثانوي",
    stream: "عام",
    category: "التوزيعات السنوية",
    fileUrl: SECONDARY_PDF,
    date: "2026-08-06",
    description:
      "الحزمة الكاملة للتوزيعات السنوية لمادة العلوم الفيزيائية للطور الثانوي من الأولى إلى الثالثة ثانوي (علوم وآداب) في ملف واحد.",
    sizeMB: 1.9,
  },
];
