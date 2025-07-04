"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/libs/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { CodeOutlined, CopyrightOutlined } from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";
import { getGithubBadgeSrcs } from "../utils/github";

type FooterContent = Record<"copyright" | "sourceCode", string>;

const getFooterContent = (language: LanguageOption): FooterContent =>
  ((
    {
      chinese: {
        copyright: "版權所有。",
        sourceCode: "原始碼: ",
      },
      english: {
        copyright: " All rights reserved.",
        sourceCode: "Source code: ",
      },
    } as LanguageContent<FooterContent>
  )[language]);

export const Footer = () => {
  const Langauge = useLanguage();
  const footerContent = getFooterContent(Langauge.Current);
  const year = new Date().getFullYear();
  return (
    <footer className="w-full flex flex-1 bg-black border-[var(--border-color)] border-t-1">
      <div className="container flex justify-between flex-col md:flex-row gap-4 md:gap-0">
        {/* 左側內容 */}
        <div className="flex flex-col">
          <div className="text-base md:text-lg flex flex-col gap-2 text-[var(--text-color-muted)]">
            <div className="flex gap-2">
              <CopyrightOutlined /> {year}, {profile.nickname[Langauge.Current]}
              {footerContent.copyright}
            </div>
            <div className="flex flex-wrap items-center gap-x-2">
              <CodeOutlined /> {footerContent.sourceCode}
              <OutsideLink
                className="whitespace-nowrap"
                href="https://github.com/fanyuuu2006/fanyu"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {getGithubBadgeSrcs("fanyuuu2006/fanyu").map((item) => (
                /* eslint-disable-next-line @next/next/no-img-element*/
                <img
                  draggable={false}
                  key={item.title}
                  src={item.url}
                  alt={item.title}
                  title={item.title}
                  className="h-[1em] select-none"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 右側內容 */}
        <div className="flex flex-col items-end"></div>
      </div>
    </footer>
  );
};
