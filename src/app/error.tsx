"use client";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageContent, LanguageOption } from "@/types/language";
import Link from "next/link";

type ErrorContent = Record<
  "title" | "message" | "retry" | "home" | "details" | "errorCode",
  string
>;

const getErrorContent = (language: LanguageOption): ErrorContent =>
  ((
    {
      chinese: {
        title: "發生錯誤",
        message: "很抱歉，頁面發生了意外錯誤。",
        retry: "重新嘗試",
        home: "返回首頁",
        details: "錯誤詳情",
        errorCode: "錯誤代碼",
      },
      english: {
        title: "Something went wrong",
        message: "Sorry, an unexpected error has occurred.",
        retry: "Try again",
        home: "Back to home",
        details: "Error Details",
        errorCode: "Error Code",
      },
    } as LanguageContent<ErrorContent>
  )[language]);

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const Language = useLanguage();
  const errorContent = getErrorContent(Language.Current);

  useEffect(() => {
    console.error("頁面錯誤:", error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <div className="card p-8 max-w-2xl w-full flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center gap-4">
          {/* 錯誤圖標 */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              !
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full animate-pulse"></div>
          </div>

          {/* 錯誤標題 */}
          <h1 className="text-4xl font-bold text-[color:var(--text-color)]">
            {errorContent.title}
          </h1>

          {/* 錯誤描述 */}
          <p className="text-lg text-[color:var(--text-color-muted)] leading-relaxed max-w-md">
            {errorContent.message}
          </p>

          {/* 錯誤詳情 */}
          {error.message && (
            <details className="w-full max-w-lg">
              <summary className="cursor-pointer text-[color:var(--text-color-primary)] hover:text-[color:var(--text-color-secondary)] transition-colors text-sm mb-2">
                {errorContent.details}
              </summary>
              <div className="bg-[color:var(--background-color-tertiary)] rounded-lg p-4 text-left">
                <p className="text-sm text-[color:var(--text-color-muted)] font-mono break-words">
                  <span className="text-[color:var(--text-color-quaternary)] font-bold">
                    {errorContent.errorCode}:{" "}
                  </span>
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-[color:var(--text-color-muted)] mt-2 opacity-75">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            </details>
          )}
        </div>

        {/* 操作按鈕 */}
        <div className="flex flex-row gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
          >
            {errorContent.retry}
          </button>
          <Link
            href="/"
            className="btn-tertiary rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
          >
            {errorContent.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
