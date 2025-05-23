"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { profile } from "@/lib/profile";
import { useState } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { ExperienceTab } from "@/types/experience";
import { experienceTabIcons, experienceTabs } from "@/lib/experience";

type ExperienceContent = Record<
  "experience" | ExperienceTab | "noExperience",
  string
>;
const getExperienceContent = (language: LanguageOption): ExperienceContent =>
  ((
    {
      chinese: {
        experience: "經歷",
        education: "學歷",
        club: "社團",
        work: "工作",
        competition: "競賽",
        noExperience: "尚無經歷資料。",
      },
      english: {
        experience: "Experience",
        education: "Education",
        club: "Club",
        work: "Work",
        competition: "Competition",
        noExperience: "No experience data.",
      },
    } as LanguageContent<ExperienceContent>
  )[language]);

export const ExperienceSection = () => {
  const Language = useLanguage();
  const experienceContent = getExperienceContent(Language.Current);
  const [Tab, setTab] = useState<ExperienceTab>("education");

  return (
    <section id="experience">
      <motion.div
        variants={fadeInItem}
        initial="hiddenLeft"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container flex flex-col items-center"
      >
        <div className="title font-bold">{experienceContent.experience}</div>
        <div className="flex flex-col w-full gap-4 overflow-hidden">
          <div
            role="tablist"
            className="w-full bg-[var(--background-color-dark)] rounded-lg flex justify-between p-1"
          >
            {experienceTabs.map((key) => (
              <button
                role="tab"
                aria-selected={Tab === key}
                aria-controls={key}
                aria-label={experienceContent[key]}
                key={key}
                className={`note font-bold rounded-lg flex flex-wrap flex-1 items-center justify-center p-2 gap-2 transition-[background-color] duration-200 ${
                  Tab === key ? "btn" : ""
                }`}
                onClick={() => {
                  if (Tab === key) return;
                  setTab(key);
                }}
              >
                {experienceTabIcons[key]}
                {experienceContent[key]}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={Tab}
              className="w-full flex flex-col items-center gap-4"
              variants={staggerContainer}
              initial="hiddenLeft"
              animate="show"
              exit="hiddenRight"
            >
              {profile.experience[Tab].length > 0 ? (
                profile.experience[Tab].sort(
                  (a, b) =>
                    new Date(b.duration.start).getTime() -
                    new Date(a.duration.start).getTime()
                ).map((item) => (
                  <ExperienceCard
                    variants={fadeInItem}
                    key={item.name.english}
                    item={item}
                  />
                ))
              ) : (
                <motion.div
                  variants={fadeInItem}
                  className="card w-full flex flex-col items-center p-4"
                >
                  <span className="content font-bold">
                    {experienceContent[Tab]}
                  </span>
                  <span className="note">{experienceContent.noExperience}</span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
