export interface Formula {
  id: string;
  nameAr: string;
  nameFr: string;
  formula: string;
  variables: { symbol: string; nameAr: string; nameFr: string; unit: string }[];
  topic: string;
  grade: number;
}

export const formulas: Formula[] = [
  // الميكانيكا
  {
    id: "f-mech-1",
    nameAr: "قانون نيوتن الثاني",
    nameFr: "2ème loi de Newton",
    formula: "F = m × a",
    variables: [
      { symbol: "F", nameAr: "القوة", nameFr: "Force", unit: "N" },
      { symbol: "m", nameAr: "الكتلة", nameFr: "Masse", unit: "kg" },
      { symbol: "a", nameAr: "التسارع", nameFr: "Accélération", unit: "m/s²" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  {
    id: "f-mech-2",
    nameAr: "الوزن",
    nameFr: "Poids",
    formula: "P = m × g",
    variables: [
      { symbol: "P", nameAr: "الوزن", nameFr: "Poids", unit: "N" },
      { symbol: "m", nameAr: "الكتلة", nameFr: "Masse", unit: "kg" },
      { symbol: "g", nameAr: "تسارع الجاذبية", nameFr: "Gravité", unit: "m/s²" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  {
    id: "f-mech-3",
    nameAr: "السرعة المتوسطة",
    nameFr: "Vitesse moyenne",
    formula: "v = d / t",
    variables: [
      { symbol: "v", nameAr: "السرعة", nameFr: "Vitesse", unit: "m/s" },
      { symbol: "d", nameAr: "المسافة", nameFr: "Distance", unit: "m" },
      { symbol: "t", nameAr: "الزمن", nameFr: "Temps", unit: "s" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  {
    id: "f-mech-4",
    nameAr: "الشغل الميكانيكي",
    nameFr: "Travail mécanique",
    formula: "W = F × d × cos(θ)",
    variables: [
      { symbol: "W", nameAr: "الشغل", nameFr: "Travail", unit: "J" },
      { symbol: "F", nameAr: "القوة", nameFr: "Force", unit: "N" },
      { symbol: "d", nameAr: "الإزاحة", nameFr: "Déplacement", unit: "m" },
      { symbol: "θ", nameAr: "الزاوية", nameFr: "Angle", unit: "°" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  {
    id: "f-mech-5",
    nameAr: "الطاقة الحركية",
    nameFr: "Énergie cinétique",
    formula: "Ec = ½ × m × v²",
    variables: [
      { symbol: "Ec", nameAr: "الطاقة الحركية", nameFr: "Énergie cinétique", unit: "J" },
      { symbol: "m", nameAr: "الكتلة", nameFr: "Masse", unit: "kg" },
      { symbol: "v", nameAr: "السرعة", nameFr: "Vitesse", unit: "m/s" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  {
    id: "f-mech-6",
    nameAr: "الطاقة الكامنة الثقالية",
    nameFr: "Énergie potentielle de pesanteur",
    formula: "Epp = m × g × h",
    variables: [
      { symbol: "Epp", nameAr: "الطاقة الكامنة", nameFr: "Énergie potentielle", unit: "J" },
      { symbol: "m", nameAr: "الكتلة", nameFr: "Masse", unit: "kg" },
      { symbol: "g", nameAr: "تسارع الجاذبية", nameFr: "Gravité", unit: "m/s²" },
      { symbol: "h", nameAr: "الارتفاع", nameFr: "Hauteur", unit: "m" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  {
    id: "f-mech-7",
    nameAr: "الضغط",
    nameFr: "Pression",
    formula: "P = F / S",
    variables: [
      { symbol: "P", nameAr: "الضغط", nameFr: "Pression", unit: "Pa" },
      { symbol: "F", nameAr: "القوة", nameFr: "Force", unit: "N" },
      { symbol: "S", nameAr: "المساحة", nameFr: "Surface", unit: "m²" },
    ],
    topic: "الميكانيكا",
    grade: 1,
  },
  // الكهرباء
  {
    id: "f-elec-1",
    nameAr: "قانون أوم",
    nameFr: "Loi d'Ohm",
    formula: "U = R × I",
    variables: [
      { symbol: "U", nameAr: "التوتر", nameFr: "Tension", unit: "V" },
      { symbol: "R", nameAr: "المقاومة", nameFr: "Résistance", unit: "Ω" },
      { symbol: "I", nameAr: "شدة التيار", nameFr: "Intensité", unit: "A" },
    ],
    topic: "الكهرباء",
    grade: 2,
  },
  {
    id: "f-elec-2",
    nameAr: "القدرة الكهربائية",
    nameFr: "Puissance électrique",
    formula: "P = U × I",
    variables: [
      { symbol: "P", nameAr: "القدرة", nameFr: "Puissance", unit: "W" },
      { symbol: "U", nameAr: "التوتر", nameFr: "Tension", unit: "V" },
      { symbol: "I", nameAr: "شدة التيار", nameFr: "Intensité", unit: "A" },
    ],
    topic: "الكهرباء",
    grade: 2,
  },
  {
    id: "f-elec-3",
    nameAr: "الطاقة الكهربائية",
    nameFr: "Énergie électrique",
    formula: "E = P × t = U × I × t",
    variables: [
      { symbol: "E", nameAr: "الطاقة", nameFr: "Énergie", unit: "J" },
      { symbol: "P", nameAr: "القدرة", nameFr: "Puissance", unit: "W" },
      { symbol: "t", nameAr: "الزمن", nameFr: "Temps", unit: "s" },
    ],
    topic: "الكهرباء",
    grade: 2,
  },
  {
    id: "f-elec-4",
    nameAr: "المقاومة المكافئة (توالي)",
    nameFr: "Résistance équivalente (série)",
    formula: "Req = R₁ + R₂ + R₃ + ...",
    variables: [
      { symbol: "Req", nameAr: "المقاومة المكافئة", nameFr: "Résistance équivalente", unit: "Ω" },
    ],
    topic: "الكهرباء",
    grade: 2,
  },
  {
    id: "f-elec-5",
    nameAr: "المقاومة المكافئة (توازي)",
    nameFr: "Résistance équivalente (parallèle)",
    formula: "1/Req = 1/R₁ + 1/R₂ + 1/R₃ + ...",
    variables: [
      { symbol: "Req", nameAr: "المقاومة المكافئة", nameFr: "Résistance équivalente", unit: "Ω" },
    ],
    topic: "الكهرباء",
    grade: 2,
  },
  // الموجات
  {
    id: "f-wave-1",
    nameAr: "سرعة الموجة",
    nameFr: "Vitesse de l'onde",
    formula: "v = λ × f",
    variables: [
      { symbol: "v", nameAr: "السرعة", nameFr: "Vitesse", unit: "m/s" },
      { symbol: "λ", nameAr: "الطول الموجي", nameFr: "Longueur d'onde", unit: "m" },
      { symbol: "f", nameAr: "التردد", nameFr: "Fréquence", unit: "Hz" },
    ],
    topic: "الموجات",
    grade: 3,
  },
  {
    id: "f-wave-2",
    nameAr: "الدور",
    nameFr: "Période",
    formula: "T = 1 / f",
    variables: [
      { symbol: "T", nameAr: "الدور", nameFr: "Période", unit: "s" },
      { symbol: "f", nameAr: "التردد", nameFr: "Fréquence", unit: "Hz" },
    ],
    topic: "الموجات",
    grade: 3,
  },
  {
    id: "f-wave-3",
    nameAr: "التداخل الهدام",
    nameFr: "Interférence destructive",
    formula: "δ = (n + ½) × λ",
    variables: [
      { symbol: "δ", nameAr: "فرق المسار", nameFr: "Différence de marche", unit: "m" },
      { symbol: "n", nameAr: "عدد صحيح", nameFr: "Entier", unit: "" },
      { symbol: "λ", nameAr: "الطول الموجي", nameFr: "Longueur d'onde", unit: "m" },
    ],
    topic: "الموجات",
    grade: 3,
  },
  {
    id: "f-wave-4",
    nameAr: "التداخل البنّاء",
    nameFr: "Interférence constructive",
    formula: "δ = n × λ",
    variables: [
      { symbol: "δ", nameAr: "فرق المسار", nameFr: "Différence de marche", unit: "m" },
      { symbol: "n", nameAr: "عدد صحيح", nameFr: "Entier", unit: "" },
      { symbol: "λ", nameAr: "الطول الموجي", nameFr: "Longueur d'onde", unit: "m" },
    ],
    topic: "الموجات",
    grade: 3,
  },
];

export const formulaTopics = [
  { key: "الميكانيكا", icon: "⚡", color: "from-blue-500 to-blue-700" },
  { key: "الكهرباء", icon: "🔌", color: "from-yellow-500 to-orange-600" },
  { key: "الموجات", icon: "🌊", color: "from-teal-500 to-cyan-700" },
  { key: "الكيمياء", icon: "🧪", color: "from-purple-500 to-purple-700" },
  { key: "البصريات", icon: "🔬", color: "from-pink-500 to-rose-700" },
  { key: "النووي", icon: "⚛️", color: "from-red-500 to-red-700" },
];
