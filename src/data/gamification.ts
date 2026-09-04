export interface Badge {
  id: string;
  nameAr: string;
  nameFr: string;
  icon: string;
  color: string;
  description: string;
  requirement: number;
  type: "points" | "streak" | "quizzes" | "videos" | "flashcards" | "perfect";
}

export const badges: Badge[] = [
  { id: "first-steps", nameAr: "الخطوات الأولى", nameFr: "Premiers pas", icon: "👶", color: "from-gray-400 to-gray-600", description: "أكمل أول نشاط", requirement: 1, type: "points" },
  { id: "beginner", nameAr: "مبتدئ", nameFr: "Débutant", icon: "🌱", color: "from-green-400 to-green-600", description: "اجمع 50 نقطة", requirement: 50, type: "points" },
  { id: "learner", nameAr: "متعلم", nameFr: "Apprenant", icon: "📖", color: "from-blue-400 to-blue-600", description: "اجمع 200 نقطة", requirement: 200, type: "points" },
  { id: "advanced", nameAr: "متقدم", nameFr: "Avancé", icon: "🎓", color: "from-purple-400 to-purple-600", description: "اجمع 500 نقطة", requirement: 500, type: "points" },
  { id: "expert", nameAr: "خبير", nameFr: "Expert", icon: "🏆", color: "from-yellow-400 to-yellow-600", description: "اجمع 1000 نقطة", requirement: 1000, type: "points" },
  { id: "legend", nameAr: "أسطورة", nameFr: "Légende", icon: "👑", color: "from-orange-400 to-red-600", description: "اجمع 2000 نقطة", requirement: 2000, type: "points" },
  { id: "streak-3", nameAr: "3 أيام متتالية", nameFr: "3 jours consécutifs", icon: "🔥", color: "from-orange-400 to-red-500", description: "ادرس 3 أيام متتالية", requirement: 3, type: "streak" },
  { id: "streak-7", nameAr: "أسبوع كامل", nameFr: "Semaine complète", icon: "💪", color: "from-red-400 to-red-600", description: "ادرس 7 أيام متتالية", requirement: 7, type: "streak" },
  { id: "streak-30", nameAr: "شهر كامل", nameFr: "Mois complet", icon: "🌟", color: "from-yellow-400 to-orange-500", description: "ادرس 30 يوم متتالي", requirement: 30, type: "streak" },
  { id: "quiz-first", nameAr: "أول اختبار", nameFr: "Premier quiz", icon: "📝", color: "from-green-400 to-green-600", description: "أكمل أول اختبار", requirement: 1, type: "quizzes" },
  { id: "quiz-5", nameAr: "5 اختبارات", nameFr: "5 quiz", icon: "📊", color: "from-blue-400 to-blue-600", description: "أكمل 5 اختبارات", requirement: 5, type: "quizzes" },
  { id: "quiz-10", nameAr: "10 اختبارات", nameFr: "10 quiz", icon: "🎯", color: "from-purple-400 to-purple-600", description: "أكمل 10 اختبارات", requirement: 10, type: "quizzes" },
  { id: "perfect-score", nameAr: "درجة كاملة", nameFr: "Score parfait", icon: "💯", color: "from-yellow-400 to-yellow-600", description: "احصل على 100% في اختبار", requirement: 100, type: "perfect" },
  { id: "flashcard-10", nameAr: "10 بطاقات", nameFr: "10 cartes", icon: "🃏", color: "from-teal-400 to-teal-600", description: "راجع 10 بطاقات", requirement: 10, type: "flashcards" },
  { id: "video-5", nameAr: "5 فيديوهات", nameFr: "5 vidéos", icon: "🎬", color: "from-pink-400 to-pink-600", description: "شاهد 5 فيديوهات", requirement: 5, type: "videos" },
];

export const levelNames = [
  "مبتدئ", "متعلم", "دارس", "مجتهد", "متقدم",
  "خبير", "محترف", "متميز", "أسطاري", "عبقري",
];

export function checkBadges(points: number, streak: number, quizCount: number, hasPerfect: boolean): string[] {
  const earned: string[] = [];
  badges.forEach((badge) => {
    let value = 0;
    switch (badge.type) {
      case "points": value = points; break;
      case "streak": value = streak; break;
      case "quizzes": value = quizCount; break;
      case "perfect": value = hasPerfect ? 100 : 0; break;
    }
    if (value >= badge.requirement) {
      earned.push(badge.id);
    }
  });
  return earned;
}
