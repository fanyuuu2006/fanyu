"use client"

import { useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import type { LanguageContent, LanguageOption } from "@/types/language"
import Link from "next/link"

type ErrorContent = Record<"title" | "message" | "retry" | "home", string>

const getErrorContent = (language: LanguageOption): ErrorContent =>
  (
    ({
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
    }) as LanguageContent<ErrorContent>
  )[language]

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const Language = useLanguage()
  const errorContent = getErrorContent(Language.Current)

  useEffect(() => {
    console.error("頁面錯誤:", error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <div className="card-glass p-8 flex flex-col items-center gap-4 max-w-md">
        <h2 className="title font-bold">{errorContent.title}</h2>
        <p className="note text-center">{errorContent.message}</p>
        <div className="flex gap-4">
          <button onClick={() => reset()} className="btn card-link note rounded-md px-4 py-2">
            {errorContent.retry}
          </button>
          <Link href="/" className="btn card-link note rounded-md px-4 py-2">
            {errorContent.home}
          </Link>
        </div>
      </div>
    </div>
  )
}
