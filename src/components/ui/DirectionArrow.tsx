"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DirectionArrow({ size = 16, className }: { size?: number; className?: string }) {
  const { dir } = useLanguage();
  const Icon = dir === "rtl" ? ArrowLeft : ArrowRight;
  return <Icon size={size} className={className} />;
}