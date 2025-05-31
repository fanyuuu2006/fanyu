"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { CopyOutlined } from "@ant-design/icons";
import { TypeWriterText } from "fanyucomponents";
import { Toast } from "../../custom/Toast";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

type HeroContent = Record<
  "hello" | "iAm" | "intro" | "coding" | "drawing" | "contactMe" | "portfolio",
  string
>;

const getHeroContent = (language: LanguageOption): HeroContent =>
  ((
    {
      chinese: {
        hello: "哈囉，",
        iAm: "我是",
        intro: "一名熱愛寫程式的學生開發者。",
        coding: "寫程式",
        drawing: "繪畫",
        contactMe: "聯繫我",
        portfolio: "作品集",
      },
      english: {
        hello: "Hello,",
        iAm: "I'm ",
        intro: "A student developer who loves coding.",
        coding: "Coding",
        drawing: "Drawing",
        contactMe: "Contact Me",
        portfolio: "Portfolio",
      },
    } as LanguageContent<HeroContent>
  )[language]);

export const HeroSection = () => {
  const router = useRouter();
  const Language = useLanguage();

  const heroContent: HeroContent = getHeroContent(Language.Current);

  const codeLines: {
    label: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
  }[] = [
    {
      label: "const FanYu = {",
    },
    { label: `  name: '${profile.name[Language.Current]}',` },
    { label: `  nickname: '${profile.nickname[Language.Current]}',` },
    {
      label: `  age: ${profile.age()},`,
      onClick: () => {
        router.push("/my");
      },
    },
    {
      label: `  hobbies: ['${heroContent.coding}', '${heroContent.drawing}'],`,
    },
    { label: "  skills: ['TypeScript', 'Next.js', 'Python']," },
    { label: "} as const;" },
  ];

  return (
    <section id="hero">
      <div className="container">
        <div className="flex flex-wrap justify-center min-h-162 gap-0">
          <div className="flex flex-col items-center justify-center p-4 gap-4 w-full md:w-24/50">
            <div>
              <div className="label font-bold">{heroContent.hello}</div>
              <div className="title font-bold">
                {heroContent.iAm}
                {profile.nickname[Language.Current]}❗
              </div>
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
                <Link href="/#portfolio" className="btn px-4 py-2 rounded-lg">
                  {heroContent.portfolio}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-24/50">
            <motion.div
              variants={fadeInItem}
              initial="hiddenBottom"
              whileInView="show"
              viewport={{ once: true }}
              className="card p-6 overflow-auto"
            >
              <div className="hint flex items-center">
                <span>TypeScript</span>
                <button
                  className="btn flex items-center justify-center ml-auto w-6 h-6 rounded-sm"
                  onClick={async () => {
                    await navigator.clipboard
                      .writeText(codeLines.join("\n"))
                      .then(() => {
                        Toast.fire({
                          icon: "success",
                          text: "已複製到剪貼簿",
                        });
                      })
                      .catch((err) => {
                        console.error("複製代碼失敗", err);
                        Toast.fire({ icon: "error", text: "複製代碼失敗" });
                      });
                  }}
                >
                  <CopyOutlined />
                </button>
              </div>
              <motion.pre
                variants={staggerContainer}
                initial="hiddenLeft"
                whileInView="show"
                viewport={{ once: true }}
                className="note flex flex-col font-bold"
              >
                {codeLines.map((line, index) => (
                  <div key={index} className="flex flex-nowrap gap-2">
                    <span className="text-[#888] select-none">{index + 1}</span>
                    <motion.code
                      variants={fadeInItem}
                      className={`whitespace-pre-wrap ${
                        line.onClick
                          ? "cursor-pointer hover:text-[var(--text-color-primary)]"
                          : ""
                      }`}
                      {...(line.onClick
                        ? {
                            onClick: line.onClick,
                          }
                        : {})}
                    >
                      {line.label}
                    </motion.code>
                  </div>
                ))}
              </motion.pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
