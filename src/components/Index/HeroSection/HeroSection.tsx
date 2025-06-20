"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/libs/profile";
import { TypeWriterText } from "fanyucomponents";
import { motion } from "framer-motion";
import { fadeInItem } from "@/libs/motion";
import Link from "next/link";
import { CodeCard } from "../../custom/CodeCard";
import { useMemo } from "react";
import c063 from "c063";
import { LanguageOption, LanguageContent } from "@/types/language";

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
    return [
      [
        c063.keyword1("const "),
        c063.constant(profile.nickname.english),
        c063.operator(" = "),
        c063.brackets1("{"),
      ],
      [
        c063.variable(`  name`),
        c063.default(": "),
        c063.string(`'${profile.name[Language.Current]}'`),
        c063.default(","),
      ],
      [
        c063.variable(`  nickname`),
        c063.default(": "),
        c063.string(`'${profile.nickname[Language.Current]}'`),
        c063.default(","),
      ],
      [
        c063.variable(`  age`),
        c063.default(": "),
        c063.number(`${profile.age()}`, {
          as: Link,
          href: "/my",
        }),
        c063.default(", "),
        c063.comment(
          `// <-${
            {
              chinese: "可以點ㄛ",
              english: "Could be clicked",
            }[Language.Current]
          }🤫`
        ),
      ],
      [
        c063.variable(`  hobbies`),
        c063.default(": "),
        c063.brackets2("["),
        c063.string(
          `'${
            {
              chinese: "寫程式",
              english: "Coding",
            }[Language.Current]
          }'`
        ),
        c063.default(", "),
        c063.string(
          `'${
            {
              chinese: "繪畫",
              english: "Drawing",
            }[Language.Current]
          }'`
        ),
        c063.brackets2("]"),
        c063.default(","),
      ],
      [
        c063.variable(`  skills`),
        c063.default(": "),
        c063.brackets2("["),
        c063.string(`'TypeScript'`),
        c063.default(", "),
        c063.string(`'React'`),
        c063.default(", "),
        c063.string(`'Python'`),
        c063.brackets2("]"),
        c063.default(","),
      ],
      [
        c063.brackets1("} "),
        c063.keyword2("as "),
        c063.type("const"),
        c063.default(";"),
      ],
      [
        c063.keyword2("export default "),
        c063.constant("FanYu"),
        c063.default(";"),
      ],
    ];
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
              <div className="content flex gap-4 mt-4">
                <Link
                  href="/#contact"
                  className="btn-primary px-6 py-2 rounded-2xl"
                >
                  {heroContent.contactMe}
                </Link>
                <Link
                  href="/#portfolio"
                  className="btn-secondary px-6 py-2 rounded-2xl"
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
              <CodeCard className="note" lang="typescript" codeLines={codeLines} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
