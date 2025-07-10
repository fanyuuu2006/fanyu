"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import React from "react";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { SkillCategory } from "@/types/skill";
import { skillCategoryIcons } from "@/libs/skill";
import { profile } from "@/libs/profile";
import { useInViewUnderlineSpread } from "@/hooks/useInViewUnderlineSpread";

type SkillsContent = Record<"skills" | SkillCategory, string>;

const getSkillsContent = (language: LanguageOption): SkillsContent =>
  ((
    {
      chinese: {
        skills: "技能",
        frontend: "前端",
        backend: "後端",
        devtools: "開發工具",
      },
      english: {
        skills: "Skills",
        frontend: "Frontend",
        backend: "Backend",
        devtools: "Development tools",
      },
    } as LanguageContent<SkillsContent>
  )[language]);

export const SkillsSection = () => {
  const Language = useLanguage();
  const skillsContent = getSkillsContent(Language.Current);
  const ref = useInViewUnderlineSpread<HTMLHeadingElement>();

  return (
    <section id="skills">
      <div className="container flex flex-col items-center">
        <h1 className="text-5xl font-bold" ref={ref}>
          {skillsContent.skills}
        </h1>
        <motion.div
          variants={staggerContainer}
          initial="hiddenBottom"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col w-full gap-4"
        >
          {Object.entries(profile.skills).map(([category, items]) => (
            <motion.div variants={fadeInItem} key={category}>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  {skillCategoryIcons[category as SkillCategory]}
                  {skillsContent[category as SkillCategory]}:
                </h2>
                <motion.div
                  variants={staggerContainer}
                  className="text-2xl flex flex-wrap"
                >
                  {items.map((item) => (
                    <div
                      key={item.title}
                      data-tooltip={item.title}
                      className="tooltip text-sm md:text-base font-semibold p-1 w-1/7 sm:w-1/10 md:w-1/13 lg:w-1/17 xl:w-1/20"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        alt={item.title}
                        src={item.src}
                        width={300}
                        height={300}
                        className="object-cover transition-transform"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
