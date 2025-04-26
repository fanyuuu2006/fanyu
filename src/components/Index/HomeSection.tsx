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
import { OutsideLink } from "fanyucomponents";
import { Toast } from "../common/Toast";

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
        intro: "一名熱愛寫程式的大學生開發者",
        coding: "寫程式",
        drawing: "繪畫",
      },
      english: {
        hello: "Hello,",
        iAm: "I'm ",
        intro: "A student developer who loves coding",
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
    `  name: '${profile[Language.Current].name}',`,
    `  nickname: '${profile[Language.Current].nickname}',`,
    `  age: ${
      new Date().getFullYear() - new Date(profile.birthday).getFullYear()
    },`,
    `  interests: ['${homeContent.coding}', '${homeContent.drawing}'],`,
    "} as const;",
  ];

  return (
    <section id="home">
      <div
        className="container d-flex justify-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="card-glass d-flex flex-column align-items-center justify-center"
          style={{
            width: "50%",
            padding: "1em",
            gap: "1em",
          }}
        >
          <div>
            <div className="label text-bold">{homeContent.hello}</div>
            <div className="title text-bold">
              {homeContent.iAm}
              {profile[Language.Current].nickname}❗
            </div>
            <div className="note">{homeContent.intro}</div>
            <div
              className="label d-flex"
              style={{
                gap: "0.5em",
              }}
            >
              {links.map((item) => (
                <Tooltip key={item.label} title={item.label} placement="bottom">
                  <OutsideLink href={item.href}>{item.icon}</OutsideLink>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-center flex-grow"
        >
          <pre
            className="card shadow bordered"
            style={{
              maxWidth: "100%",
              padding: "1.5em",
              overflow: "auto",
            }}
          >
            <div className="hint d-flex">
              <span>TypeScript</span>
              <button
                className="btn text-center"
                style={{
                  marginLeft: "auto",
                  width: "1.5em",
                  borderRadius: "10%",
                }}
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
            <div className="note d-flex flex-column text-bold">
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className="d-flex"
                  style={{ flexWrap: "nowrap", gap: "0.5em" }}
                >
                  <span style={{ color: "#888", userSelect: "none" }}>
                    {index + 1}
                  </span>
                  <code
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {line}
                  </code>
                </div>
              ))}
            </div>
          </pre>
        </div>
      </div>
    </section>
  );
};

/* <Image
  loading="lazy"
  src="/CampPhoto.jpg"
  className="bordered shadow"
  width={1080}
  height={1080}
  alt="Camp Photo"
  style={{
    width: "300px",
    height: "auto",
    borderRadius: "100%",
  }}
/> */
