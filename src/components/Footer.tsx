"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { CopyrightOutlined } from "@ant-design/icons";

type FooterContent = Record<"copyright", string>;

const getFooterContent = (language: LanguageOption): FooterContent =>
  ((
    {
      chinese: {
        copyright: "版權所有。",
      },
      english: {
        copyright: " All rights reserved.",
      },
    } as LanguageContent<FooterContent>
  )[language]);

export const Footer = () => {
  const Langauge = useLanguage();
  const footerContent = getFooterContent(Langauge.Current);
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container flex flex-col items-center">
        <div className="note">
          <CopyrightOutlined /> {year}, {profile.nickname[Langauge.Current]}{" "}
          {footerContent.copyright}
        </div>
      </div>
    </footer>
  );
};
