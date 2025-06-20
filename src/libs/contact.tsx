import { ContactCategory, ContactItem } from "@/types/contact";
import { LanguageContent } from "@/types/language";
import {
  DiscordOutlined,
  FacebookOutlined,
  GithubFilled,
  InstagramOutlined,
  MailOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaThreads, FaLine } from "react-icons/fa6";
import { SiWakatime } from "react-icons/si";
export const contactCategorieMap: LanguageContent<
  Record<ContactCategory, string>
> = {
  chinese: {
    [ContactCategory.SocialNetwork]: "社交網路",
    [ContactCategory.InstantMessaging]: "即時通訊",
  },
  english: {
    [ContactCategory.SocialNetwork]: "Social Network",
    [ContactCategory.InstantMessaging]: "Instant Messaging",
  },
};

export const ContactData: Record<ContactCategory, ContactItem[]> = {
  [ContactCategory.SocialNetwork]: [
    {
      label: "Instagram",
      icon: <InstagramOutlined />,
      id: "fan._.yuuu",
      href: "https://www.instagram.com/fan._.yuuu",
      backgrounds: [
        "#ffdc80",
        "#fcaf45",
        "#f77737",
        "#f56040",
        "#fd1d1d",
        "#e1306c",
        "#c13584",
        "#833ab4",
        "#5851db",
        "#405de6",
      ],
    },
    {
      label: "Instagram",
      icon: <InstagramOutlined />,
      id: "fanyu_draw",
      href: "https://www.instagram.com/fanyu._.draw",
      backgrounds: [
        "#ffdc80",
        "#fcaf45",
        "#f77737",
        "#f56040",
        "#fd1d1d",
        "#e1306c",
        "#c13584",
        "#833ab4",
        "#5851db",
        "#405de6",
      ],
    },
    {
      label: "GitHub",
      icon: <GithubFilled />,
      id: "fanyuuu2006",
      href: "https://github.com/fanyuuu2006",
      backgrounds: ["#333"],
    },
    {
      label: "Threads",
      icon: <FaThreads />,
      id: "fan._.yuuu",
      href: "https://www.threads.net/@fan._.yuuu",
      backgrounds: ["#777"],
    },
    {
      label: "Youtube",
      icon: <YoutubeOutlined />,
      id: "閃火",
      href: "https://www.youtube.com/@fan_yuuu",
      backgrounds: ["#ff0000"],
    },
    {
      label: "Facebook",
      icon: <FacebookOutlined />,
      id: "范振富",
      href: "https://www.facebook.com/share/1MpEQ1faFk/",
      backgrounds: ["#1877f2"],
    },
    {
      label: "TikTok",
      icon: <TikTokOutlined />,
      id: "fan._.yuuu",
      href: "https://www.tiktok.com/@fan._.yuuu",
      backgrounds: ["#69C9D0", "#010101", "#010101", "#EE1D52"],
    },
    {
      label: "WakaTime",
      icon: <SiWakatime />,
      id: "fanyuuu2006",
      href: "https://wakatime.com/@fanyuuu2006",
    },
  ],
  [ContactCategory.InstantMessaging]: [
    {
      label: "Line",
      icon: <FaLine />,
      id: "fan._.yuuu",
      href: "https://line.me/ti/p/IqB3QvjIlU",
      backgrounds: ["#00b900"],
    },
    {
      label: "Email",
      icon: <MailOutlined />,
      id: "bingxiao526@gmail.com",
      href: "mailto:bingxiao526@gmail.com",
      backgrounds: [
        "#4285f4",
        "#4285f4",
        "#ea4335",
        "#ea4335",
        "#fbbc05",
        "#34a853",
        "#34a853",
      ],
    },
    {
      label: "Discord",
      icon: <DiscordOutlined />,
      id: "fan._.yuuu",
      href: "https://discord.com/users/959582016431620147",
      backgrounds: ["#5865f2 "],
    },
  ],
};
