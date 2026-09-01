// ============================================================================
// DzPhy — Real in-site search
// ----------------------------------------------------------------------------
// Builds a single searchable index from the ACTUAL site data (levels, grade
// content, courses, video playlists, distributions, apps, and the main pages)
// and ranks results for an Arabic-friendly query. No fake/static results.
// ============================================================================

import { latestContent, gradeContent, courses, apps } from "@/data/content";
import { playlists } from "@/data/playlists";
import { distributions } from "@/data/distributions";
import { LEVELS } from "@/lib/levels";

export type SearchKind =
  | "level"
  | "resume"
  | "exercise"
  | "devoir"
  | "tp"
  | "video"
  | "course"
  | "distribution"
  | "app"
  | "page";

export interface SearchDoc {
  id: string;
  title: string;
  /** human label of the result kind (نوع النتيجة) */
  kindLabel: string;
  kind: SearchKind;
  url: string;
  /** optional context line (level / subject) */
  meta?: string;
  /** hidden terms used for matching only */
  keywords: string;
}

// ---- Arabic-aware normalization -----------------------------------------
// Strip tashkeel/tatweel and fold alef/hamza/taa-marbuta/yaa variants so that
// "القذائف" matches "القذائف", "نيوتن" matches "نيوتن", etc. regardless of
// small spelling differences.
export function normalize(input: string): string {
  return (input || "")
    .replace(/[ؐ-ًؚ-ٰٟ]/g, "") // tashkeel + superscript alef
    .replace(/ـ/g, "") // tatweel ـ
    .replace(/[آأإٱ]/g, "ا") // آأإٱ → ا
    .replace(/ى/g, "ي") // ى → ي
    .replace(/ة/g, "ه") // ة → ه
    .replace(/ؤ/g, "و") // ؤ → و
    .replace(/ئ/g, "ي") // ئ → ي
    .replace(/ـ/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const typeToSection: Record<string, { section: string; label: string; kind: SearchKind }> = {
  resume: { section: "resumes", label: "ملخص", kind: "resume" },
  exercise: { section: "exercises", label: "تمارين", kind: "exercise" },
  devoir: { section: "devoirs", label: "فرض", kind: "devoir" },
  tp: { section: "tp", label: "عمل تطبيقي", kind: "tp" },
  video: { section: "videos", label: "فيديو", kind: "video" },
};

const sectionLabels: Record<string, { label: string; kind: SearchKind }> = {
  resumes: { label: "ملخص", kind: "resume" },
  exercises: { label: "تمارين", kind: "exercise" },
  devoirs: { label: "فرض", kind: "devoir" },
  tp: { label: "عمل تطبيقي", kind: "tp" },
};

// ---- Build the index once (module scope) --------------------------------
function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  // 1) Academic levels (so "BEM" → الرابعة متوسط, "BAC" → الثالثة ثانوي)
  for (const lvl of LEVELS) {
    docs.push({
      id: `level-${lvl.key}`,
      title: lvl.title,
      kindLabel: "مستوى دراسي",
      kind: "level",
      url: lvl.href,
      meta: lvl.badge,
      keywords: normalize(
        [lvl.title, lvl.badge, lvl.description, ...lvl.topics, ...lvl.aliases].join(" ")
      ),
    });
  }

  // 2) Grade content (resumes / exercises / devoirs for every grade)
  for (const [grade, sections] of Object.entries(gradeContent)) {
    for (const [section, items] of Object.entries(sections as Record<string, { id: string; title: string; subject?: string }[]>)) {
      const info = sectionLabels[section];
      if (!info) continue;
      const lvl = LEVELS.find((l) => l.gradeParam === grade);
      for (const it of items) {
        docs.push({
          id: `gc-${grade}-${section}-${it.id}`,
          title: it.title,
          kindLabel: info.label,
          kind: info.kind,
          url: `/grade/${grade}/${section}`,
          meta: [lvl?.title, it.subject].filter(Boolean).join(" • "),
          keywords: normalize([it.title, it.subject, lvl?.title, lvl?.badge, info.label].filter(Boolean).join(" ")),
        });
      }
    }
  }

  // 3) Latest content (homepage highlights) → deep-link to its section
  for (const it of latestContent) {
    const map = typeToSection[it.type];
    if (!map) continue;
    const lvl = LEVELS.find((l) => l.gradeParam === it.grade);
    docs.push({
      id: `lc-${it.id}`,
      title: it.title,
      kindLabel: map.label,
      kind: map.kind,
      url: `/grade/${it.grade}/${map.section}`,
      meta: [lvl?.title, it.subject].filter(Boolean).join(" • "),
      keywords: normalize([it.title, it.description, it.subject, lvl?.title, lvl?.badge].filter(Boolean).join(" ")),
    });
  }

  // 4) Video playlists (real YouTube playlists)
  for (const p of playlists) {
    docs.push({
      id: `pl-${p.id}`,
      title: p.title,
      kindLabel: "فيديوهات",
      kind: "video",
      url: `/videos?level=${p.levelKey}`,
      meta: p.levelLabel,
      keywords: normalize([p.title, p.description, p.levelLabel, p.badge, p.stream].join(" ")),
    });
  }

  // 5) Courses
  for (const c of courses) {
    docs.push({
      id: `course-${c.id}`,
      title: c.title,
      kindLabel: "دورة",
      kind: "course",
      url: "/courses",
      meta: [c.level, c.category].filter(Boolean).join(" • "),
      keywords: normalize([c.title, c.description, c.level, c.category, c.instructor].join(" ")),
    });
  }

  // 6) Annual distributions
  for (const d of distributions) {
    docs.push({
      id: `dist-${d.id}`,
      title: d.title,
      kindLabel: "توزيع سنوي",
      kind: "distribution",
      url: `/distributions?level=${encodeURIComponent(d.level)}`,
      meta: [d.level, d.stream].filter(Boolean).join(" • "),
      keywords: normalize([d.title, d.description, d.level, d.stream, d.category].filter(Boolean).join(" ")),
    });
  }

  // 7) Smart apps
  for (const a of apps) {
    docs.push({
      id: `app-${a.id}`,
      title: a.name,
      kindLabel: "تطبيق",
      kind: "app",
      url: "/apps",
      meta: a.category,
      keywords: normalize([a.name, a.description, a.category].join(" ")),
    });
  }

  // 8) Main pages / sections (typing a section name jumps straight there)
  const pages: { title: string; url: string; extra?: string }[] = [
    { title: "الرئيسية", url: "/", extra: "home" },
    { title: "التوزيعات السنوية", url: "/distributions", extra: "pdf توزيع" },
    { title: "الفيديوهات التعليمية", url: "/videos", extra: "يوتيوب فيديو" },
    { title: "حقيبة الأستاذ", url: "/teacher", extra: "موارد الأستاذ" },
    { title: "الدورات التعليمية", url: "/courses", extra: "كورس دورة" },
    { title: "التطبيقات والبرامج", url: "/apps", extra: "برامج tools" },
    { title: "من نحن؟", url: "/about", extra: "حول" },
    { title: "تابعونا", url: "/follow", extra: "سوشيال تواصل" },
  ];
  for (const pg of pages) {
    docs.push({
      id: `page-${pg.url}`,
      title: pg.title,
      kindLabel: "صفحة",
      kind: "page",
      url: pg.url,
      keywords: normalize([pg.title, pg.extra].filter(Boolean).join(" ")),
    });
  }

  return docs;
}

let _index: SearchDoc[] | null = null;
export function getSearchIndex(): SearchDoc[] {
  if (!_index) _index = buildIndex();
  return _index;
}

// Priority so that a bare "BEM"/"BAC" surfaces the level first.
const kindRank: Record<SearchKind, number> = {
  level: 0,
  page: 1,
  resume: 2,
  exercise: 2,
  devoir: 2,
  tp: 2,
  video: 3,
  course: 3,
  distribution: 3,
  app: 4,
};

export interface SearchResult extends SearchDoc {
  score: number;
}

// Synonym groups (normalized). If a query term belongs to a group, a document
// matches when it contains ANY member — so "القذائف" finds "المقذوفات", etc.
const SYNONYM_GROUPS: string[][] = [
  ["قذائف", "قذيفة", "مقذوف", "مقذوفات"],
  ["كهرباء", "كهربائية", "كهربائي"],
  ["ميكانيك", "ميكانيكا", "حركة"],
  ["ضوء", "ضوئية", "بصريات"],
  ["نووية", "نووي", "نواة", "ذرية"],
].map((g) => g.map((m) => normalize(m)));

function expandTerm(term: string): string[] {
  for (const group of SYNONYM_GROUPS) {
    if (group.some((m) => term.includes(m) || m.includes(term))) {
      return Array.from(new Set([term, ...group]));
    }
  }
  return [term];
}

export function search(query: string, limit = 30): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);
  const index = getSearchIndex();
  const results: SearchResult[] = [];

  for (const doc of index) {
    const title = normalize(doc.title);
    const hay = `${title} ${doc.keywords}`;
    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      const variants = expandTerm(term);
      const hit = variants.find((v) => hay.includes(v));
      if (!hit) {
        matchedAll = false;
        break;
      }
      // weight: title hits > keyword hits; exact word/prefix > substring
      if (title === term) score += 60;
      else if (title.startsWith(term)) score += 30;
      else if (title.includes(term)) score += 18;
      else if (hay.includes(term)) score += 8; // keyword-only direct hit
      else score += 5; // synonym-only hit
    }
    if (!matchedAll) continue;

    // whole-phrase bonus
    if (hay.includes(q)) score += 12;
    // kind priority (lower rank → higher bonus)
    score += (5 - kindRank[doc.kind]) * 2;

    results.push({ ...doc, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
