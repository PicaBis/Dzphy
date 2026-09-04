"use client";
import { Component, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={36} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">حدث خطأ غير متوقع</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
            </p>
            {this.state.error && (
              <details className="text-right bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6 text-xs text-gray-600 dark:text-gray-400">
                <summary className="cursor-pointer font-semibold mb-2">تفاصيل الخطأ</summary>
                <pre className="whitespace-pre-wrap break-all">{this.state.error.message}</pre>
              </details>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                <RefreshCw size={16} />
                إعادة المحاولة
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                <Home size={16} />
                الرئيسية
              </Link>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
