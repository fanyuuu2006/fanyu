"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { profile } from "@/lib/profile";
import { useState } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";

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
        <div
          role="tablist"
          className="w-full bg-[var(--background-color-dark)] rounded-lg flex justify-between gap-4 p-2"
        >
          {Object.keys(profile.experience).map((key) => (
            <button
              role="tab"
              tabIndex={0}
              aria-selected={Tab === key}
              aria-controls={key}
              aria-label={experienceContent[key as ExperienceTab]}
              key={key}
              className={`content text-center font-bold rounded-lg flex-1 p-2 transition-all duration-200 ${
                Tab === key ? "bg-[var(--background-color)]" : ""
              }`}
              onClick={() => {
                setTab(key as ExperienceTab);
              }}
            >
              {experienceContent[key as ExperienceTab]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={Tab}
            className="w-full flex flex-col gap-4"
            variants={staggerContainer}
            initial="hiddenLeft"
            animate="show"
            exit="hiddenRight"
          >
            {profile.experience[Tab].map((item) => (
              <ExperienceCard
                variants={fadeInItem}
                key={item.name.english}
                item={item}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
