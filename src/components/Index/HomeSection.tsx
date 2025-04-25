"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { OutsideLink } from "fanyucomponents";

export const HomeSection = () => {
  const Language = useLanguage();

  const codeLines: string[] = [
    "const Fanyu = {",
    `    name: ${profile[Language.Current].name},`,
    `    age: ${
      new Date().getFullYear() - new Date(profile.birthday).getFullYear()
    },`,
    `    Interests: ['${
      { chinese: "編程", english: "Coding" }[Language.Current]
    }', '${{ chinese: "繪畫", english: "Drawing" }[Language.Current]}'],`,
    "} as const",
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
            <div className="label text-bold">
              {{ chinese: "哈囉，", english: "Hello," }[Language.Current]}
            </div>
            <div className="title text-bold">
              {{ chinese: "我是", english: "I'm " }[Language.Current]}
              {profile[Language.Current].nickname}❗
            </div>
            <div className="note">
              {
                {
                  chinese: "一名熱愛編程的大學生開發者",
                  english: "A passionate coding student developer.",
                }[Language.Current]
              }
            </div>
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
