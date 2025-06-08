"use client";
import { useLanguage } from "@/context/LanguageContext";
import type { LanguageContent, LanguageOption } from "@/types/language";
import Link from "next/link";

type NotFoundContent = Record<"title" | "message" | "home", string>;

const getNotFoundContent = (language: LanguageOption): NotFoundContent =>
  ((
    {
      chinese: {
        title: "找不到頁面",
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
      <div className="card p-8 flex flex-col items-center gap-4">
        <h2 className="title font-bold">{notFoundContent.title}</h2>
        <p className="note text-center">{notFoundContent.message}</p>
        <Link href="/" className="btn-primary note rounded-lg px-4 py-2">
          {notFoundContent.home}
        </Link>
      </div>
    </div>
  );
}
