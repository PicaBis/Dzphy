import { notFound, redirect } from "next/navigation";
import ContentPage from "@/components/ui/ContentPage";
import { gradeContent } from "@/data/content";
import { getLevelByGradeParam } from "@/lib/levels";

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

export default async function SectionPage({
  params,
}: {
  params: Promise<{ grade: string; section: string }>;
}) {
  const { grade, section } = await params;
  const level = getLevelByGradeParam(grade);
  const config = sectionConfig[section];

  if (!level || !config) notFound();

  // Videos live on the dedicated playlists page (auto-synced from YouTube)
  if (section === "videos") {
    redirect(`/videos?level=${level.videoLevel}`);
  }

  // BEM has no PDF sections yet → send to its hub instead of an empty page
  const content = gradeContent[grade as keyof typeof gradeContent];
  if (!content) {
    redirect(level.href);
  }
  const items = content?.[config.dataKey as keyof typeof content] ?? [];

  return (
    <ContentPage
      grade={grade}
      section={section}
      sectionLabel={config.label}
      items={items}
      gradeLabel={level.title}
      description={config.description}
      color={`bg-gradient-to-br ${level.gradient}`}
      accentSolid={level.solid}
      accentSoft={level.soft}
      accentText={level.text}
    />
  );
}
