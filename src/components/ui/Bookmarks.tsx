"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "./Toast";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  type: string;
  addedAt: number;
}

interface BookmarksContextType {
  bookmarks: BookmarkItem[];
  addBookmark: (item: Omit<BookmarkItem, "addedAt">) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (item: Omit<BookmarkItem, "addedAt">) => void;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
  toggleBookmark: () => {},
});

export const useBookmarks = () => useContext(BookmarksContext);

const STORAGE_KEY = "dzphy-bookmarks";

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const addBookmark = (item: Omit<BookmarkItem, "addedAt">) => {
    const newItem: BookmarkItem = { ...item, addedAt: Date.now() };
    setBookmarks((prev) => [...prev, newItem]);
    showToast("تمت الإضافة إلى المفضلة", "success");
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    showToast("تمت الإزالة من المفضلة", "info");
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  const toggleBookmark = (item: Omit<BookmarkItem, "addedAt">) => {
    if (isBookmarked(item.id)) {
      removeBookmark(item.id);
    } else {
      addBookmark(item);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function BookmarkButton({
  id,
  title,
  url,
  type,
  size = 20,
}: {
  id: string;
  title: string;
  url: string;
  type: string;
  size?: number;
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark({ id, title, url, type });
      }}
      aria-label={bookmarked ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      className={`p-2 rounded-xl transition-all ${
        bookmarked
          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400"
      }`}
    >
      <AnimatePresence mode="wait">
        {bookmarked ? (
          <motion.div
            key="bookmarked"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <BookmarkCheck size={size} fill="currentColor" />
          </motion.div>
        ) : (
          <motion.div
            key="not-bookmarked"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ duration: 0.2 }}
          >
            <Bookmark size={size} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
