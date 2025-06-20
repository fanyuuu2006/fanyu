"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Tooltip } from "antd";
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
        <h1 className="title font-bold" ref={ref}>
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
              <div className="content font-bold flex items-center gap-2">
                {skillCategoryIcons[category as SkillCategory]}
                {skillsContent[category as SkillCategory]}:
              </div>
              <motion.div
                variants={staggerContainer}
                className="label flex flex-wrap"
              >
                {items.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeInItem}
                    className="p-2 w-1/7 sm:w-1/10 md:w-1/13 lg:w-1/17"
                  >
                    <Tooltip title={item.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        alt={item.title}
                        src={item.src}
                        width={300}
                        height={300}
                        className="object-cover transition-transform hover:-translate-y-2 hover:scale-110"
                      />
                    </Tooltip>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        {/* <motion.div
          variants={fadeInItem}
          initial="hiddenBottom"
          whileInView="show"
          viewport={{ once: true }}
          className="card w-full p-4"
        >
          <div></div>
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs?username=fanyuuu2006&layout=compact&langs_count=100&locale=${
              Language.Current == "chinese" ? "zh-tw" : "en"
            }`}
            alt="Most Used Languages"
            className='object-cover'
          />
        </motion.div> */}
      </div>
    </section>
  );
};
