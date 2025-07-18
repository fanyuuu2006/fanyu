"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import Giscus from "@giscus/react";

type GuestbookContent = Record<"guestbook", string>;

const getGuestbookContent = (language: LanguageOption): GuestbookContent =>
  ((
    {
      chinese: {
        guestbook: "留言版",
      },
      english: {
        guestbook: "Guestbook",
      },
    } as LanguageContent<GuestbookContent>
  )[language]);

export const MainSection = () => {
  const Language = useLanguage();
  const guestbookContent = getGuestbookContent(Language.Current);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <span className="text-5xl font-bold">{guestbookContent.guestbook}</span>
        <div
          className="w-full flex flex-col items-center"
          id="guestbook-container"
        >
          <Giscus
            repo="fanyuuu2006/fanyu"
            repoId="R_kgDOOeftZg"
            category="Announcements"
            categoryId="DIC_kwDOOeftZs4CqXwr"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang={Language.Current === "chinese" ? "zh-TW" : "en"}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
