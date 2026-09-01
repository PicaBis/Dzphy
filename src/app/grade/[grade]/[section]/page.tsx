import { notFound, redirect } from "next/navigation";
import ContentPage from "@/components/ui/ContentPage";
import { gradeContent } from "@/data/content";

const gradeVideoLevels: Record<string, string> = {
  "1": "1as",
  "2": "2as",
  "3": "3as",
};

const gradeLabels: Record<string, string> = {
  "1": "السنة الأولى ثانوي",
  "2": "السنة الثانية ثانوي",
  "3": "السنة الثالثة ثانوي",
};

const sectionConfig: Record<string, { label: string; dataKey: string; description: string }> = {
  resumes: {
    label: "الملخصات",
    dataKey: "resumes",
    description: "ملخصات شاملة ومنظمة لجميع دروس الوحدة وفق المنهاج الجزائري",
  },
  exercises: {
    label: "التمارين والحلول",
    dataKey: "exercises",
    description: "تمارين متنوعة مع حلول مفصلة خطوة بخطوة لترسيخ المفاهيم",
  },
  devoirs: {
    label: "الفروض والاختبارات",
    dataKey: "devoirs",
    description: "نماذج فروض واختبارات من مختلف المدارس مع الحلول النموذجية",
  },
  tp: {
    label: "الأعمال التطبيقية",
    dataKey: "devoirs",
    description: "تقارير ومستندات الأعمال التطبيقية للمختبر",
  },
  videos: {
    label: "الفيديوهات التعليمية",
    dataKey: "resumes",
    description: "فيديوهات تعليمية مختارة لشرح الدروس بصريًا",
  },
};

const gradeColors: Record<string, string> = {
  "1": "bg-gradient-to-br from-blue-500 to-blue-700",
  "2": "bg-gradient-to-br from-orange-500 to-orange-700",
  "3": "bg-gradient-to-br from-purple-500 to-purple-700",
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ grade: string; section: string }>;
}) {
  const { grade, section } = await params;
  const gradeLabel = gradeLabels[grade];
  const config = sectionConfig[section];

  if (!gradeLabel || !config) notFound();

  // Videos live on the dedicated playlists page (auto-synced from YouTube)
  if (section === "videos") {
    redirect(`/videos?level=${gradeVideoLevels[grade] || ""}`);
  }

  const content = gradeContent[grade as keyof typeof gradeContent];
  const items = content?.[config.dataKey as keyof typeof content] ?? [];

  return (
    <ContentPage
      grade={grade}
      section={section}
      sectionLabel={config.label}
      items={items}
      gradeLabel={gradeLabel}
      description={config.description}
      color={gradeColors[grade]}
    />
  );
}
