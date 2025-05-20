"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "fanyuuu2006/fanyu");
    script.setAttribute("data-repo-id", "R_kgDOOeftZg");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOOeftZs4CqXwr");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute(
      "data-lang",
      Language.Current === "chinese" ? "zh-TW" : "en"
    );
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");

    const container = document.getElementById("guestbook-container");
    if (container) {
      container.innerHTML = ""; // 清空舊留言
      container.appendChild(script);
    }
  }, [Language.Current]); // 語言切換時重新載入留言板

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{guestbookContent.guestbook}</div>
        <div
          className="w-full flex flex-col items-center p-4"
          id="guestbook-container"
        >
          <LoadingOutlined className="content" />
        </div>
      </div>
    </section>
  );
};
