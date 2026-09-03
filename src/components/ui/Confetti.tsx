"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

const colors = ["#FF7A00", "#FF9A3C", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

export default function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[i % colors.length],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
      setTimeout(() => setPieces([]), 3000);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: "100vh",
                opacity: [1, 1, 0],
                rotate: piece.rotation + 720,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5,
                delay: piece.delay,
                ease: "easeIn",
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: piece.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
