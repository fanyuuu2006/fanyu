"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { useInViewUnderlineSpread } from "@/hooks/useInViewUnderlineSpread";
import Link from "next/link";

type AboutMeContent = {
  aboutMe: string;
  article: string[];
};

const getAboutMeContent = (language: LanguageOption): AboutMeContent =>
  ((
    {
      chinese: {
        aboutMe: "關於我",
        article: [
          "我的名字是范余振富，一位對程式設計與軟體開發充滿熱情的開發者。從小喜歡玩 Minecraft 這款遊戲，並在其中建造了各式各樣的紅石機關，這段經驗培養了我對邏輯與創造力的熱愛。",
          "高中時，我接觸到 App Inventor，並運用過去在紅石機關中累積的邏輯思維，嘗試開發了一款小型遊戲，從此對程式設計領域漸漸產生了興趣。",
          "目前，我就讀於國立臺灣科技大學，自大一購入了第一台屬於自己的筆記型電腦後，便開始自學前端與後端技術，並學習各種程式語言與開發工具。",
          "雖然目前仍在學習的道路上，但我始終保持著高度的熱情，並持續不斷地探索與累積軟體開發的相關知識，期許自己未來能成為一位能夠獨當一面的開發者。",
        ],
      },
      english: {
        aboutMe: "About Me",
        article: [
          "My name is Fan-Yu Zhen-Fu, a passionate developer who loves programming and software development. Since I was young, I enjoyed playing Minecraft, where I built various redstone contraptions. This experience nurtured my love for logic and creativity.",
          "In high school, I was introduced to App Inventor and applied the logical thinking I had developed through redstone to create a small game, which gradually sparked my interest in programming.",
          "I am currently studying at National Taiwan University of Science and Technology. After buying my first personal laptop in my freshman year, I began self-learning both frontend and backend development, along with various programming languages and tools.",
          "Although I'm still on the path of learning, I remain highly enthusiastic and continue to explore and expand my knowledge in software development. My goal is to one day become a capable and independent developer.",
        ],
      },
    } as LanguageContent<AboutMeContent>
  )[language]);

export const AboutMeSection = () => {
  const Language = useLanguage();

  const aboutMeContent: AboutMeContent = getAboutMeContent(Language.Current);

  const ref = useInViewUnderlineSpread<HTMLHeadingElement>();

  return (
    <section id="aboutMe">
      <div className="container flex flex-col items-center gap-8">
        <h1 ref={ref} className="text-5xl font-bold text-center">
          {aboutMeContent.aboutMe}
        </h1>

        <div className="w-full flex flex-col lg:flex-row gap-4 items-center">
          {/* 個人照片卡片 - 佔 1/4 比例 */}
          <motion.div
            variants={fadeInItem}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center items-start flex-shrink-0 w-full lg:w-1/4"
          >
            <Link
              className="w-64 h-64 max-w-80 max-h-80 card overflow-hidden"
              href="#"
            >
              <Image
                className="w-full h-full object-cover"
                alt="個人照片"
                src="/GameShow.jpg"
                width={300}
                height={300}
                priority
              />
            </Link>
          </motion.div>

          {/* 文章內容卡片 - 佔 3/4 比例 */}
          <motion.article
            variants={staggerContainer}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="card p-2  md:p-3 xl:p-4 flex flex-col flex-1 overflow-hidden lg:w-3/4"
          >
            {aboutMeContent.article.map((part, index) => (
              <motion.p
                key={index}
                variants={fadeInItem}
                className="text-base md:text-lg text-justify leading-tight indent-8 p-3 rounded-lg transition-colors duration-200"
              >
                {part}
              </motion.p>
            ))}
          </motion.article>
        </div>
      </div>
    </section>
  );
};
