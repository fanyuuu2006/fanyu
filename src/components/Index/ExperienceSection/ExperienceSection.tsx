"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { EducationDiv } from "./EducationDiv";
import { ClubDiv } from "./ClubDiv";
import { WorkDiv } from "./WorkDiv";

type ExperienceContent = Record<"experience", string>;

const getExperienceContent = (language: LanguageOption): ExperienceContent =>
  ((
    {
      chinese: {
        experience: "經歷",
      },
      english: {
        experience: "Experience",
      },
    } as LanguageContent<ExperienceContent>
  )[language]);

export const ExperienceSection = () => {
  const Language = useLanguage();
  const experienceContent = getExperienceContent(Language.Current);

  return (
    <section id="experience">
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{experienceContent.experience}</div>
        <EducationDiv />
        <ClubDiv />
        <WorkDiv />
      </div>
    </section>
  );
};
