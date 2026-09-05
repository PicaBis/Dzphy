"use client";
import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "./Toast";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();
  const syncedForUser = useRef<string | null>(null);

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

  // On sign-in: merge server-side favorites with whatever is already saved
  // locally (union by id), then push any local-only items to the server so
  // guest bookmarks migrate into the account. Runs once per user session.
  useEffect(() => {
    if (!user || syncedForUser.current === user.id) return;
    syncedForUser.current = user.id;

    (async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) return;
        const { favorites } = (await res.json()) as {
          favorites: { item_id: string; item_type: string; title: string | null; url: string | null; created_at: string }[];
        };

        setBookmarks((local) => {
          const byId = new Map(local.map((b) => [b.id, b]));
          for (const f of favorites) {
            if (!byId.has(f.item_id)) {
              byId.set(f.item_id, {
                id: f.item_id,
                title: f.title || "",
                url: f.url || "",
                type: f.item_type,
                addedAt: new Date(f.created_at).getTime(),
              });
            }
          }
          return Array.from(byId.values());
        });

        // Push any local-only bookmarks up to the server (best-effort).
        const serverIds = new Set(favorites.map((f) => f.item_id));
        for (const b of bookmarks) {
          if (!serverIds.has(b.id)) {
            fetch("/api/favorites", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: b.id, title: b.title, url: b.url, type: b.type }),
            }).catch(() => {});
          }
        }
      } catch {
        // offline or API unavailable — local bookmarks still work
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addBookmark = (item: Omit<BookmarkItem, "addedAt">) => {
    const newItem: BookmarkItem = { ...item, addedAt: Date.now() };
    setBookmarks((prev) => [...prev, newItem]);
    showToast("تمت الإضافة إلى المفضلة", "success");
    if (user) {
      fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, title: item.title, url: item.url, type: item.type }),
      }).catch(() => {});
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    showToast("تمت الإزالة من المفضلة", "info");
    if (user) {
      fetch(`/api/favorites?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
    }
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
