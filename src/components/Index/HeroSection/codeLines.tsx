import { profile } from "@/libs/profile";
import { LanguageOption } from "@/types/language";
import c063, { CodeTokenProps, whiteSpace } from "c063";
import Link from "next/link";

export const generateCodeLines = (
  language: LanguageOption
): CodeTokenProps<React.ElementType>[][] => {
  return [
    [
      c063.keyword1("const"),
      whiteSpace(1),
      c063.constant(profile.nickname.english),
      whiteSpace(1),
      c063.operator("="),
      whiteSpace(1),
      c063.brackets1("{"),
    ],
    [
      whiteSpace(2),
      c063.variable(`name:`),
      whiteSpace(1),
      c063.string(`'${profile.name[language]}'`),
      c063.default(","),
    ],
    [
      whiteSpace(2),
      c063.variable(`nickname:`),
      whiteSpace(1),
      c063.string(`'${profile.nickname[language]}'`),
      c063.default(","),
    ],
    [
      whiteSpace(2),
      c063.variable(`age:`),
      whiteSpace(1),
      c063.number(`${profile.age()}`, {
        as: Link,
        href: "/my",
      }),
      c063.default(","),
      whiteSpace(1),
      c063.comment(
        `// <-${
          {
            chinese: "點看看",
            english: "Try to click",
          }[language]
        }🤫`
      ),
    ],
    [
      whiteSpace(2),
      c063.variable(`hobbies:`),
      whiteSpace(1),
      c063.brackets2("["),
      c063.string(
        `'${
          {
            chinese: "寫程式",
            english: "Coding",
          }[language]
        }'`
      ),
      c063.default(","),
      whiteSpace(1),
      c063.string(
        `'${
          {
            chinese: "繪畫",
            english: "Drawing",
          }[language]
        }'`
      ),
      c063.brackets2("]"),
      c063.default(","),
    ],
    [
      whiteSpace(2),
      c063.variable(`skills:`),
      whiteSpace(1),
      c063.brackets2("["),
      c063.string(`'TypeScript'`),
      c063.default(","),
      whiteSpace(1),
      c063.string(`'React'`),
      c063.default(","),
      whiteSpace(1),
      c063.string(`'Python'`),
      c063.brackets2("]"),
      c063.default(","),
    ],
    [
      c063.brackets1("}"),
      whiteSpace(1),
      c063.keyword2("as"),
      whiteSpace(1),
      c063.type("const"),
      c063.default(";"),
    ],
  ];
};
