"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  CopyOutlined,
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { OutsideLink, TypeWriterText } from "fanyucomponents";
import { Toast } from "../../common/Toast";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";

type HeroContent = Record<
  "hello" | "iAm" | "intro" | "coding" | "drawing",
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
      },
      english: {
        hello: "Hello,",
        iAm: "I'm ",
        intro: "A student developer who loves coding.",
        coding: "Coding",
        drawing: "Drawing",
      },
    } as LanguageContent<HeroContent>
  )[language]);

const links: {
  label: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    label: "GitHub",
    icon: <GithubOutlined />,
    href: "https://github.com/fanyuuu2006",
  },
  {
    label: "Instagram",
    icon: <InstagramOutlined />,
    href: "https://www.instagram.com/fan._.yuuu",
  },
  {
    label: "E-Mail",
    icon: <MailOutlined />,
    href: "mailto:bingxiao526@gmail.com",
  },
];

export const HeroSection = () => {
  const Language = useLanguage();

  const heroContent: HeroContent = getHeroContent(Language.Current);

  const codeLines: string[] = [
    "const FanYu = {",
    `  name: '${profile.name[Language.Current]}',`,
    `  nickname: '${profile.nickname[Language.Current]}',`,
    `  age: ${profile.age()},`,
    `  hobbies: ['${heroContent.coding}', '${heroContent.drawing}'],`,
    "  skills: ['TypeScript', 'Next.js', 'Python'],",
    "} as const;",
  ];

  return (
    <section id="hero">
      <div className="container flex flex-wrap justify-center min-h-162 gap-0">
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
            <div className="label flex gap-4">
              {links.map((item) => (
                <Tooltip key={item.label} title={item.label} placement="bottom">
                  <OutsideLink href={item.href}>{item.icon}</OutsideLink>
                </Tooltip>
              ))}
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
            <div className="hint flex">
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
                    className="font-mono whitespace-pre-wrap"
                  >
                    {line}
                  </motion.code>
                </div>
              ))}
            </motion.pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
