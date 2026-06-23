import { Route } from "@/types";

export const routes: Route[] = [
  {
    label: "首頁",
    url: "/",
    changeFrequency: "weekly",
    priority: 1.0,
    isActive: (path: string) => path === "/",
    sub: [
      {
        label: "關於我",
        url: "#aboutMe",
      },
      {
        label: "技能專長",
        url: "#skills",
      },
      {
        label: "作品集",
        url: "#portfolio",
      },
      {
        label: "經歷",
        url: "#experience",
      }
    ],
  },
  {
    label: "作品集",
    url: "/portfolio",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    label: "留言版",
    url: "/guestbook",
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    label: "相簿",
    url: "/album",
    isActive: (path: string) => path.startsWith("/album"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
];
