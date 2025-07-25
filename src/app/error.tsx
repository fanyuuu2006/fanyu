"use client";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageContent, LanguageOption } from "@/types/language";
import Link from "next/link";

type ErrorContent = Record<"title" | "message" | "retry" | "home", string>;

const getErrorContent = (language: LanguageOption): ErrorContent =>
  ((
    {
      chinese: {
        title: "發生錯誤",
        message: "很抱歉，頁面載入時發生錯誤。",
        retry: "重試",
        home: "返回首頁",
      },
      english: {
        title: "Something went wrong",
        message: "Sorry, an error occurred while loading the page.",
        retry: "Try again",
        home: "Back to home",
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
      <div className="p-8 flex flex-col items-center gap-4">
        <h2 className="text-5xl font-bold">{errorContent.title}</h2>
        <span className="text-2xl text-center">{errorContent.message}</span>
        <span className="text-lg text-center">{error.message}</span>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="btn text-2xl rounded-lg px-4 py-2"
          >
            {errorContent.retry}
          </button>
          <Link href="/" className="btn text-2xl rounded-lg px-4 py-2">
            {errorContent.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
