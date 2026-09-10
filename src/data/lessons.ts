// ============================================================================
// DzPhy — هيكل الدروس الدراسية
// Structured lessons following the Algerian school system:
// Grade -> Season (فصل) -> Unit (وحدة) -> Lesson (درس) -> Part (جزء)
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
          id: "unit-takahrub",
          title: "الوحدة 1 — التكهرب",
          lessons: [
            {
              id: "lesson-takahrub",
              title: "التكهرب",
              description: "دراسة ظاهرة التكهرب وأسبابها وطرق حماية الأشخاص والمعدات منها.",
              parts: [
                {
                  id: "tk-part1",
                  title: "الدرس الكامل",
                  fileUrl: "/files/lessons/4am/winter/التكهرب-2.pdf",
                  sizeMB: 0.45,
                },
              ],
            },
          ],
        },
        {
          id: "unit-shahna",
          title: "الوحدة 2 — الشحنة الكهربائية",
          lessons: [
            {
              id: "lesson-shahna",
              title: "الشحنة الكهربائية",
              description: "دراسة الشحنة الكهربائية وأنواعها وقوانينها الأساسية وحسابات الشحنة.",
              parts: [
                {
                  id: "shahna-part1",
                  title: "الدرس الكامل",
                  fileUrl: "/files/lessons/4am/winter/الشحنة الكهربائية-2.pdf",
                  sizeMB: 0.58,
                },
              ],
            },
          ],
        },
        {
          id: "unit-tayar",
          title: "الوحدة 3 — التيار الكهربائي المتناوب",
          lessons: [
            {
              id: "lesson-tayar",
              title: "التيار الكهربائي المتناوب",
              description: "دراسة التيار المتناوب وخصائصه وقياسه بأجهزة مختلفة والحسابات.",
              parts: [
                {
                  id: "tayar-part1",
                  title: "الدرس الكامل",
                  fileUrl: "/files/lessons/4am/winter/التيار الكهربائي المتناوب-2.pdf",
                  sizeMB: 0.76,
                },
              ],
            },
          ],
        },
        {
          id: "unit-amn",
          title: "الوحدة 4 — الأمن الكهربائي",
          lessons: [
            {
              id: "lesson-amn",
              title: "الأمن الكهربائي",
              description: "قواعد الأمن والسلامة الكهربائية وحماية الأشخاص والمعدات من مخاطر الكهرباء.",
              parts: [
                {
                  id: "amn-part1",
                  title: "الدرس الكامل",
                  fileUrl: "/files/lessons/4am/winter/الأمن الكهربائي-2.pdf",
                  sizeMB: 0.77,
                },
              ],
            },
          ],
        },
        {
          id: "unit-sharida",
          title: "الوحدة 5 — الشاردة والمحلول الشاردي",
          lessons: [
            {
              id: "lesson-sharida-part1",
              title: "الشاردة والمحلول الشاردي — الجزء الأول",
              description: "دراسة المحلول الشاردي وخواصه وتركيبه الجزيئي والعمليات الكيميائية.",
              parts: [
                {
                  id: "sh-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/4am/winter/الشاردة والمحلول الشاردي 1-2.pdf",
                  sizeMB: 0.76,
                },
              ],
            },
          ],
        },
        {
          id: "unit-sharida-2",
          title: "الوحدة 6 — الشاردة والمحلول الشاردي الجزء الثاني",
          lessons: [
            {
              id: "lesson-sharida-part2",
              title: "الشاردة والمحلول الشاردي — الجزء الثاني",
              description: "تطبيقات عملية على المحاليل الشاردية والتفاعلات الكيميائية.",
              parts: [
                {
                  id: "sh-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/4am/winter/الشاردة والمحلول الشاردي 2-2.pdf",
                  sizeMB: 0.77,
                },
              ],
            },
          ],
        },
        {
          id: "unit-final",
          title: "الوحدة 7 — التحليل الكهربائي البسيط",
          lessons: [
            {
              id: "lesson-final",
              title: "التحليل الكهربائي البسيط",
              description: "دراسة التحليل الكهربائي البسيط وتطبيقاته العملية في المحلول الشاردي.",
              parts: [
                {
                  id: "final-part1",
                  title: "الدرس الكامل",
                  fileUrl: "/files/lessons/4am/winter/electrolysis-analysis.pdf",
                  sizeMB: 0.75,
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
      units: [
        {
          id: "unit-spring-1",
          title: "الوحدة 1 — الحركة والسرعة",
          lessons: [
            {
              id: "lesson-motion",
              title: "الحركة والسرعة",
              description: "دراسة الحركة المستقيمة والسرعة والتسارع والحركيات الأساسية.",
              parts: [
                {
                  id: "motion-part1",
                  title: "شرح مفاهيم الحركة",
                  fileUrl: "/files/lessons/4am/spring/motion-basics.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
          ],
        },
        {
          id: "unit-spring-2",
          title: "الوحدة 2 — القوة والطاقة",
          lessons: [
            {
              id: "lesson-force",
              title: "القوة والطاقة",
              description: "دراسة القوة والعمل والطاقة الحركية والوضعية.",
              parts: [
                {
                  id: "force-part1",
                  title: "القوة والعمل",
                  fileUrl: "/files/lessons/4am/spring/force-energy.pdf",
                  sizeMB: 0.65,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "summer",
      title: "الفصل الثالث",
      subtitle: "الصيف",
      units: [
        {
          id: "unit-summer-1",
          title: "الوحدة 1 — الظواهر الضوئية",
          lessons: [
            {
              id: "lesson-optics",
              title: "الظواهر الضوئية",
              description: "دراسة الضوء والانعكاس والانكسار والعدسات.",
              parts: [
                {
                  id: "optics-part1",
                  title: "الظواهر الضوئية الأساسية",
                  fileUrl: "/files/lessons/4am/summer/optical-phenomena.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
        {
          id: "unit-summer-2",
          title: "الوحدة 2 — الموجات الصوتية",
          lessons: [
            {
              id: "lesson-sound",
              title: "الموجات الصوتية",
              description: "دراسة الصوت والموجات الصوتية والتردد والطول الموجي.",
              parts: [
                {
                  id: "sound-part1",
                  title: "الموجات والصوت",
                  fileUrl: "/files/lessons/4am/summer/sound-waves.pdf",
                  sizeMB: 0.68,
                },
              ],
            },
          ],
        },
      ],
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

// ============================================================================
// Grade 2 — السنة الثانية ثانوي
// ============================================================================
export const grade2Lessons: GradeLessons = {
  seasons: [
    {
      id: "winter",
      title: "الفصل الأول",
      subtitle: "الشتاء",
      units: [
        {
          id: "unit1",
          title: "الوحدة 1 — الحركة والسرعة",
          lessons: [
            {
              id: "lesson-motion-basics",
              title: "الحركة المستقيمة المنتظمة",
              description: "دراسة الحركة المستقيمة المنتظمة والسرعة الثابتة والحركيات الأساسية",
              parts: [
                {
                  id: "part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/winter/unit1/uniform-motion-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/winter/unit1/uniform-motion-part2.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "part3",
                  title: "الجزء الثالث",
                  fileUrl: "/files/lessons/2as/winter/unit1/uniform-motion-part3.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
            {
              id: "lesson-acceleration",
              title: "الحركة المتغيرة والتسارع",
              description: "دراسة الحركة المتغيرة والتسارع الثابت والسقوط الحر",
              parts: [
                {
                  id: "acc-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/winter/unit1/acceleration-motion-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "acc-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/winter/unit1/acceleration-motion-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
        {
          id: "unit2",
          title: "الوحدة 2 — قوانين نيوتن",
          lessons: [
            {
              id: "lesson-newton-first",
              title: "القانون الأول لنيوتن",
              description: "دراسة القصور الذاتي والقوة والتوازن",
              parts: [
                {
                  id: "nf-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/winter/unit2/newton-first-law-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "nf-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/winter/unit2/newton-first-law-part2.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
            {
              id: "lesson-newton-second",
              title: "القانون الثاني لنيوتن",
              description: "العلاقة بين القوة والكتلة والتسارع F=ma",
              parts: [
                {
                  id: "ns-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/winter/unit2/newton-second-law-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ns-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/winter/unit2/newton-second-law-part2.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ns-part3",
                  title: "الجزء الثالث",
                  fileUrl: "/files/lessons/2as/winter/unit2/newton-second-law-part3.pdf",
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
      units: [
        {
          id: "unit3",
          title: "الوحدة 3 — الطاقة والعمل",
          lessons: [
            {
              id: "lesson-work",
              title: "العمل والطاقة",
              description: "دراسة مفهوم العمل والقدرة والطاقة الحركية",
              parts: [
                {
                  id: "work-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/spring/unit3/work-energy-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "work-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/spring/unit3/work-energy-part2.pdf",
                  sizeMB: 0.8,
                },
              ],
            },
            {
              id: "lesson-kinetic-potential",
              title: "الطاقة الحركية والجهد",
              description: "الطاقة الحركية والطاقة الوضعية والطاقة الميكانيكية",
              parts: [
                {
                  id: "kp-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/spring/unit3/kinetic-potential-energy-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "kp-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/spring/unit3/kinetic-potential-energy-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
        {
          id: "unit4",
          title: "الوحدة 4 — الكهرباء الساكنة",
          lessons: [
            {
              id: "lesson-electric-field",
              title: "الحقل الكهربائي",
              description: "دراسة الحقل الكهربائي والقوة الكهروستاتيكية",
              parts: [
                {
                  id: "ef-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/spring/unit4/electric-field-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "ef-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/spring/unit4/electric-field-part2.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
            {
              id: "lesson-electric-potential",
              title: "الجهد الكهربائي",
              description: "الجهد الكهربائي والفرق الكهربائي والمكثفات",
              parts: [
                {
                  id: "ep-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/spring/unit4/electric-potential-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ep-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/spring/unit4/electric-potential-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "summer",
      title: "الفصل الثالث",
      subtitle: "الصيف",
      units: [
        {
          id: "unit5",
          title: "الوحدة 5 — التيار الكهربائي",
          lessons: [
            {
              id: "lesson-electric-current",
              title: "التيار الكهربائي والمقاومة",
              description: "دراسة التيار الكهربائي وقانون أوم والمقاومة الكهربائية",
              parts: [
                {
                  id: "ec-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/summer/unit5/electric-current-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "ec-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/summer/unit5/electric-current-part2.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "ec-part3",
                  title: "الجزء الثالث",
                  fileUrl: "/files/lessons/2as/summer/unit5/electric-current-part3.pdf",
                  sizeMB: 0.6,
                },
              ],
            },
            {
              id: "lesson-circuits",
              title: "الدوائر الكهربائية",
              description: "دراسة الدوائر الكهربائية والعناصر الموصولة بالتسلسل والتوازي",
              parts: [
                {
                  id: "circ-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/summer/unit5/circuits-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "circ-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/summer/unit5/circuits-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
        {
          id: "unit6",
          title: "الوحدة 6 — المغناطيسية",
          lessons: [
            {
              id: "lesson-magnetism",
              title: "الحقل المغناطيسي",
              description: "دراسة الحقل المغناطيسي والقوة المغناطيسية على الشحنات المتحركة",
              parts: [
                {
                  id: "mag-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/summer/unit6/magnetism-field-part1.pdf",
                  sizeMB: 0.7,
                },
                {
                  id: "mag-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/summer/unit6/magnetism-field-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
            {
              id: "lesson-electromagnetic",
              title: "الكهرومغناطيسية",
              description: "التفاعل بين الكهرباء والمغناطيسية والحث الكهرومغناطيسي",
              parts: [
                {
                  id: "emag-part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/2as/summer/unit6/electromagnetic-part1.pdf",
                  sizeMB: 0.8,
                },
                {
                  id: "emag-part2",
                  title: "الجزء الثاني",
                  fileUrl: "/files/lessons/2as/summer/unit6/electromagnetic-part2.pdf",
                  sizeMB: 0.7,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Helper to get all lessons for a grade
export function getGradeLessons(grade: string): GradeLessons | null {
  if (grade === "1") return grade1Lessons;
  if (grade === "2") return grade2Lessons;
  if (grade === "3") return grade3Lessons;
  if (grade === "4") return grade4Lessons;
  return null;
}
