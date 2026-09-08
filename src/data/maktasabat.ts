// ============================================================================
// DzPhy — مكتسبات البكالوريا 2027 (فيزياء)
// PDF resources for Baccalaureate prerequisites (Physics).
// PDFs live in /public/files/maktasabat and are served from /files/maktasabat/...
// ============================================================================

export interface MaksabaResource {
  id: string;
  title: string;
  session: number;
  fileUrl: string;
  description: string;
  sizeMB: number;
}

export const maktasabat: MaksabaResource[] = [
  {
    id: "hadcha-1",
    title: "الحصة 1 — الأساسيات الرياضية المساعدة لغة الفيزياء",
    session: 1,
    fileUrl: "/files/maktasabat/hadcha-1-assass-riyadiya.pdf",
    description: "الأساسيات الرياضية اللازمة لفهم الفيزياء: الجبر، الدوال، المتجهات، والتفكير الرياضي.",
    sizeMB: 0.8,
  },
  {
    id: "hadcha-2",
    title: "الحصة 2 — أساسيات الميكانيك",
    session: 2,
    fileUrl: "/files/maktasabat/hadcha-2-assass-mekanik.pdf",
    description: "مبادئ الميكانيك الأساسية: الحركة، السرعة، التسارع، والقوى.",
    sizeMB: 0.8,
  },
  {
    id: "hadcha-3",
    title: "الحصة 3 — الكيمياء",
    session: 3,
    fileUrl: "/files/maktasabat/hadcha-3-kimiya.pdf",
    description: "أساسيات الكيمياء المطلوبة لمادة الفيزياء في البكالوريا.",
    sizeMB: 0.9,
  },
  {
    id: "hadcha-4",
    title: "الحصة 4 — الكهرباء",
    session: 4,
    fileUrl: "/files/maktasabat/hadcha-4-kahraba.pdf",
    description: "مبادئ الكهرباء الأساسية: الدائرة الكهربائية، التيار، الجهد، والمقاومة.",
    sizeMB: 0.8,
  },
];
