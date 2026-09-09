// ============================================================================
// DzPhy — هيكل الدروس الدراسية
// Structured lessons following the Algerian school system:
// Grade → Season (فصل) → Unit (وحدة) → Lesson (درس) → Part (جزء)
// ============================================================================

export interface LessonPart {
  id: string;
  title: string;
  fileUrl: string;
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
                  sizeMB: 0.7,
                },
                {
                  id: "part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/3as/winter/unit1/monitoring-chemical-transformation-part2.pdf",
                  sizeMB: 0.9,
                },
                {
                  id: "part3",
                  title: "الجزء الثالث",
                  fileUrl: "/files/lessons/3as/winter/unit1/monitoring-chemical-transformation-part3.pdf",
                  sizeMB: 0.4,
                },
              ],
            },
            {
              id: "lesson-mechanical-system",
              title: "تطور جملة ميكانيكية",
              description: "دراسة تطور نظام ميكانيكي عبر الزمن وتحليل مكوناته وتفاعلات.",
              parts: [
                {
                  id: "ms-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "ms-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part2.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ms-part3",
                  title: "الجزء الثالث",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part3.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ms-part4",
                  title: "الجزء الرابع",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part4.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ms-part5",
                  title: "الجزء الخامس",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part5.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "ms-part6",
                  title: "الجزء السادس",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part6.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "ms-part7",
                  title: "الجزء السابع",
                  fileUrl: "/files/lessons/3as/winter/unit1/mechanical-system-evolution-part7.pdf",
                  sizeMB: 0.7,
                },
              ],
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
