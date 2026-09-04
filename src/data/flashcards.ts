export interface Flashcard {
  id: string;
  frontAr: string;
  frontFr?: string;
  backAr: string;
  backFr?: string;
  topic: string;
  grade: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface FlashcardProgress {
  cardId: string;
  interval: number;
  ease: number;
  nextReview: string;
  repetitions: number;
}

export interface FlashcardDeck {
  id: string;
  titleAr: string;
  titleFr?: string;
  topic: string;
  grade: number;
  cards: Flashcard[];
}

export const flashcardDecks: FlashcardDeck[] = [
  {
    id: "mechanics-cards",
    titleAr: "بطاقات الميكانيكا",
    titleFr: "Cartes Mécanique",
    topic: "الميكانيكا",
    grade: 1,
    cards: [
      {
        id: "mc-1",
        frontAr: "ما هو قانون نيوتن الثاني؟",
        frontFr: "Quelle est la 2ème loi de Newton ?",
        backAr: "F = m × a\nالقوة = الكتلة × التسارع",
        backFr: "F = m × a\nForce = masse × accélération",
        topic: "الميكانيكا",
        grade: 1,
        difficulty: "easy",
      },
      {
        id: "mc-2",
        frontAr: "ما هي وحدة قياس القوة؟",
        frontFr: "Quelle est l'unité de la force ?",
        backAr: "النيوتن (N)\n1 N = 1 kg·m/s²",
        backFr: "Le Newton (N)\n1 N = 1 kg·m/s²",
        topic: "الميكانيكا",
        grade: 1,
        difficulty: "easy",
      },
      {
        id: "mc-3",
        frontAr: "ما هو قانون نيوتن الأول (القصور الذاتي)؟",
        frontFr: "Qu'est-ce que le principe d'inertie ?",
        backAr: "الجسم الساكن يبقى ساكنًا والمتحرك يبقى متحركًا بسرعة ثابتة في خط مستقيم ما لم تؤثر عليه قوة خارجية محصلة",
        backFr: "Un corps au reste reste au repos et un corps en mouvement continue à vitesse constante en ligne droite sauf si une force nette externe agit sur lui",
        topic: "الميكانيكا",
        grade: 1,
        difficulty: "medium",
      },
      {
        id: "mc-4",
        frontAr: "ما هو الوزن؟ وما علاقته بالكتلة؟",
        frontFr: "Qu'est-ce que le poids ? Relation avec la masse ?",
        backAr: "الوزن = الكتلة × تسارع الجاذبية\nP = m × g\nالوزن قوة (N)، الكتلة كمية مادة (kg)",
        backFr: "Poids = masse × gravité\nP = m × g\nLe poids est une force (N), la masse est une quantité de matière (kg)",
        topic: "الميكانيكا",
        grade: 1,
        difficulty: "medium",
      },
      {
        id: "mc-5",
        frontAr: "ما هي معادلة الحركة المستقيمة المنتظمة المتسارعة؟",
        frontFr: "Équation du MRUA ?",
        backAr: "v = v₀ + a·t\nd = v₀·t + ½·a·t²\nv² = v₀² + 2·a·d",
        backFr: "v = v₀ + a·t\nd = v₀·t + ½·a·t²\nv² = v₀² + 2·a·d",
        topic: "الميكانيكا",
        grade: 1,
        difficulty: "hard",
      },
      {
        id: "mc-6",
        frontAr: "ما هو الشغل الميكانيكي؟",
        frontFr: "Qu'est-ce que le travail mécanique ?",
        backAr: "W = F × d × cos(θ)\nوحدة قياسه: الجول (J)\nالشغل نقل الطاقة بقوة",
        backFr: "W = F × d × cos(θ)\nUnité: Joule (J)\nLe travail est un transfert d'énergie par une force",
        topic: "الميكانيكا",
        grade: 1,
        difficulty: "hard",
      },
    ],
  },
  {
    id: "electricity-cards",
    titleAr: "بطاقات الكهرباء",
    titleFr: "Cartes Électricité",
    topic: "الكهرباء",
    grade: 2,
    cards: [
      {
        id: "ec-1",
        frontAr: "ما هو قانون أوم؟",
        frontFr: "Quelle est la loi d'Ohm ?",
        backAr: "U = R × I\nالتوتر = المقاومة × شدة التيار",
        backFr: "U = R × I\nTension = Résistance × Intensité",
        topic: "الكهرباء",
        grade: 2,
        difficulty: "easy",
      },
      {
        id: "ec-2",
        frontAr: "ما هي وحدة قياس المقاومة الكهربائية؟",
        frontFr: "Quelle est l'unité de la résistance ?",
        backAr: "الأوم (Ω)",
        backFr: "L'Ohm (Ω)",
        topic: "الكهرباء",
        grade: 2,
        difficulty: "easy",
      },
      {
        id: "ec-3",
        frontAr: "كيف تحسب القدرة الكهربائية؟",
        frontFr: "Comment calculer la puissance électrique ?",
        backAr: "P = U × I\nالقدرة = التوتر × شدة التيار\nالوحدة: وات (W)",
        backFr: "P = U × I\nPuissance = Tension × Intensité\nUnité: Watt (W)",
        topic: "الكهرباء",
        grade: 2,
        difficulty: "medium",
      },
      {
        id: "ec-4",
        frontAr: "ما الفرق بين التركيب على التوالي والتوازي؟",
        frontFr: "Différence entre montage en série et en parallèle ?",
        backAr: "على التوالي: التيار ثابت، التوتر يتجزأ\nعلى التوازي: التوتر ثابت، التيار يتجزأ",
        backFr: "En série: l'intensité est constante, la tension se divise\nEn parallèle: la tension est constante, l'intensité se divise",
        topic: "الكهرباء",
        grade: 2,
        difficulty: "hard",
      },
      {
        id: "ec-5",
        frontAr: "ما هي المقاومة المكافئة في التوالي؟",
        frontFr: "Résistance équivalente en série ?",
        backAr: "Req = R₁ + R₂ + R₃ + ...",
        backFr: "Req = R₁ + R₂ + R₃ + ...",
        topic: "الكهرباء",
        grade: 2,
        difficulty: "medium",
      },
    ],
  },
  {
    id: "waves-cards",
    titleAr: "بطاقات الموجات",
    titleFr: "Cartes Ondes",
    topic: "الموجات",
    grade: 3,
    cards: [
      {
        id: "wc-1",
        frontAr: "ما هي العلاقة بين سرعة الموجة والتردد والطول الموجي؟",
        frontFr: "Relation entre vitesse, fréquence et longueur d'onde ?",
        backAr: "v = λ × f\nالسرعة = الطول الموجي × التردد",
        backFr: "v = λ × f\nVitesse = longueur d'onde × fréquence",
        topic: "الموجات",
        grade: 3,
        difficulty: "easy",
      },
      {
        id: "wc-2",
        frontAr: "ما هو الحيود؟",
        frontFr: "Qu'est-ce que la diffraction ?",
        backAr: "ظاهرة انحراف الموجة عند مرورها خلال فتحة ضيقة أو حول عائق\nتحدث عندما يكون حجم الفتحة مقاربًا للطول الموجي",
        backFr: "Phénomène de déviation de l'onde lorsqu'elle passe par une ouverture étroite ou autour d'un obstacle\nSe produit quand la taille de l'ouverture est comparable à la longueur d'onde",
        topic: "الموجات",
        grade: 3,
        difficulty: "medium",
      },
      {
        id: "wc-3",
        frontAr: "ما هي سرعة الضوء في الفراغ؟",
        frontFr: "Quelle est la vitesse de la lumière dans le vide ?",
        backAr: "c ≈ 3 × 10⁸ m/s = 300,000 km/s",
        backFr: "c ≈ 3 × 10⁸ m/s = 300 000 km/s",
        topic: "الموجات",
        grade: 3,
        difficulty: "easy",
      },
      {
        id: "wc-4",
        frontAr: "ما هو التداخل الهدام؟",
        frontFr: "Qu'est-ce que l'interférence destructive ?",
        backAr: "يحدث عندما يكون فرق المسار بين الموجتين = (n + ½)λ\nفتكون الموجتان في تعاكس في الطور وتُلغي إحداهما الأخرى",
        backFr: "Se produit quand la différence de marche = (n + ½)λ\nLes ondes sont en opposition de phase et s'annulent mutuellement",
        topic: "الموجات",
        grade: 3,
        difficulty: "hard",
      },
    ],
  },
];

export const STORAGE_KEY = "dzphy-flashcards";

export function getFlashcardProgress(): Record<string, FlashcardProgress> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveFlashcardProgress(progress: Record<string, FlashcardProgress>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function getNextReviewDate(cardId: string, quality: number): string {
  const progress = getFlashcardProgress();
  const current = progress[cardId] || { interval: 1, ease: 2.5, repetitions: 0 };

  let newInterval: number;
  if (quality < 3) {
    newInterval = 1;
  } else if (current.repetitions === 0) {
    newInterval = 1;
  } else if (current.repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(current.interval * current.ease);
  }

  const newEase = Math.max(1.3, current.ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  progress[cardId] = {
    cardId,
    interval: newInterval,
    ease: newEase,
    nextReview: nextDate.toISOString(),
    repetitions: quality >= 3 ? current.repetitions + 1 : 0,
  };

  saveFlashcardProgress(progress);
  return nextDate.toISOString();
}

export function getDueCards(deckId: string): Flashcard[] {
  const deck = flashcardDecks.find((d) => d.id === deckId);
  if (!deck) return [];

  const progress = getFlashcardProgress();
  const now = new Date();

  return deck.cards.filter((card) => {
    const p = progress[card.id];
    if (!p) return true;
    return new Date(p.nextReview) <= now;
  });
}
