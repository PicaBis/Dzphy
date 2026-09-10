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

// ============================================================================
// Grade 4 — الرابعة متوسط (BEM)
// ============================================================================
export const grade4Lessons: GradeLessons = {
  seasons: [
    {
      id: "winter",
      title: "الفصل الأول",
      subtitle: "الشتاء",
      units: [
        {
          id: "unit-sharida",
          title: "الشاردة والمحلول الشاردي",
          lessons: [
            {
              id: "lesson-sharida",
              title: "الشاردة والمحلول الشاردي",
              description: "دراسة المحلول الشاردي وخواصه وتركيبه الجزيئي وال kết hợp مع الكيمياء.",
              parts: [
                {
                  id: "sh-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/4am/winter/sharida-mushtari-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "sh-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/4am/winter/sharida-mushtari-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
        {
          id: "unit-amn",
          title: "الأمن الكهربائي",
          lessons: [
            {
              id: "lesson-amn",
              title: "الأمن الكهربائي",
              description: "قواعد الأمن والسلامة الكهربائية وحماية الأشخاص والمعدات من مخاطر الكهرباء.",
              parts: [
                {
                  id: "amn-part1",
                  title: "الدرس",
                  fileUrl: "/files/lessons/4am/winter/amn-kahraba.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
          ],
        },
        {
          id: "unit-tayar",
          title: "التيار الكهربائي المتناوب",
          lessons: [
            {
              id: "lesson-tayar",
              title: "التيار الكهربائي المتناوب",
              description: "دراسة التيار المتناوب وخصائصه وقياسه بأجهزة مختلفة.",
              parts: [
                {
                  id: "tayar-part1",
                  title: "الدرس",
                  fileUrl: "/files/lessons/4am/winter/tayar-mutanawib.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
        {
          id: "unit-shahna",
          title: "الشحنة الكهربائية",
          lessons: [
            {
              id: "lesson-shahna",
              title: "الشحنة الكهربائية",
              description: "دراسة الشحنة الكهربائية وأنواعها وقوانينها الأساسية.",
              parts: [
                {
                  id: "shahna-part1",
                  title: "الدرس",
                  fileUrl: "/files/lessons/4am/winter/shahna-kahraba.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
          ],
        },
        {
          id: "unit-takahrub",
          title: "التكهرب",
          lessons: [
            {
              id: "lesson-takahrub",
              title: "التكهرب",
              description: "دراسة ظاهرة التكهرب وأسبابها وطرق حماية الأشخاص منها.",
              parts: [
                {
                  id: "tk-part1",
                  title: "الدرس",
                  fileUrl: "/files/lessons/4am/winter/takahrub.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
          ],
        },
        {
          id: "unit-final",
          title: "التحليل الكهربائي البسيط",
          lessons: [
            {
              id: "lesson-final",
              title: "التحليل الكهربائي البسيط",
              description: "دراسة التحليل الكهربائي البسيط وتطبيقاته في المحلول الشاردي.",
              parts: [
                {
                  id: "final-part1",
                  title: "الدرس",
                  fileUrl: "/files/lessons/4am/winter/electrolysis-analysis.pdf",
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

// ============================================================================
// Grade 1 — السنة الأولى ثانوي
// ============================================================================
export const grade1Lessons: GradeLessons = {
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
              id: "lesson1",
              title: "بنية وهندسة أفراد بعض الأنواع الكيميائية",
              description: "دراسة بنية وتركيب الذرات والجزيئات في التراكيب الكيميائية",
              parts: [
                {
                  id: "part1",
                  title: "الجزء 1",
                  fileUrl: "/files/lessons/1as/winter/unit1/chemical-structure-part1.pdf",
                  sizeMB: 0.5,
                },
                {
                  id: "part2",
                  title: "الجزء 2",
                  fileUrl: "/files/lessons/1as/winter/unit1/chemical-structure-part2.pdf",
                  sizeMB: 0.4,
                },
                {
                  id: "part3",
                  title: "الجزء 3",
                  fileUrl: "/files/lessons/1as/winter/unit1/chemical-structure-part3.pdf",
                  sizeMB: 0.4,
                },
                {
                  id: "part4",
                  title: "الجزء 4",
                  fileUrl: "/files/lessons/1as/winter/unit1/chemical-structure-part4.pdf",
                  sizeMB: 0.6,
                },
                {
                  id: "part5",
                  title: "الجزء 5",
                  fileUrl: "/files/lessons/1as/winter/unit1/chemical-structure-part5.pdf",
                  sizeMB: 0.4,
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
  if (grade === "1") return grade1Lessons;
  if (grade === "3") return grade3Lessons;
  if (grade === "4") return grade4Lessons;
  return null;
}
