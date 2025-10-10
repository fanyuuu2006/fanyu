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
            <div className="relative group">
              <Link
                className="block card overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square w-80 sm:w-96 md:w-80 lg:w-72 xl:w-80"
                href="/#top"
              >
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="個人照片"
                  src="/GameShow.jpg"
                  width={400}
                  height={400}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* 文章內容卡片 */}
          <motion.article
            variants={staggerContainer}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="card p-8 md:p-10 lg:p-8 xl:p-10 flex flex-col flex-1 xl:w-3/5 lg:w-1/2 space-y-4"
          >
            {aboutMeContent.article.map((part, index) => (
              <motion.p
                key={index}
                variants={fadeInItem}
                className={`text-base md:text-lg lg:text-base xl:text-lg leading-relaxed text-gray-200 ${
                  index === 0
                    ? "text-justify indent-8 first-letter:text-2xl first-letter:font-bold first-letter:text-[var(--text-color-primary)]"
                    : "text-justify indent-8"
                }`}
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
