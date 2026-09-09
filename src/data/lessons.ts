// ============================================================================
// DzPhy — هيكل الدروس الدراسية
// Structured lessons following the Algerian school system:
// Grade → Season (فصل) → Unit (وحدة) → Lesson (درس) → Part (جزء)
// ============================================================================

export interface LessonPart {
  id: string;
  title: string;
  fileUrl: string;
  thumbnail?: string;
  sizeMB: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  parts: LessonPart[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Season {
  id: string;
  title: string;
  subtitle: string; // e.g., "الشتاء"
  units: Unit[];
}

export interface GradeLessons {
  seasons: Season[];
}

// ============================================================================
// Grade 3 — السنة الثالثة ثانوي (BAC)
// ============================================================================
export const grade3Lessons: GradeLessons = {
  seasons: [
    {
      id: "winter",
      title: "الفصل الأول",
      subtitle: "الشتاء",
      units: [
        {
          id: "unit1",
          title: "الوحدة 1",
          lessons: [
            {
              id: "lesson-chemical-transformation",
              title: "المتابعة الزمنية لتحول كيميائي",
              description: "دراسة تحولات المادة وymiق её المتابعة الزمنيةDuring تحولات كيميائية.",
              parts: [
                {
                  id: "part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/3as/winter/unit1/monitoring-chemical-transformation-part1.pdf",
                  thumbnail: "/files/lessons/3as/winter/unit1/thumbnails/part1.jpg",
                  sizeMB: 0.7,
                },
                {
                  id: "part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/3as/winter/unit1/monitoring-chemical-transformation-part2.pdf",
                  thumbnail: "/files/lessons/3as/winter/unit1/thumbnails/part2.jpg",
                  sizeMB: 0.9,
                },
                {
                  id: "part3",
                  title: "الجزء الثالث",
                  fileUrl: "/files/lessons/3as/winter/unit1/monitoring-chemical-transformation-part3.pdf",
                  thumbnail: "/files/lessons/3as/winter/unit1/thumbnails/part3.jpg",
                  sizeMB: 0.4,
                },
              ],
            },
            {
              id: "lesson-mechanical-system",
              title: "تطور جملة ميكانيكية",
              description: "دراسة تطور نظام ميكانيكي عبر الزمن وتحليل مكوناته وتفاعلات.",
              parts: [],
            },
          ],
        },
      ],
    },
    {
      id: "spring",
      title: "الفصل الثاني",
      subtitle: "الربيع",
      units: [],
    },
    {
      id: "summer",
      title: "الفصل الثالث",
      subtitle: "الصيف",
      units: [],
    },
  ],
};

// Helper to get all lessons for a grade
export function getGradeLessons(grade: string): GradeLessons | null {
  if (grade === "3") return grade3Lessons;
  return null;
}
