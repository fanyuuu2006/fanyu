import { ContactCategory, ContactItem } from "@/types/contact";
import { LanguageContent } from "@/types/language";
import {
  BilibiliOutlined,
  DiscordOutlined,
  FacebookOutlined,
  GithubFilled,
  InstagramOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Script from "next/script";
import { BiLogoGmail } from "react-icons/bi";
import { BsLine } from "react-icons/bs";
import { FaThreads, FaFacebookMessenger } from "react-icons/fa6";
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
      icon: InstagramOutlined,
      info: { id: "fan._.yuuu", name: "🍚🐟➕➖" },
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
      icon: InstagramOutlined,
      info: { id: "fanyu_draw", name: "🍚🐟✖️➗" },
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
      icon: GithubFilled,
      info: {
        id: "fanyuuu2006",
        name: "FanYu",
        image: { src: "https://avatars.githubusercontent.com/u/180280998" },
      },
      href: "https://github.com/fanyuuu2006",
      backgrounds: ["#5f5f5f"],
    },
    {
      label: "Threads",
      icon: FaThreads,
      info: { id: "fan._.yuuu", name: "🍚🐟➕➖" },
      href: "https://www.threads.net/@fan._.yuuu",
      backgrounds: ["#777"],
    },
    {
      label: "Youtube",
      icon: YoutubeOutlined,
      info: { id: "fan._.yuuu", name: "閃火" },
      href: "https://www.youtube.com/@fan_yuuu",
      backgrounds: ["#ff0000"],
    },
    {
      label: "TikTok",
      icon: TikTokOutlined,
      info: {
        id: "fan._.yuuu",
        name: "🍚🐟➕➖",
        about: () => (
          <>
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@fan._.yuuu"
              data-unique-id="fan._.yuuu"
              data-embed-type="creator"
              style={{ maxWidth: "780px", minWidth: "288px" }}
            >
              <section>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@fan._.yuuu?refer=creator_embed"
                >
                  @fan._.yuuu
                </a>
              </section>
            </blockquote>
            <Script async src="https://www.tiktok.com/embed.js" />
          </>
        ),
      },
      href: "https://www.tiktok.com/@fan._.yuuu",
      backgrounds: ["#69C9D0", "#010101", "#010101", "#EE1D52"],
    },
    {
      label: "WakaTime",
      icon: SiWakatime,
      info: {
        id: "fanyuuu2006",
        name: "FanYu",
        image: {
          src: "https://wakatime.com/photo/852f9428-fd16-453e-80bd-6cabc63ee83e",
        },
      },
      href: "https://wakatime.com/@fanyuuu2006",
    },
    {
      label: "Dcard",
      icon: () => {
        return (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.156 1.201h8.608c2.281 0 4.469.908 6.083 2.526A8.653 8.653 0 0 1 20.37 9.83v4.332a8.655 8.655 0 0 1-2.52 6.109 8.59 8.59 0 0 1-6.086 2.53H3.156v-21.6Zm15.027 13.627c.023-.221.035-.444.035-.666V9.83a6.455 6.455 0 0 0-.761-3.033A5.3 5.3 0 0 0 16.1 5.474a16.142 16.142 0 0 1-4.753 4.287 16.08 16.08 0 0 1-6.039 2.097v8.783h6.45a6.436 6.436 0 0 0 3.257-.888 6.468 6.468 0 0 0 2.365-2.417 6.063 6.063 0 0 1-3.462-1.712l1.523-1.53c.444.44.984.767 1.578.957.11.03.223.045.337.046.297-.002.586-.096.827-.27ZM13.636 9.78a1.788 1.788 0 0 1 2.264.224 1.803 1.803 0 0 1-.582 2.935 1.787 1.787 0 0 1-1.954-.39 1.802 1.802 0 0 1 .272-2.77"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        );
      },
      info: { id: "yorn90104", name: "芯渝啥都沒說" },
      href: "https://www.dcard.tw/@yorn90104?utm_source=share",
      backgrounds: ["#006aa6"],
    },
    {
      label: "bilibili",
      icon: BilibiliOutlined,
      info: {
        name: "飯魚",
        id: "1488181486",
        image: {
          src: "/api/proxy-image?url=https://i1.hdslb.com/bfs/face/10300665780b53d6ea2977d2c4bac163e3bfcff5.jpg",
        },
      },
      href: "https://space.bilibili.com/1488181486",
      backgrounds: ["#FF6999"],
    },
    {
      label: "Facebook",
      icon: FacebookOutlined,
      info: { id: "fan.zhen.fu.2025", name: "范振富" },
      href: "https://www.facebook.com/share/1MpEQ1faFk/",
      backgrounds: ["#1877f2"],
    },
  ],
  [ContactCategory.InstantMessaging]: [
    {
      label: "Line",
      icon: BsLine,
      info: {
        id: "fan._.yuuu",
        name: "飯魚🍚🐟",
        image: {
          src: "https://profile.line-scdn.net/0hHQvRd6bKF35bKwNydPZpASt7FBR4Wk5sdk5eSG0pS040S1IgcRhbSDksQU00TlR4JUwKG2ojHBtXOGAYRX3rSlwbSUpgHFYuc0pdnQ",
        },
      },
      href: "https://line.me/ti/p/IqB3QvjIlU",
      backgrounds: ["#00c300"],
    },
    {
      label: "Email",
      icon: BiLogoGmail,
      info: {
        id: "bingxiao526@gmail.com",
        name: "飯魚正負",
        image: {
          src: "https://lh3.googleusercontent.com/a/ACg8ocKdE_VVvBiQF5MPlOqLuuBc9-NntvLaIb9i42xm3hVCwhNsLg_-=s96-c",
        },
      },
      href: "mailto:bingxiao526@gmail.com",
      backgrounds: [
        "#4285f4",
        "#4285f4",
        "#e92412",
        "#e92412",
        "#fbbc05",
        "#34a853",
        "#34a853",
      ],
    },
    {
      label: "Discord",
      icon: DiscordOutlined,
      info: {
        id: "fan._.yuuu",
        name: "🍚🐟➕➖",
        image: {
          src: "https://cdn.discordapp.com/avatars/959582016431620147/49359a36b9a89375920586067a64c0de",
        },
      },
      href: "https://discord.com/users/959582016431620147",
      backgrounds: ["#5865f2"],
    },
    {
      label: "Messenger",
      icon: FaFacebookMessenger,
      info: { id: "fan.zhen.fu.2025", name: "范振富" },
      href: "https://m.me/fan.zhen.fu.2025",
      backgrounds: ["#0084ff"],
    },
  ],
};
