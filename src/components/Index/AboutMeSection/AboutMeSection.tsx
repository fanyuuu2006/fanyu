"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import Link from "next/link";
import { Title } from "@/components/custom/Title";

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

  return (
    <section id="aboutMe">
      <div className="container flex flex-col items-center gap-8">
        <Title>{aboutMeContent.aboutMe}</Title>

        <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">
          {/* 個人照片卡片 */}
          <motion.div
            variants={fadeInItem}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center items-center flex-shrink-0 w-full lg:w-1/3"
          >
            <Link
              className="w-72 h-72 card overflow-hidden rounded-xl"
              href="/#top"
            >
              <Image
                className="w-full h-full object-cover"
                alt="個人照片"
                src="/GameShow.jpg"
                width={320}
                height={320}
                priority
              />
            </Link>
          </motion.div>

          {/* 文章內容卡片 */}
          <motion.article
            variants={staggerContainer}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="card p-6 md:p-8 flex flex-col flex-1 lg:w-2/3 space-y-6"
          >
            {aboutMeContent.article.map((part, index) => (
              <motion.p
                key={index}
                variants={fadeInItem}
                className="text-base md:text-lg leading-relaxed text-justify indent-8"
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
