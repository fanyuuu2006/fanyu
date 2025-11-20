import { LanguageContent } from "@/types/language";
import {
  HomeOutlined,
  ProjectOutlined,
  MessageOutlined,
  PictureOutlined,
  BlockOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { MetadataRoute } from "next";

type BaseRoute = MetadataRoute.Sitemap[number] & {
  label: LanguageContent<string>;
  icon?: React.ElementType;
  isActive?: (path: string) => boolean;
  hidden?: boolean;
};

export type Route = BaseRoute & {
  sub?: Omit<BaseRoute, "isActive">[];
};

export const routes: Route[] = [
  {
    label: {
      chinese: "首頁",
      english: "Home",
    },
    url: "/",
    icon: HomeOutlined,
    changeFrequency: "weekly",
    priority: 1.0,
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
      chinese: "專案",
      english: "Projects",
    },
    url: "/projects",
    icon: ProjectOutlined,
    changeFrequency : "monthly",
    priority: 0.6,
  },
  {
    label: {
      chinese: "留言版",
      english: "Guestbook",
    },
    url: "/guestbook",
    icon: MessageOutlined,
    changeFrequency : "weekly",
    priority: 0.5,
  },
  {
    label: {
      chinese: "相簿",
      english: "Album",
    },
    url: "/album",
    isActive: (path: string) => path.startsWith("/album"),
    icon: PictureOutlined,
    changeFrequency : "weekly",
    priority: 0.9,
  },
  {
    label: {
      chinese: "桌遊社",
      english: "Board Game Club",
    },
    url: "/bgc",
    icon: BlockOutlined,
    hidden: true,
  },
  {
    label: {
      english: "My",
      chinese: "我的專區",
    },
    url: "/my",
    icon: StarOutlined,
    hidden: true,
    changeFrequency: "monthly",
    priority: 0.4,
  }
];
