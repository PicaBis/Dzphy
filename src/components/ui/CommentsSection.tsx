"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Reply,
  Trash2,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  likes: number;
  liked: boolean;
  replies: Comment[];
}

const COMMENTS_STORAGE = "dzphy-comments";

function getComments(contentId: string): Comment[] {
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_STORAGE) || "{}");
    return all[contentId] || [];
  } catch {
    return [];
  }
}

function saveComments(contentId: string, comments: Comment[]) {
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_STORAGE) || "{}");
    all[contentId] = comments;
    localStorage.setItem(COMMENTS_STORAGE, JSON.stringify(all));
  } catch {
    // ignore
  }
}

function getUserName(): string {
  try {
    return localStorage.getItem("dzphy-user-name") || "";
  } catch {
    return "";
  }
}

function saveUserName(name: string) {
  try {
    localStorage.setItem("dzphy-user-name", name);
  } catch {
    // ignore
  }
}

export default function CommentsSection({ contentId }: { contentId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setComments(getComments(contentId));
    const name = getUserName();
    if (name) setAuthorName(name);
  }, [contentId]);

  const addComment = () => {
    if (!newComment.trim() || !authorName.trim()) return;
    saveUserName(authorName);

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      text: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: [],
    };

    const updated = [comment, ...comments];
    setComments(updated);
    saveComments(contentId, updated);
    setNewComment("");
  };

  const addReply = (parentId: string) => {
    if (!replyText.trim() || !authorName.trim()) return;
    saveUserName(authorName);

    const reply: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      text: replyText.trim(),
      date: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: [],
    };

    const updated = comments.map((c) =>
      c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c
    );
    setComments(updated);
    saveComments(contentId, updated);
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleLike = (commentId: string, parentId?: string) => {
    const updated = comments.map((c) => {
      if (parentId) {
        if (c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === commentId
                ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
                : r
            ),
          };
        }
        return c;
      }
      if (c.id === commentId) {
        return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
      }
      return c;
    });
    setComments(updated);
    saveComments(contentId, updated);
  };

  const deleteComment = (commentId: string) => {
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);
    saveComments(contentId, updated);
  };

  const totalComments = comments.reduce((sum, c) => sum + 1 + c.replies.length, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-blue-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">التعليقات والأسئلة</h3>
          <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
            {totalComments}
          </span>
        </div>
        {collapsed ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronUp size={20} className="text-gray-400" />}
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Add Comment */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="اسمك"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:text-white"
                />
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تعليقك أو سؤالك..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:text-white resize-none"
                />
                <button
                  onClick={addComment}
                  disabled={!newComment.trim() || !authorName.trim()}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  <Send size={14} />
                  إرسال
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-gray-400 dark:text-gray-500 text-sm">لا توجد تعليقات بعد — كن أول من يعلق!</p>
                  </div>
                )}

                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{comment.author}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.date).toLocaleDateString("ar-DZ")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.text}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => toggleLike(comment.id)}
                            className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                              comment.liked
                                ? "text-blue-500"
                                : "text-gray-400 hover:text-blue-500"
                            }`}
                          >
                            <ThumbsUp size={12} />
                            {comment.likes > 0 && comment.likes}
                          </button>
                          <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Reply size={12} />
                            رد
                          </button>
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <div className="mt-3 flex items-center gap-2">
                            <input
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="اكتب ردك..."
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
                            />
                            <button
                              onClick={() => addReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition-all"
                            >
                              <Send size={12} />
                            </button>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-3 space-y-2 mr-6 border-r-2 border-blue-200 dark:border-blue-500/30 pr-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="bg-white dark:bg-gray-600 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-gray-900 dark:text-white">{reply.author}</span>
                                  <span className="text-xs text-gray-400">
                                    {new Date(reply.date).toLocaleDateString("ar-DZ")}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300">{reply.text}</p>
                                <button
                                  onClick={() => toggleLike(reply.id, comment.id)}
                                  className={`flex items-center gap-1 text-xs mt-1 ${
                                    reply.liked ? "text-blue-500" : "text-gray-400"
                                  }`}
                                >
                                  <ThumbsUp size={10} />
                                  {reply.likes > 0 && reply.likes}
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
