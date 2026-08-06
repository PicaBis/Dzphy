export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: number;
  level: string;
  type: 'free' | 'paid';
  price?: number;
  category: string;
  instructor: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'resume' | 'exercise' | 'devoir' | 'tp' | 'video';
  grade: '1' | '2' | '3';
  subject?: string;
  date: string;
  downloadUrl?: string;
  viewUrl?: string;
  thumbnail?: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  badge?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  platform: 'youtube' | 'tiktok';
  views: string;
  duration?: string;
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
    icon?: string;
  }[];
}
