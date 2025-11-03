"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/libs/profile";
import { TypeWriterText } from "fanyucomponents";
import { motion } from "framer-motion";
import { fadeInItem } from "@/libs/motion";
import Link from "next/link";
import { CodeCard } from "../../custom/CodeCard";
import { useMemo } from "react";
import c063 from "c063";
import { LanguageOption, LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";

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
        c063.variable(`  nickname`, 
          {
            as: "span",
          }
        ),
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
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-screen")}>
          <div className="flex flex-col items-center justify-center p-4 gap-2">
            <div className="flex flex-col gap-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold">
                {heroContent.hello}
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold ">
                {heroContent.iAm}
                <span className="bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
                  {profile.nickname[Language.Current]}
                </span>
                ❗
              </h1>
              <TypeWriterText
                className="text-base md:text-lg lg:text-xl text-[var(--text-color-muted)]"
                speed={heroContent.intro.length * 1.5}
              >
                {heroContent.intro}
              </TypeWriterText>
              <div className="text-lg md:text-xl lg:text-2xl flex flex-col md:flex-row gap-4 mt-2">
                {[
                  {
                    href: "/#contact",
                    label: heroContent.contactMe,
                    className: "btn-primary",
                  },
                  {
                    href: "/#portfolio",
                    label: heroContent.portfolio,
                    className: "btn-tertiary",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "w-full md:w-fit flex items-center justify-center px-6 py-3 font-semibold rounded-full",
                      item.className
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <motion.div
              variants={fadeInItem}
              initial="hiddenBottom"
              whileInView="show"
              viewport={{ once: true }}
            >
              <CodeCard
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                lang="typescript"
                codeLines={codeLines}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
