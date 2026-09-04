"use client";
import QuizRunner from "@/components/quiz/QuizRunner";

export default function QuizPage({ params }: { params: { quizId: string } }) {
  return <QuizRunner quizId={params.quizId} />;
}
