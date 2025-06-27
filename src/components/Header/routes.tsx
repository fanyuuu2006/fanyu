import { LanguageContent } from "@/types/language";

export const routes: {
  label: LanguageContent<string>;
  href: string;
}[] = [
  {
    label: {
      chinese: "首頁",
      english: "Home",
    },
    href: "/#hero",
  },
  {
    label: {
      chinese: "關於我",
      english: "About Me",
    },
    href: "/#aboutMe",
  },

  {
    label: {
      chinese: "技能",
      english: "Skills",
    },
    href: "/#skills",
  },
  {
    label: {
      chinese: "作品集",
      english: "Portfolio",
    },
    href: "/#portfolio",
  },
  {
    label: {
      chinese: "經歷",
      english: "Experience",
    },
    href: "/#experience",
  },
  {
    label: {
      chinese: "聯繫",
      english: "Contact",
    },
    href: "/#contact",
  },
  {
    label: {
      chinese: "留言版",
      english: "Guestbook",
    },
    href: "/guestbook",
  },
  {
    label: {
      chinese: "相簿",
      english: "Album",
    },
    href: "/album",
  },
];