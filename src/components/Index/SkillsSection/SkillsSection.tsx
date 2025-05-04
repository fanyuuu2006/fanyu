"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Tooltip } from "antd";
import React from "react";

type SkillCategory = "frontend" | "backend" | "devtools";
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

const skillItems: Record<SkillCategory, { src: string; title: string }[]> = {
  frontend: [
    {
      title: "TypeScript",
      src: "/Skills/typescript.svg",
    },
    {
      title: "JavaScript",
      src: "/Skills/javascript.svg",
    },

    {
      title: "HTML 5",
      src: "/Skills/html.svg",
    },
    {
      title: "CSS 3",
      src: "/Skills/css.svg",
    },
    {
      title: "React",
      src: "/Skills/react.svg",
    },
    {
      title: "Next.js",
      src: "/Skills/nextjs.svg",
    },
    {
      title: "Ant Design",
      src: "/Skills/antdesign.svg",
    },
    {
      title: "Tailwind CSS",
      src: "/Skills/tailwindcss.svg",
    },
    {
      title: "ESLint",
      src: "/Skills/eslint.svg",
    },
  ],
  backend: [
    { title: "Node.js", src: "/Skills/nodejs.svg" },
    { title: "Express", src: "/Skills/express.svg" },
    { title: "Python", src: "/Skills/python.svg" },
    { title: "Flask", src: "/Skills/flask.svg" },
  ],
  devtools: [
    {
      title: "Git",
      src: "/Skills/git.svg",
    },
    {
      title: "Visual Studio Code",
      src: "/Skills/vscode.svg",
    },
  ],
};

export const SkillsSection = () => {
  const Language = useLanguage();
  const skillsContent = getSkillsContent(Language.Current);
  return (
    <section id="skills">
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{skillsContent.skills}</div>
        <div className="flex flex-col w-full gap-4">
          {Object.entries(skillItems).map(([category, items]) => (
            <div key={category}>
              <div className="content font-bold">
                {skillsContent[category as keyof SkillsContent]}:
              </div>
              <div className="label flex flex-wrap gap-2">
                {items.map((item) => (
                  <Tooltip key={item.title} title={item.title}>
                    <Image
                      draggable={false}
                      alt={item.title}
                      src={item.src}
                      width={300}
                      height={300}
                      className="h-14 w-auto"
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
