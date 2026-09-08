// ============================================================================
// DzPhy — مكتسبات البكالوريا 2027 (BEM — الرابعة متوسط)
// PDF resources for BEM prerequisites (Physics).
// PDFs live in /public/files/maktasabat-bem and are served from /files/maktasabat-bem/...
// ============================================================================

export interface MaksabaBemResource {
  id: string;
  title: string;
  session: number;
  fileUrl: string;
  description: string;
  sizeMB: number;
}

export const maktasabatBem: MaksabaBemResource[] = [
  {
    id: "bem-hadcha-1",
    title: "الحصة 1 — الوحدات والتحويلات + القياس",
    session: 1,
    fileUrl: "/files/maktasabat-bem/hadcha-1-wahidat-tahwilat.pdf",
    description: "الوحدات الفيزيائية الأساسية، تحويلات الوحدات، وطرق القياس في الفيزياء.",
    sizeMB: 0.6,
  },
  {
    id: "bem-hadcha-2",
    title: "الحصة 2 — المادة وتحولاتها",
    session: 2,
    fileUrl: "/files/maktasabat-bem/hadcha-2-madda-tahawulat.pdf",
    description: "خصائص المادة، الحالات الفيزيائية، والتحولات الكيميائية والفيزيائية.",
    sizeMB: 0.7,
  },
  {
    id: "bem-hadcha-3",
    title: "الحصة 3 — الميكانيك",
    session: 3,
    fileUrl: "/files/maktasabat-bem/hadcha-3-mekanik.pdf",
    description: "مبادئ الميكانيك: القوة، الحركة، السرعة، التسارع، وقوانين نيوتن.",
    sizeMB: 0.8,
  },
  {
    id: "bem-hadcha-4",
    title: "الحصة 4 — الكهرباء",
    session: 4,
    fileUrl: "/files/maktasabat-bem/hadcha-4-kahraba.pdf",
    description: "مبادئ الكهرباء: الدائرة الكهربائية، التيار، الجهد، المقاومة، وقانون أوم.",
    sizeMB: 0.8,
  },
];
