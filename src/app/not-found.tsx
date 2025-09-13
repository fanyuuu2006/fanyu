"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageContent, LanguageOption } from "@/types/language";
import Link from "next/link";

type NotFoundContent = Record<"title" | "message" | "home", string>;

const getNotFoundContent = (language: LanguageOption): NotFoundContent =>
  ((
    {
      chinese: {
        title: "頁面未找到",
        message: "很抱歉，您要尋找的頁面不存在。",
        home: "返回首頁",
      },
      english: {
        title: "Page Not Found",
        message: "Sorry, the page you are looking for does not exist.",
        home: "Back to home",
      },
    } as LanguageContent<NotFoundContent>
  )[language]);

export default function NotFound() {
  const Language = useLanguage();
  const notFoundContent = getNotFoundContent(Language.Current);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <div className="card p-8 max-w-md w-full flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-8xl font-bold text-[color:var(--text-color-primary)]">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-[color:var(--text-color)]">
            {notFoundContent.title}
          </h2>
          <p className="text-[color:var(--text-color-muted)] leading-relaxed">
            {notFoundContent.message}
          </p>
        </div>

        <Link href="/" className="btn-primary rounded-full p-3">
          {notFoundContent.home}
        </Link>
      </div>
    </div>
  );
}
