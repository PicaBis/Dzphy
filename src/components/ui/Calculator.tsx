"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator as CalcIcon, X, GripVertical } from "lucide-react";

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const calcRef = useRef<HTMLDivElement>(null);

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setDisplay("0");
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      case "%":
        return (prev * current) / 100;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest("button") && calcRef.current) {
      setIsDragging(true);
      const rect = calcRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - position.x,
        y: e.clientY - rect.top - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && calcRef.current) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDelete = () => {
    setDisplay((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)));
  };

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <>
      {/* الزر الرئيسي */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all"
        aria-label="فتح الحاسبة"
        title="آلة حاسبة"
      >
        <CalcIcon size={19} />
      </button>

      {/* نافذة الحاسبة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* الخلفية الشفافة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* نافذة الحاسبة */}
            <motion.div
              ref={calcRef}
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                x: position.x,
                y: position.y,
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-8 border-2 border-gray-200 dark:border-gray-700 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {/* شريط السحب */}
              <div
                onMouseDown={handleMouseDown}
                className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-2xl cursor-grab hover:from-orange-500 hover:to-orange-700 flex items-center justify-center"
              >
                <GripVertical size={12} className="text-white opacity-50" />
              </div>

              {/* زر الإغلاق */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                <X size={18} className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* العنوان */}
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4 mt-2 flex items-center gap-2">
                <CalcIcon size={20} className="text-orange-500" />
                آلة حاسبة
              </h3>

              {/* شاشة العرض */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 mb-5 text-right">
                <div className="text-sm text-gray-400 mb-2 min-h-6">
                  {previousValue !== null && operation && `${previousValue} ${operation}`}
                </div>
                <div className="text-5xl font-bold text-white break-words">
                  {display.length > 10 ? display.substring(0, 10) + "..." : display}
                </div>
              </div>

              {/* الأزرار */}
              <div className="grid grid-cols-4 gap-3">
                {/* صف الأزرار الإضافية */}
                <button
                  onClick={handleClear}
                  className="col-span-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-all text-lg"
                >
                  مسح (C)
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold transition-all"
                >
                  حذف
                </button>
                <button
                  onClick={() => handleOperation("%")}
                  className="py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-bold transition-all"
                >
                  %
                </button>

                {/* الأزرار الرئيسية */}
                {buttons.map((row, i) => (
                  <div key={i} className="contents">
                    {row.map((btn) => (
                      <button
                        key={btn}
                        onClick={() => {
                          if (btn === "=") {
                            handleEquals();
                          } else if (["+", "-", "×", "÷"].includes(btn)) {
                            handleOperation(btn);
                          } else {
                            handleNumber(btn);
                          }
                        }}
                        className={`py-4 rounded-lg font-bold transition-all text-xl ${
                          btn === "="
                            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                            : ["+", "-", "×", "÷"].includes(btn)
                            ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/30"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* معلومة */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                اضغط Escape للإغلاق
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* إغلاق عند الضغط على Escape */}
      <style>{`
        body {
          --calc-open: ${isOpen ? "true" : "false"};
        }
      `}</style>
    </>
  );
}
