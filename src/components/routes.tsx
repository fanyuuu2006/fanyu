import { LanguageContent } from "@/types/language";
import {
  HomeOutlined,
  ProjectOutlined,
  MessageOutlined,
  PictureOutlined,
} from "@ant-design/icons";

type BaseRoute = {
  label: LanguageContent<string>;
  url: string;
  icon?: React.ElementType;
  isActive?: (path: string) => boolean;
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
  },
  {
    label: {
      chinese: "留言版",
      english: "Guestbook",
    },
    url: "/guestbook",
    icon: MessageOutlined,
  },
  {
    label: {
      chinese: "相簿",
      english: "Album",
    },
    url: "/album",
    isActive: (path: string) => path.startsWith("/album"),
    icon: PictureOutlined,
  },
];
