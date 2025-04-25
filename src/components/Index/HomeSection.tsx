"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { OutsideLink } from "fanyucomponents";

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
        intro: "一名熱愛編程的大學生開發者",
        coding: "編程",
        drawing: "繪畫",
      },
      english: {
        hello: "Hello,",
        iAm: "I'm ",
        intro: "A passionate coding student developer.",
        coding: "Coding",
        drawing: "Drawing",
      },
    } as LanguageContent<HomeContent>
  )[language]);

export const HomeSection = () => {
  const Language = useLanguage();

  const homeContent = getHomeContent(Language.Current);

  const codeLines: string[] = [
    "const FanYu = {",
    `    name: ${profile[Language.Current].name},`,
    `    age: ${
      new Date().getFullYear() - new Date(profile.birthday).getFullYear()
    },`,
    `    Interests: ['${homeContent.coding}', '${homeContent.drawing}'],`,
    "} as const;",
  ];

  return (
    <section id="home">
      <div className="container d-flex justify-center" style={{ gap: "1em" }}>
        <div
          className="d-flex flex-column align-items-center justify-center"
          style={{
            flexGrow: 1,
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
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-center"
          style={{ width: "50%" }}
        >
          <pre
            className="card shadow"
            style={{
              padding: "1.5em",
              fontFamily: "Montserrat, sans-serif",
              overflow: "auto",
            }}
          >
            <p className="hint">TypeScript</p>
            <code className="note">
              {codeLines.map((line, index) => (
                <div key={index}>
                  <span style={{ color: "#888" }}>{index + 1}</span> {line}
                </div>
              ))}
            </code>
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
