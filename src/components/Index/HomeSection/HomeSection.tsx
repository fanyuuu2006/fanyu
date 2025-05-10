"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import {
  CopyOutlined,
  GithubOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { OutsideLink, TypeWriterText } from "fanyucomponents";
import { Toast } from "../../common/Toast";

type HomeContent = Record<
  "hello" | "iAm" | "intro" | "coding" | "drawing",
  string
>;

const getHomeContent = (language: LanguageOption): HomeContent =>
  ((
    {
      chinese: {
        hello: "哈囉，",
        iAm: "我是",
        intro: "一名熱愛寫程式的大學生開發者。",
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
    } as LanguageContent<HomeContent>
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
];

export const HomeSection = () => {
  const Language = useLanguage();

  const homeContent: HomeContent = getHomeContent(Language.Current);

  const codeLines: string[] = [
    "const FanYu = {",
    `  name: '${profile.name[Language.Current]}',`,
    `  nickname: '${profile.nickname[Language.Current]}',`,
    `  age: ${Math.floor(
      (new Date().getTime() - new Date(profile.birthday).getTime()) /
        (365.25 * 24 * 60 * 60 * 1000)
    )},`,
    `  hobbies: ['${homeContent.coding}', '${homeContent.drawing}'],`,
    "  skills: ['TypeScript', 'Next.js', 'Python'],",
    "} as const;",
  ];

  return (
    <section id="home">
      <div className="container flex flex-wrap justify-center min-h-162">
        <div className="card-glass flex flex-col items-center justify-center flex-grow p-4 gap-4">
          <div>
            <div className="label font-bold">{homeContent.hello}</div>
            <div className="title font-bold">
              {homeContent.iAm}
              {profile.nickname[Language.Current]}❗
            </div>
            <TypeWriterText className="note">
              {homeContent.intro}
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
        <div className="flex flex-col items-center justify-center flex-grow">
          <pre className="card shadow bordered p-6 overflow-auto">
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
            <div className="note flex flex-col font-bold">
              {codeLines.map((line, index) => (
                <div key={index} className="flex flex-nowrap gap-2">
                  <span className="text-[#888] select-none">{index + 1}</span>
                  <code className="font-mono whitespace-pre-wrap">{line}</code>
                </div>
              ))}
            </div>
          </pre>
        </div>
      </div>
    </section>
  );
};
