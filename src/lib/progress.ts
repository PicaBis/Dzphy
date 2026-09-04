export interface ProgressItem {
  id: string;
  type: "video" | "quiz" | "lesson" | "flashcard";
  title: string;
  grade: number;
  topic: string;
  completed: boolean;
  completedAt?: string;
  score?: number;
  total?: number;
  timeSpent?: number;
}

export interface ProgressData {
  items: Record<string, ProgressItem>;
  totalPoints: number;
  streak: number;
  lastActiveDate: string;
  level: number;
  badges: string[];
}

const STORAGE_KEY = "dzphy-progress";

export function getProgress(): ProgressData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {
    // ignore
  }
  return {
    items: {},
    totalPoints: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split("T")[0],
    level: 1,
    badges: [],
  };
}

export function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function markCompleted(id: string, item: Omit<ProgressItem, "completed" | "completedAt">): ProgressData {
  const data = getProgress();
  const today = new Date().toISOString().split("T")[0];

  if (data.items[id]?.completed) return data;

  data.items[id] = {
    ...item,
    completed: true,
    completedAt: new Date().toISOString(),
  };

  data.totalPoints += item.type === "quiz" ? (item.score || 0) * 10 : 5;
  data.lastActiveDate = today;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (data.lastActiveDate === today || data.streak === 0) {
    data.streak = data.lastActiveDate === today ? data.streak : 1;
  } else if (data.lastActiveDate === yesterdayStr) {
    data.streak += 1;
  } else {
    data.streak = 1;
  }

  data.level = Math.floor(data.totalPoints / 100) + 1;

  saveProgress(data);
  return data;
}

export function getProgressStats(): {
  completed: number;
  total: number;
  percentage: number;
  points: number;
  level: number;
  streak: number;
} {
  const data = getProgress();
  const items = Object.values(data.items);
  const completed = items.filter((i) => i.completed).length;
  return {
    completed,
    total: items.length,
    percentage: items.length > 0 ? Math.round((completed / items.length) * 100) : 0,
    points: data.totalPoints,
    level: data.level,
    streak: data.streak,
  };
}

export const allLessons = [
  { id: "lesson-mech-1", type: "lesson" as const, title: "مقدمة في الميكانيكا", grade: 1, topic: "الميكانيكا" },
  { id: "lesson-mech-2", type: "lesson" as const, title: "قوانين نيوتن", grade: 1, topic: "الميكانيكا" },
  { id: "lesson-mech-3", type: "lesson" as const, title: "الحركة المستقيمة", grade: 1, topic: "الميكانيكا" },
  { id: "lesson-elec-1", type: "lesson" as const, title: "مقدمة في الكهرباء", grade: 2, topic: "الكهرباء" },
  { id: "lesson-elec-2", type: "lesson" as const, title: "قانون أوم", grade: 2, topic: "الكهرباء" },
  { id: "lesson-elec-3", type: "lesson" as const, title: "الدارة الكهربائية", grade: 2, topic: "الكهرباء" },
  { id: "lesson-wave-1", type: "lesson" as const, title: "مقدمة في الموجات", grade: 3, topic: "الموجات" },
  { id: "lesson-wave-2", type: "lesson" as const, title: "الحيود والتداخل", grade: 3, topic: "الموجات" },
  { id: "lesson-wave-3", type: "lesson" as const, title: "ظاهرة دوبلر", grade: 3, topic: "الموجات" },
];

export const allVideos = [
  { id: "vid-mech-1", type: "video" as const, title: "درس الميكانيكا - الجزء 1", grade: 1, topic: "الميكانيكا" },
  { id: "vid-mech-2", type: "video" as const, title: "درس الميكانيكا - الجزء 2", grade: 1, topic: "الميكانيكا" },
  { id: "vid-elec-1", type: "video" as const, title: "درس الكهرباء - الجزء 1", grade: 2, topic: "الكهرباء" },
  { id: "vid-wave-1", type: "video" as const, title: "درس الموجات - الجزء 1", grade: 3, topic: "الموجات" },
];
