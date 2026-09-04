"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  RotateCcw,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Trophy,
  Clock,
} from "lucide-react";
import { flashcardDecks, getDueCards, getNextReviewDate, type Flashcard } from "@/data/flashcards";
import { useLanguage } from "@/context/LanguageContext";

export default function FlashcardsPage() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState<Flashcard[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const deck = flashcardDecks.find((d) => d.id === selectedDeck);

  const startDeck = (deckId: string) => {
    const due = getDueCards(deckId);
    if (due.length === 0) {
      // If no due cards, show all for review
      const d = flashcardDecks.find((d) => d.id === deckId);
      setSessionCards(d?.cards || []);
    } else {
      setSessionCards(due);
    }
    setSelectedDeck(deckId);
    setCurrentCardIdx(0);
    setIsFlipped(false);
    setSessionComplete(false);
    setReviewed(0);
  };

  const rateCard = (quality: number) => {
    const card = sessionCards[currentCardIdx];
    if (card) {
      getNextReviewDate(card.id, quality);
    }
    setReviewed((r) => r + 1);
    setIsFlipped(false);
    if (currentCardIdx < sessionCards.length - 1) {
      setCurrentCardIdx((i) => i + 1);
    } else {
      setSessionComplete(true);
    }
  };

  if (!selectedDeck || !deck) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 dark:from-cyan-600 dark:to-cyan-800 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Layers size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">بطاقات المراجعة</h1>
            <p className="text-cyan-100 text-sm sm:text-base">
              احفظ القوانين والمفاهيم بنظام التكرار المتباعد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcardDecks.map((d) => {
              const dueCount = getDueCards(d.id).length;
              return (
                <motion.button
                  key={d.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startDeck(d.id)}
                  className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 text-right hover:border-cyan-300 dark:hover:border-cyan-500/50 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{d.titleAr}</h3>
                  <p className="text-sm text-gray-400 mb-3">{d.cards.length} بطاقة</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{d.topic} — السنة {d.grade}</span>
                    {dueCount > 0 ? (
                      <span className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full">
                        {dueCount} للمراجعة
                      </span>
                    ) : (
                      <span className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                        ✓ مكتمل
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Trophy size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">أحسنت! 🎉</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">راجعت {reviewed} بطاقة بنجاح</p>
          <div className="flex gap-3">
            <button
              onClick={() => startDeck(deck.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold text-sm transition-all"
            >
              <RotateCcw size={16} />
              إعادة
            </button>
            <button
              onClick={() => { setSelectedDeck(null); setSessionComplete(false); }}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              جميع البطاقات
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const card = sessionCards[currentCardIdx];
  if (!card) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {currentCardIdx + 1} / {sessionCards.length}
          </span>
          <button
            onClick={() => { setSelectedDeck(null); setSessionComplete(false); }}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            خروج
          </button>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIdx + 1) / sessionCards.length) * 100}%` }}
          />
        </div>

        {/* Card */}
        <motion.div
          key={card.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 p-8 sm:p-12 min-h-[300px] flex items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="front"
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: -90 }}
                  className="w-full"
                >
                  <p className="text-xs text-gray-400 mb-4">اضغط لرؤية الإجابة</p>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-relaxed">
                    {lang === "fr" && card.frontFr ? card.frontFr : card.frontAr}
                  </h2>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: -90 }}
                  className="w-full"
                >
                  <p className="text-xs text-cyan-500 mb-4">الإجابة</p>
                  <pre className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                    {lang === "fr" && card.backFr ? card.backFr : card.backAr}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rating Buttons */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-4 gap-2 mt-4"
            >
              <button onClick={() => rateCard(1)} className="py-3 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-200 dark:hover:bg-red-500/30 transition-all">
                صعب جدًا
              </button>
              <button onClick={() => rateCard(2)} className="py-3 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold text-sm hover:bg-orange-200 dark:hover:bg-orange-500/30 transition-all">
                صعب
              </button>
              <button onClick={() => rateCard(4)} className="py-3 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-all">
                سهل
              </button>
              <button onClick={() => rateCard(5)} className="py-3 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 font-bold text-sm hover:bg-green-200 dark:hover:bg-green-500/30 transition-all">
                سهل جدًا
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
