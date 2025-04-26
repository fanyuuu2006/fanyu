"use client";
import Image from "next/image";
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
    <section id="aboutMe">
      <div
        className="container d-flex flex-column align-items-center"
        style={{ color: "var(--background-color)" }}
      >
        <div
          className="title text-bold"
          style={{ color: "var(--background-color)" }}
        >
          {aboutMeContent.aboutMe}
        </div>
        <div className="d-flex">
          <div className="card-glass text-center" style={{ width: "40%" }}>
            <Image
              className="bordered shadow"
              alt="頭貼"
              src="/GameShow.jpg"
              width={1000}
              height={1000}
              style={{ width: "80%", height: "auto", borderRadius: "12px"}}
            />
          </div>
          <div className="d-flex flex-column flex-grow"></div>
        </div>
      </div>
    </section>
  );
};
