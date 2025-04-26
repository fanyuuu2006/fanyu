"use client"
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";

type AboutMeContent = Record<"aboutMe", string>;

const getAboutMeContent = (language: LanguageOption): AboutMeContent =>
  ((
    {
      chinese: {
        aboutMe: "關於我",
      },
      english: {
        aboutMe: "About Me",
      },
    } as LanguageContent<AboutMeContent>
  )[language]);

export const AboutMeSection = () => {
  const Language = useLanguage();

  const aboutMeContent: AboutMeContent = getAboutMeContent(Language.Current);

  return (
    <section
      id="aboutMe"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <div className="container d-flex flex-column align-items-center" style={{color: "var(--background-color)"}}>
        <div className="title text-bold" style={{color: "var(--background-color)"}}>{aboutMeContent.aboutMe}</div>
      </div>
    </section>
  );
};
