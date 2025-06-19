"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/libs/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { TypeWriterText } from "fanyucomponents";
import { motion } from "framer-motion";
import { fadeInItem } from "@/libs/motion";
import Link from "next/link";
import { CodeCard } from "./CodeCard";
import { useMemo } from "react";
import { generateCodeLines } from "./codeLines";

type HeroContent = Record<
  "hello" | "iAm" | "intro" | "contactMe" | "portfolio",
  string
>;

const getHeroContent = (language: LanguageOption): HeroContent =>
  ((
    {
      chinese: {
        hello: "哈囉，",
        iAm: "我是",
        intro: "一名熱愛寫程式的學生開發者。",
        contactMe: "聯繫我",
        portfolio: "作品集",
      },
      english: {
        hello: "Hello,",
        iAm: "I'm ",
        intro: "A student developer who loves coding.",
        contactMe: "Contact Me",
        portfolio: "Portfolio",
      },
    } as LanguageContent<HeroContent>
  )[language]);

export const HeroSection = () => {
  const Language = useLanguage();

  const heroContent: HeroContent = getHeroContent(Language.Current);

  const codeLines = useMemo(() => {
    return generateCodeLines(Language.Current);
  }, [Language.Current]);

  return (
    <section id="hero">
      <div className="container">
        <div className="flex flex-wrap justify-center min-h-162">
          <div className="flex flex-col items-center justify-center p-4 gap-4 w-full lg:w-24/50">
            <div className="text-white">
              <div className="label font-bold">{heroContent.hello}</div>
              <h1 className="title font-bold ">
                {heroContent.iAm}
                {profile.nickname[Language.Current]}❗
              </h1>
              <TypeWriterText
                className="note"
                speed={heroContent.intro.length * 1.5}
              >
                {heroContent.intro}
              </TypeWriterText>
              <div className="note flex gap-4 mt-4">
                <Link
                  href="/#contact"
                  className="btn-primary px-4 py-2 rounded-lg"
                >
                  {heroContent.contactMe}
                </Link>
                <Link
                  href="/#portfolio"
                  className="btn-secondary px-4 py-2 rounded-lg"
                >
                  {heroContent.portfolio}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full lg:w-24/50">
            <motion.div
              variants={fadeInItem}
              initial="hiddenBottom"
              whileInView="show"
              viewport={{ once: true }}
            >
              <CodeCard codeLines={codeLines} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
