import { LanguageContent } from "@/types/language";

type BaseRoute = {
  label: LanguageContent<string>;
  url: string;
};

export type Route = BaseRoute & {
  sub?: BaseRoute[];
};

export const routes: Route[] = [
  {
    label: {
      chinese: "首頁",
      english: "Home",
    },
    url: "/",
    sub: [
      {
        label: {
          chinese: "關於我",
          english: "About Me",
        },
        url: "#aboutMe",
      },

      {
        label: {
          chinese: "技能",
          english: "Skills",
        },
        url: "#skills",
      },
      {
        label: {
          chinese: "作品集",
          english: "Portfolio",
        },
        url: "#portfolio",
      },
      {
        label: {
          chinese: "聯繫",
          english: "Contact",
        },
        url: "#contact",
      },
      {
        label: {
          chinese: "經歷",
          english: "Experience",
        },
        url: "#experience",
      },
    ],
  },

  {
    label: {
      chinese: "留言版",
      english: "Guestbook",
    },
    url: "/guestbook",
  },
  {
    label: {
      chinese: "相簿",
      english: "Album",
    },
    url: "/album",
  },
];
