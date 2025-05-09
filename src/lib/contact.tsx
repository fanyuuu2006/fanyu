import { ContactCategory, ContactItem } from "@/types/contact";
import { LanguageContent } from "@/types/language";
import {
  FacebookFilled,
  GithubFilled,
  InstagramOutlined,
  MailOutlined,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { FaThreads, FaLine } from "react-icons/fa6";
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
      href: "https://www.instagram.com/fan._.yuuu/",
    },
    {
      label: "GitHub",
      icon: <GithubFilled />,
      id: "fanyuuu2006",
      href: "https://github.com/fanyuuu2006",
    },
    {
      label: "Threads",
      icon: <FaThreads />,
      id: "fan._.yuuu",
      href: "https://www.threads.net/@fan._.yuuu",
    },
    {
      label: "Youtube",
      icon: <YoutubeFilled />,
      id: "閃火",
      href: "https://www.youtube.com/@fan_yuuu",
    },
    {
      label: "Facebook",
      icon: <FacebookFilled />,
      id: "范振富",
      href: "https://www.facebook.com/share/1MpEQ1faFk/",
    },
    {
      label: "TikTok",
      icon: <TikTokOutlined />,
      id: "fan._.yuuu",
      href: "https://www.tiktok.com/@fan._.yuuu",
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
      icon: <MailOutlined/>,
      id: "bingxiao526@gmail.com",
      href: "bingxiao526@gmail.com",
    },
  ],
};
