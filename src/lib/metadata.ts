import { Metadata } from 'next';

export function createPageMetadata(props: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `https://dzphy.vercel.app${props.path}`;

  return {
    title: props.title,
    description: props.description,
    openGraph: {
      title: props.title,
      description: props.description,
      url,
      type: 'website',
      images: props.ogImage ? [{
        url: props.ogImage,
        width: 1200,
        height: 630,
        alt: props.title,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: props.ogImage ? [props.ogImage] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const QUIZ_METADATA = (quizId: string, title: string) =>
  createPageMetadata({
    title: `${title} | منصة الأستاذ بيكا`,
    description: `اختبر معلوماتك في ${title} مع منصة الأستاذ بيكا للفيزياء`,
    path: `/quizzes/${quizId}`,
  });

export const VIDEO_METADATA = (videoId: string) =>
  createPageMetadata({
    title: `درس فيزيياء | منصة الأستاذ بيكا`,
    description: 'شاهد هذا الدرس التعليمي المميز من منصة الأستاذ بيكا للفيزياء',
    path: `/watch/${videoId}`,
    ogImage: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  });

export const GRADE_METADATA = (grade: string, stream?: string) =>
  createPageMetadata({
    title: `السنة ${grade} ${stream ? `- ${stream}` : ''} | منصة الأستاذ بيكا`,
    description: `ملخصات وتمارين وفروض للسنة ${grade} من منصة الأستاذ بيكا للفيزياء`,
    path: `/grade/${grade}`,
  });
