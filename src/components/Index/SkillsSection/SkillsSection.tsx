"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import React from "react";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { SkillCategory } from "@/types/skill";
import { profile } from "@/libs/profile";
import { Title } from "@/components/custom/Title";
import { Tooltip } from "antd";
import { MyImage } from "@/components/custom/MyImage";

const SKILLS_CONTENT: LanguageContent<
  Record<"skills" | SkillCategory, string>
> = {
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
};

export const SkillsSection = () => {
  const Language = useLanguage();
  const skillsContent = SKILLS_CONTENT[Language.Current];

  return (
    <section id="skills">
      <div className="container flex flex-col items-center">
        <Title>{skillsContent.skills}</Title>
        <motion.div
          variants={staggerContainer}
          initial="hiddenBottom"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col w-full gap-4"
        >
          {Object.entries(profile.skills).map(([category, item]) => (
            <motion.div variants={fadeInItem} key={category}>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <item.icon />
                  {skillsContent[category as SkillCategory]}:
                </h2>
                <motion.div
                  variants={staggerContainer}
                  className="text-2xl grid grid-cols-6 sm:grid-cols-10 md:grid-cols-13 lg:grid-cols-16 xl:grid-cols-20 gap-3"
                >
                  {item.list.map((skillItem) => (
                    <motion.div key={skillItem.title} variants={fadeInItem}>
                      <Tooltip title={skillItem.title} placement="top">
                        <MyImage
                          alt={skillItem.title}
                          src={skillItem.src}
                          srcArray={skillItem.srcArray}
                          width={300}
                          height={300}
                          className="object-cover transition-transform"
                        />
                      </Tooltip>
                    </motion.div>
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
