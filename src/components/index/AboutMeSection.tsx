"use client";
import { c063 } from "c063";
import Link from "next/link";
import { useMemo } from "react";
import { CodeCard } from "../CodeCard";
import { cn } from "@/utils/className";
import { IndexSection } from "./IndexSection";

const PARAGRAPHS = [
  "我的名字是范余振富，對程式設計與軟體開發抱有濃厚興趣。從小喜歡玩 Minecraft，也熱衷於研究各種紅石機關，這些經驗讓我逐漸培養出對邏輯思考與創作的熱情。",

  "高中時接觸到 App Inventor，並嘗試開發自己的第一款小遊戲。從構想到實作的過程，讓我開始真正認識程式設計的魅力。",

  "目前就讀於國立臺灣科技大學，自大一開始便利用課餘時間自學前端、後端開發以及各種程式語言與工具，持續探索軟體開發領域。",

  "我仍在學習的路上，但始終保持對新技術的好奇與熱情，希望透過不斷實作與累積經驗，讓自己一步步成長為更成熟的開發者。",
];

export const AboutMeSection = () => {
  const codeLines = useMemo(() => {
    const birthday = new Date("2006-05-26");
    const age =
      new Date().getFullYear() -
      birthday.getFullYear() -
      Number(
        new Date().getMonth() < birthday.getMonth() ||
          (new Date().getMonth() === birthday.getMonth() &&
            new Date().getDate() < birthday.getDate()),
      );

    return [
      [
        c063.keyword1("const "),
        c063.constant("FanYu"),
        c063.operator(" = "),
        c063.brackets1("{"),
      ],
      [
        c063.variable(`  name`),
        c063.default(": "),
        c063.string(`'范余振富'`),
        c063.default(","),
      ],
      [
        c063.variable(`  nickname`),
        c063.default(": "),
        c063.string(`'飯魚'`),
        c063.default(","),
      ],
      [
        c063.variable(`  age`),
        c063.default(": "),
        c063.number(`${age}`, {
          as: Link,
          href: "/#aboutMe",
        }),
        c063.default(", "),
        c063.comment(`// <-可以點喔🤫`),
      ],
      [
        c063.variable(`  hobbies`),
        c063.default(": "),
        c063.brackets2("["),
        c063.string(`'寫程式'`),
        c063.default(", "),
        c063.string(`'繪畫'`),
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
  }, []);

  return (
    <IndexSection id="aboutMe" title="關於我">
      <div className="w-full grid lg:grid-cols-[1fr_auto] gap-4 p-4">
        <article className="flex flex-col gap-4 p-4 md:p-6 lg:p-8">
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className={cn(
                "text-justify indent-8 text-base sm:text-lg md:text-xl text-(--muted) leading-relaxed",
                {
                  "first-letter:text-3xl first-letter:font-bold first-letter:text-(--text-color-primary) first-letter:mr-1":
                    i === 0,
                },
              )}
            >
              {p}
            </p>
          ))}
        </article>
        <div className="flex items-center justify-center">
          <CodeCard
            codeLines={codeLines}
            lang="typescript"
            className="w-full text-sm sm:text-base md:text-lg lg:text-xl"
          />
        </div>
      </div>
    </IndexSection>
  );
};
