import { profile } from "@/libs/profile";
import { LanguageOption } from "@/types/language";
import { CodeTokenProps, createToken, whiteSpace } from "c063";
import Link from "next/link";

export const generateCodeLines = (
  language: LanguageOption
): CodeTokenProps<React.ElementType>[][] => {
  return [
    [
      createToken.constant("const"),
      whiteSpace(1),
      createToken.constant(profile.nickname.english),
      whiteSpace(1),
      createToken.operator("="),
      whiteSpace(1),
      createToken["brackets-1"]("{"),
    ],
    [
      whiteSpace(2),
      createToken.variable(`name:`),
      whiteSpace(1),
      createToken.string(`'${profile.name[language]}'`),
    ],
    [
      whiteSpace(2),
      createToken.variable(`nickname:`),
      whiteSpace(1),
      createToken.string(`'${profile.nickname[language]}'`),
      createToken.default(","),
    ],
    [
      whiteSpace(2),
      createToken.variable(`age:`),
      whiteSpace(1),
      createToken.number(`${profile.age()}`, {
        as: Link,
        href: "/my",
      }),
      createToken.default(","),
      whiteSpace(1),
      createToken.comment(
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
      createToken.variable(`hobbies:`),
      whiteSpace(1),
      createToken["brackets-2"]("["),
      createToken.string(
        `'${
          {
            chinese: "寫程式",
            english: "Coding",
          }[language]
        }'`
      ),
      createToken.default(","),
      whiteSpace(1),
      createToken.string(
        `'${
          {
            chinese: "繪畫",
            english: "Drawing",
          }[language]
        }'`
      ),
      createToken["brackets-2"]("]"),
      createToken.default(","),
    ],
    [
      whiteSpace(2),
      createToken.variable(`skills:`),
      whiteSpace(1),
      createToken["brackets-2"]("["),
      createToken.string(`'TypeScript'`),
      createToken.default(","),
      whiteSpace(1),
      createToken.string(`'React'`),
      createToken.default(","),
      whiteSpace(1),
      createToken.string(`'Python'`),
      createToken["brackets-2"]("]"),
      createToken.default(","),
    ],
    [
      createToken["brackets-1"]("}"),
      whiteSpace(1),
      createToken["keyword-purple"]("as"),
      whiteSpace(1),
      createToken.type("const"),
      createToken.default(";"),
    ],
  ];
};
