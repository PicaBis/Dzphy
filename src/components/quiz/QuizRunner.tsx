"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Zap,
  Target,
  Star,
  Share2,
} from "lucide-react";
import { quizzes, type Quiz, type QuizResult, type QuizQuestion } from "@/data/quizzes";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "dzphy-quiz-results";

function getQuestionText(q: QuizQuestion, lang: string): string {
  if (lang === "fr" && q.questionFr) return q.questionFr;
  if (lang === "en" && q.questionEn) return q.questionEn;
  return q.questionAr;
}

function getExplanationText(q: QuizQuestion, lang: string): string {
  if (lang === "fr" && q.explanationFr) return q.explanationFr;
  return q.explanationAr;
}

function getQuizTitle(quiz: Quiz, lang: string): string {
  if (lang === "fr" && quiz.titleFr) return quiz.titleFr;
  if (lang === "en" && quiz.titleEn) return quiz.titleEn;
  return quiz.titleAr;
}

export default function QuizRunner({ quizId }: { quizId: string }) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const quiz = quizzes.find((q) => q.id === quizId);

  const [phase, setPhase] = useState<"intro" | "playing" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase !== "playing" || !quiz) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishQuiz({});
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الاختبار غير موجود</h1>
          <button onClick={() => router.push("/quizzes")} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold">
            العودة للاختبارات
          </button>
        </div>
      </div>
    );
  }

  const startQuiz = () => {
    setPhase("playing");
    setTimeLeft(quiz.timeLimit);
    setCurrentQ(0);
    setAnswers({});
    setShowExplanation(false);
  };

  const selectAnswer = (qId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const finishQuiz = (finalAnswers: Record<string, number>) => {
    const answersToUse = Object.keys(finalAnswers).length > 0 ? finalAnswers : answers;
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answersToUse[q.id] === q.correctIndex) correct++;
    });

    const result: QuizResult = {
      quizId: quiz.id,
      score: correct,
      total: quiz.questions.length,
      answers: answersToUse,
      timeTaken: quiz.timeLimit - timeLeft,
      date: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.push(result);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore
    }

    setPhase("results");
  };

  const restartQuiz = () => {
    setPhase("intro");
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(quiz.timeLimit);
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const question = quiz.questions[currentQ];
  const userAnswer = answers[question.id];
  const isCorrect = userAnswer === question.correctIndex;
  const answeredCount = Object.keys(answers).length;
  const percentage = Math.round((answeredCount / quiz.questions.length) * 100);
  const timePercent = (timeLeft / quiz.timeLimit) * 100;

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className={`bg-gradient-to-br ${getQuizColor(quiz.topic)} p-8 text-center text-white`}>
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Zap size={36} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-2">{getQuizTitle(quiz, lang)}</h1>
              <p className="text-white/80 text-sm">{quiz.topic} — السنة {quiz.grade}</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <Target size={24} className="mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{quiz.questions.length}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">سؤال</p>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <Clock size={24} className="mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{Math.floor(quiz.timeLimit / 60)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">دقيقة</p>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <Star size={24} className="mx-auto mb-2 text-yellow-500" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">
                    {quiz.questions.filter((q) => q.difficulty === "easy").length}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">سهل</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 dark:text-white">مستوى الصعوبة:</h3>
                <div className="flex items-center gap-2">
                  {quiz.questions.map((q, i) => (
                    <div
                      key={i}
                      className={`w-6 h-2 rounded-full ${
                        q.difficulty === "easy" ? "bg-green-500" : q.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><div className="w-3 h-1.5 rounded-full bg-green-500" /> سهل</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-1.5 rounded-full bg-yellow-500" /> متوسط</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-1.5 rounded-full bg-red-500" /> صعب</span>
                </div>
              </div>

              <button
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                ابدأ الاختبار
              </button>

              <button
                onClick={() => router.push("/quizzes")}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-bold text-sm transition-all"
              >
                <ArrowLeft size={16} />
                العودة للاختبارات
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const score = quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length;
    const total = quiz.questions.length;
    const pct = Math.round((score / total) * 100);
    const minutes = Math.floor((quiz.timeLimit - timeLeft) / 60);
    const seconds = (quiz.timeLimit - timeLeft) % 60;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className={`p-8 text-center text-white bg-gradient-to-br ${pct >= 70 ? "from-green-500 to-green-700" : pct >= 50 ? "from-yellow-500 to-orange-500" : "from-red-500 to-red-700"}`}>
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                {pct >= 70 ? <Trophy size={48} /> : pct >= 50 ? <Target size={48} /> : <XCircle size={48} />}
              </div>
              <h1 className="text-3xl font-black mb-2">{pct >= 70 ? "ممتاز! 🎉" : pct >= 50 ? "جيد 👍" : "حاول مرة أخرى 💪"}</h1>
              <p className="text-white/80">{score} من {total} إجابة صحيحة</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{pct}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">النسبة المئوية</p>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{minutes}:{seconds.toString().padStart(2, "0")}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">الوقت المستغرق</p>
                </div>
              </div>

              {/* Questions Review */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white">مراجعة الإجابات:</h3>
                {quiz.questions.map((q, i) => {
                  const userAns = answers[q.id];
                  const correct = userAns === q.correctIndex;
                  return (
                    <details key={q.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                      <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        {correct ? (
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle size={20} className="text-red-500 flex-shrink-0" />
                        )}
                        <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white text-right">
                          {i + 1}. {getQuestionText(q, lang)}
                        </span>
                      </summary>
                      <div className="px-4 pb-4 space-y-2 text-sm">
                        {!correct && (
                          <p className="text-green-600 dark:text-green-400 font-semibold">
                            ✓ الإجابة الصحيحة: {q.options[q.correctIndex]}
                          </p>
                        )}
                        {userAns !== undefined && (
                          <p className="text-red-500">✗ إجابتك: {q.options[userAns]}</p>
                        )}
                        <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3">
                          <Lightbulb size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700 dark:text-gray-300">{getExplanationText(q, lang)}</p>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={restartQuiz}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-all"
                >
                  <RotateCcw size={16} />
                  إعادة الاختبار
                </button>
                <button
                  onClick={() => router.push("/quizzes")}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-bold text-sm transition-all"
                >
                  جميع الاختبارات
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Playing phase
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              السؤال {currentQ + 1} من {quiz.questions.length}
            </span>
            <span className={`text-sm font-bold flex items-center gap-1 ${timeLeft < 60 ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
              <Clock size={14} />
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${timeLeft < 60 ? "bg-red-500" : "bg-orange-500"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          {/* Time bar */}
          <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1">
            <motion.div
              className={`h-full rounded-full ${timePercent < 15 ? "bg-red-500" : "bg-blue-400"}`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        </div>

        {/* Question dots */}
        <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
          {quiz.questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                i === currentQ
                  ? "bg-orange-500 text-white scale-110"
                  : answers[q.id] !== undefined
                  ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              question.difficulty === "easy" ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" :
              question.difficulty === "medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400" :
              "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
            }`}>
              {question.difficulty === "easy" ? "سهل" : question.difficulty === "medium" ? "متوسط" : "صعب"}
            </span>
            <span className="text-xs text-gray-400">{question.topic}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
            {getQuestionText(question, lang)}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = userAnswer === idx;
              const showResult = showExplanation || (currentQ < quiz.questions.length - 1 && userAnswer !== undefined);
              const isThisCorrect = idx === question.correctIndex;

              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => selectAnswer(question.id, idx)}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    showResult && isThisCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-500/10"
                      : showResult && isSelected && !isThisCorrect
                      ? "border-red-500 bg-red-50 dark:bg-red-500/10"
                      : isSelected
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                      : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                    showResult && isThisCorrect
                      ? "bg-green-500 text-white"
                      : showResult && isSelected && !isThisCorrect
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}>
                    {showResult && isThisCorrect ? (
                      <CheckCircle size={16} />
                    ) : showResult && isSelected && !isThisCorrect ? (
                      <XCircle size={16} />
                    ) : (
                      String.fromCharCode(1611 + idx)
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    showResult && isThisCorrect
                      ? "text-green-700 dark:text-green-400"
                      : showResult && isSelected && !isThisCorrect
                      ? "text-red-700 dark:text-red-400"
                      : "text-gray-900 dark:text-white"
                  }`}>
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {userAnswer !== undefined && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 border border-blue-200 dark:border-blue-500/30"
            >
              <div className="flex items-start gap-2">
                <Lightbulb size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">الشرح:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{getExplanationText(question, lang)}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
            disabled={currentQ === 0}
            className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-gray-200 px-5 py-3 rounded-xl font-bold text-sm transition-all"
          >
            السابق
          </button>
          {currentQ < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ((c) => Math.min(quiz.questions.length - 1, c + 1))}
              className="flex-1 flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-all"
            >
              التالي
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => finishQuiz({})}
              disabled={answeredCount < quiz.questions.length}
              className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-all"
            >
              <Trophy size={16} />
              إنهاء الاختبار ({answeredCount}/{quiz.questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function getQuizColor(topic: string): string {
  const colors: Record<string, string> = {
    "الميكانيكا": "from-blue-500 to-blue-700",
    "الكهرباء": "from-yellow-500 to-orange-600",
    "الموجات": "from-teal-500 to-cyan-700",
    "الكيمياء": "from-purple-500 to-purple-700",
    "البصريات": "from-pink-500 to-rose-700",
    "النووي": "from-red-500 to-red-700",
  };
  return colors[topic] || "from-orange-500 to-orange-700";
}
