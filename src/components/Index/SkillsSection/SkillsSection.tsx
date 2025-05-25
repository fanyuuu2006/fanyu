"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Tooltip } from "antd";
import React from "react";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { SkillCategory } from "@/types/skill";
import { skillCategoryIcons } from "@/lib/skill";
import { profile } from "@/lib/profile";

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
  return (
    <section id="skills">
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{skillsContent.skills}</div>
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
                    className="p-2 w-1/6 sm:w-1/8 md:w-1/12 lg:w-1/15"
                  >
                    <Tooltip title={item.title}>
                      <Image
                        draggable={false}
                        alt={item.title}
                        src={item.src}
                        width={300}
                        height={300}
                        className="w-full h-fit"
                      />
                    </Tooltip>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        {/* <motion.img
          variants={fadeInItem}
          initial="hiddenBottom"
          whileInView="show"
          viewport={{ once: true }}
          src="https://github-readme-stats.vercel.app/api/top-langs?username=fanyuuu2006&layout=compact&langs_count=100"
          alt="Most Used Languages"
        /> */}
      </div>
    </section>
  );
};
