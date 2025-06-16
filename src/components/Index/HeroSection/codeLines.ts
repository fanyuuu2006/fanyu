import { profile } from "@/libs/profile";
import { CodeItem } from "./CodeCard";
import { LanguageOption } from "@/types/language";
import Link from "next/link";

const indent = (level: number): CodeItem => {
  return {
    label: "  ".repeat(level),
  };
};

export const generateCodeLines = (language: LanguageOption): CodeItem[][] => {
  return [
    [
      {
        label: "const",
        className: "keyword-blue",
      },
      {
        label: " ",
      },
      {
        label: profile.nickname.english,
        className: "constant",
      },
      {
        label: " ",
      },
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
      {
        label: " ",
      },
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
      {
        label: " ",
      },
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
      {
        label: " ",
      },
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
    ],
    [
      {
        label: "  ",
      }, // 縮排
      {
        label: `hobbies:`,
        className: "variable",
      },
      {
        label: " ",
      },
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
      {
        label: " ",
      },
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
        label: `'Next.js'`,
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
      {
        label: " ",
      },
      {
        label: "as",
        className: "keyword-purple",
      },
      {
        label: " ",
      },
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
