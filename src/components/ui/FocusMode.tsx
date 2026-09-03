"use client";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface FocusModeContextType {
  isFocused: boolean;
  toggleFocus: () => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
  isFocused: false,
  toggleFocus: () => {},
});

export const useFocusMode = () => useContext(FocusModeContext);

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
    return () => document.body.classList.remove("focus-mode");
  }, [isFocused]);

  const toggleFocus = () => setIsFocused((f) => !f);

  return (
    <FocusModeContext.Provider value={{ isFocused, toggleFocus }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function FocusModeToggle() {
  const { isFocused, toggleFocus } = useFocusMode();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleFocus}
      aria-label={isFocused ? "إيقاف وضع التركيز" : "تفعيل وضع التركيز"}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <AnimatePresence mode="wait">
        {isFocused ? (
          <motion.div
            key="eye-off"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <EyeOff size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="eye"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Eye size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
