"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { EducationDiv } from "./EducationDiv";
import { ClubDiv } from "./ClubDiv";
import { WorkDiv } from "./WorkDiv";
import { profile } from "@/lib/profile";
import { useState } from "react";

type ExperienceTab = keyof typeof profile.experience;
type ExperienceContent = Record<"experience" | ExperienceTab, string>;
const getExperienceContent = (language: LanguageOption): ExperienceContent =>
  ((
    {
      chinese: {
        experience: "經歷",
        education: "學歷",
        club: "社團",
        work: "工作",
      },
      english: {
        experience: "Experience",
        education: "Education",
        club: "Club",
        work: "Work",
      },
    } as LanguageContent<ExperienceContent>
  )[language]);

export const ExperienceSection = () => {
  const Language = useLanguage();
  const experienceContent = getExperienceContent(Language.Current);
  const [Tab, setTab] = useState<ExperienceTab>("education");

  return (
    <section id="experience">
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{experienceContent.experience}</div>
        <div className="w-full bg-[var(--background-color-dark)] flex justify-between gap-4 p-2">
          {Object.keys(profile.experience).map((key) => (
            <button
              key={key}
              className={`content text-center font-bold flex-1 ${
                Tab === key ? "bg-[var(--background-color)] rounded-lg" : ""
              }`}
              onClick={() => {
                setTab(key as ExperienceTab);
              }}
            >
              {experienceContent[key as ExperienceTab]}
            </button>
          ))}
        </div>
        <EducationDiv />
        <ClubDiv />
        <WorkDiv />
      </div>
    </section>
  );
};
