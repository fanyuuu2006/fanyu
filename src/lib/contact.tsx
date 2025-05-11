import { ContactCategory, ContactItem } from "@/types/contact";
import { LanguageContent } from "@/types/language";
import {
  FacebookOutlined,
  GithubFilled,
  InstagramOutlined,
  MailOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaThreads, FaLine } from "react-icons/fa6";
import { SiNpm, SiWakatime } from "react-icons/si";
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
      label: "GitHub",
      icon: <GithubFilled />,
      id: "fanyuuu2006",
      href: "https://github.com/fanyuuu2006",
    },
    {
      label: "Instagram",
      icon: <InstagramOutlined />,
      id: "fan._.yuuu",
      href: "https://www.instagram.com/fan._.yuuu",
    },
    {
      label: "Instagram",
      icon: <InstagramOutlined />,
      id: "fanyu_draw",
      href: "https://www.instagram.com/fanyu._.draw",
    },
    {
      label: "Threads",
      icon: <FaThreads />,
      id: "fan._.yuuu",
      href: "https://www.threads.net/@fan._.yuuu",
    },
    {
      label: "Youtube",
      icon: <YoutubeOutlined />,
      id: "閃火",
      href: "https://www.youtube.com/@fan_yuuu",
    },
    {
      label: "NPM",
      icon: <SiNpm />,
      id: "fan._.yuuu",
      href: "https://www.npmjs.com/~fan._.yuuu",
    },
    {
      label: "Facebook",
      icon: <FacebookOutlined />,
      id: "范振富",
      href: "https://www.facebook.com/share/1MpEQ1faFk/",
    },
    {
      label: "TikTok",
      icon: <TikTokOutlined />,
      id: "fan._.yuuu",
      href: "https://www.tiktok.com/@fan._.yuuu",
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
    },
    {
      label: "Email",
      icon: <MailOutlined />,
      id: "bingxiao526@gmail.com",
      href: "mailto:bingxiao526@gmail.com",
    },
  ],
};
