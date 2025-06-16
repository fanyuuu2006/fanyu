import { profile } from "@/libs/profile";
import { CodeItem } from "./CodeCard";
import { LanguageOption } from "@/types/language";
import Link from "next/link";

const whiteSpace = (count: number = 1): CodeItem => {
  return {
    label: " ".repeat(count),
  };
};

const indent = (level: number = 1): CodeItem => {
  return whiteSpace(level * 2);
};

export const generateCodeLines = (language: LanguageOption): CodeItem[][] => {
  return [
    [
      {
        label: "const",
        className: "keyword-blue",
      },
      whiteSpace(1),
      {
        label: profile.nickname.english,
        className: "constant",
      },
      whiteSpace(1),
      {
        label: "=",
        className: "operator",
      },
      {
        label: " {",
        className: "brackets-1",
      },
    ],
    [
      indent(1),
      {
        label: `name:`,
        className: "variable",
      },
      whiteSpace(1),
      {
        label: `'${profile.name[language]}'`,
        className: "string",
      },
      {
        label: ",",
      },
    ],
    [
      indent(1),

      {
        label: `nickname:`,
        className: "variable",
      },
      whiteSpace(1),
      {
        label: `'${profile.nickname[language]}'`,
        className: "string",
      },
      {
        label: ",",
      },
    ],
    [
      indent(1),
      {
        label: `age:`,
        className: "variable",
      },
      whiteSpace(1),
      {
        label: `${profile.age()}`,
        className: "number",
        tag: Link,
        props: {
          href: "/my",
        },
      },
      {
        label: ",",
      },
      whiteSpace(1),
      {
        label: `// <-${
          {
            chinese: "點看看",
            english: "Try to click",
          }[language]
        }🤫`,
        className: "comment",
      },
    ],
    [
      {
        label: "  ",
      }, // 縮排
      {
        label: `hobbies:`,
        className: "variable",
      },
      whiteSpace(1),
      {
        label: "[",
        className: "brackets-2",
      },
      {
        label: `'${
          {
            chinese: "寫程式",
            english: "Coding",
          }[language]
        }'`,
        className: "string",
      },
      {
        label: ", ",
      },
      {
        label: `'${
          {
            chinese: "繪畫",
            english: "Drawing",
          }[language]
        }'`,
        className: "string",
      },
      {
        label: "]",
        className: "brackets-2",
      },
      {
        label: ",",
      },
    ],
    [
      {
        label: "  ",
      }, // 縮排
      {
        label: `skills:`,
        className: "variable",
      },
      whiteSpace(1),
      {
        label: "[",
        className: "brackets-2",
      },
      {
        label: `'TypeScript'`,
        className: "string",
      },
      {
        label: ", ",
      },
      {
        label: `'React'`,
        className: "string",
      },
      {
        label: ", ",
      },
      {
        label: `'Python'`,
        className: "string",
      },
      {
        label: "]",
        className: "brackets-2",
      },
      {
        label: ",",
      },
    ],
    [
      {
        label: "}",
        className: "brackets-1",
      },
      whiteSpace(1),
      {
        label: "as",
        className: "keyword-purple",
      },
      whiteSpace(1),
      {
        label: "const",
        className: "type",
      },
      {
        label: ";",
      },
    ],
  ];
};
