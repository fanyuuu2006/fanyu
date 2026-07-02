import { ContactItem } from "@/types";
import Script from "next/script";
import GithubSvg from "@/components/svgs/GithubSvg";
import InstagramSvg from "@/components/svgs/InstagramSvg";
import ThreadsSvg from "@/components/svgs/ThreadsSvg";
import YoutubeSvg from "@/components/svgs/YouTubeSvg";
import TikTokSvg from "@/components/svgs/TikTokSvg";
import MessengerSvg from "@/components/svgs/MessengerSvg";
import BilibiliSvg from "@/components/svgs/BilibiliSvg";
import DiscordSvg from "@/components/svgs/DiscordSvg";
import FacebookSvg from "@/components/svgs/FacebookSvg";
import GmailSvg from "@/components/svgs/GmailSvg";
import LineSvg from "@/components/svgs/LineSvg";
import RetroSvg from "@/components/svgs/RetroSvg";
import DcardSvg from "@/components/svgs/DcardSvg";
import WakaTimeSvg from "@/components/svgs/WakaTimeSvg";

export const contactCategories: {
  label: string;
  items: ContactItem[];
}[] = [
  {
    label: "社群",
    items: [
      {
        label: "Instagram",
        icon: InstagramSvg,
        url: "https://www.instagram.com/fan._.yuuu",
        colors: [
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
        info: {
          id: "fan._.yuuu",
          name: "🍚🐟➕➖",
        },
      },
      {
        label: "Instagram",
        icon: InstagramSvg,
        url: "https://www.instagram.com/fanyu._.draw",
        colors: [
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
        info: {
          id: "fanyu_draw",
          name: "🍚🐟✖️➗",
        },
      },
      {
        label: "GitHub",
        icon: GithubSvg,
        url: "https://github.com/fanyuuu2006",
        colors: ["#5f5f5f"],
        info: {
          id: "fanyuuu2006",
          name: "FanYu",
          image: {
            src: "https://avatars.githubusercontent.com/u/180280998",
          },
        },
      },
      {
        label: "Threads",
        icon: ThreadsSvg,
        url: "https://www.threads.net/@fan._.yuuu",
        colors: ["#777"],
        info: {
          id: "fan._.yuuu",
          name: "🍚🐟➕➖",
        },
      },
      {
        label: "YouTube",
        icon: YoutubeSvg,
        url: "https://www.youtube.com/@fan_yuuu",
        colors: ["#ff0000"],
        info: {
          id: "fan._.yuuu",
          name: "閃火",
        },
      },
      {
        label: "TikTok",
        icon: TikTokSvg,
        url: "https://www.tiktok.com/@fan._.yuuu",
        colors: ["#69C9D0", "#010101", "#010101", "#EE1D52"],
        info: {
          id: "fan._.yuuu",
          name: "🍚🐟➕➖",
          about: () => (
            <div>
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
            </div>
          ),
        },
      },
      {
        label: "Retro",
        icon: RetroSvg,
        url: "https://retro.app/u/fan._.yuuu",
        colors: ["#999999", "#666666", "#333333"],
        info: {
          id: "fan._.yuuu",
          name: "🍚🐟➕➖",
          image: {
            src: "https://firebasestorage.googleapis.com/v0/b/retro-media-multi/o/profilePhotos%2FXwoajkypoePTkSVu31UWlVQQKkF3%2F6d3d1a3d-5faf-4ba0-afd3-f7fa630cd5b6?alt=media&token=6e132eb0-1efc-491b-b90c-b088a28c08f1",
          },
        },
      },
      {
        label: "WakaTime",
        icon: WakaTimeSvg,
        url: "https://wakatime.com/@fanyuuu2006",
        info: {
          id: "fanyuuu2006",
          name: "FanYu",
          image: {
            src: "https://wakatime.com/photo/852f9428-fd16-453e-80bd-6cabc63ee83e",
          },
        },
      },
      {
        label: "Dcard",
        icon: DcardSvg,
        url: "https://www.dcard.tw/@yorn90104",
        colors: ["#006aa6"],
        info: {
          id: "yorn90104",
          name: "芯渝啥都沒說",
        },
      },
      {
        label: "bilibili",
        icon: BilibiliSvg,
        url: "https://space.bilibili.com/1488181486",
        colors: ["#FF6999"],
        info: {
          id: "1488181486",
          name: "飯魚",
        },
      },
      {
        label: "Facebook",
        icon: FacebookSvg,
        url: "https://www.facebook.com/share/1MpEQ1faFk/",
        colors: ["#1877f2"],
        info: {
          id: "fan.zhen.fu.2025",
          name: "范振富",
        },
      },
    ],
  },

  {
    label: "即時通訊",
    items: [
      {
        label: "Line",
        icon: LineSvg,
        url: "https://line.me/ti/p/IqB3QvjIlU",
        colors: ["#00c300"],
        info: {
          id: "fan._.yuuu",
          name: "飯魚🍚🐟",
          image: {
            src: "https://profile.line-scdn.net/0hHQvRd6bKF35bKwNydPZpASt7FBR4Wk5sdk5eSG0pS040S1IgcRhbSDksQU00TlR4JUwKG2ojHBtXOGAYRX3rSlwbSUpgHFYuc0pdnQ",
          },
        },
      },
      {
        label: "Email",
        icon: GmailSvg,
        url: "mailto:bingxiao526@gmail.com",
        colors: [
          "#4285f4",
          "#4285f4",
          "#e92412",
          "#e92412",
          "#fbbc05",
          "#34a853",
          "#34a853",
        ],
        info: {
          id: "bingxiao526@gmail.com",
          name: "飯魚正負",
          image: {
            src: "https://lh3.googleusercontent.com/a/ACg8ocKdE_VVvBiQF5MPlOqLuuBc9-NntvLaIb9i42xm3hVCwhNsLg_-=s96-c",
          },
        },
      },
      {
        label: "Discord",
        icon: DiscordSvg,
        url: "https://discord.com/users/959582016431620147",
        colors: ["#5865f2"],
        info: {
          id: "fan._.yuuu",
          name: "🍚🐟➕➖",
          image: {
            src: "https://cdn.discordapp.com/avatars/959582016431620147/49359a36b9a89375920586067a64c0de",
          },
        },
      },
      {
        label: "Messenger",
        icon: MessengerSvg,
        url: "https://m.me/fan.zhen.fu.2025",
        colors: ["#0084ff"],
        info: {
          id: "fan.zhen.fu.2025",
          name: "范振富",
        },
      },
    ],
  },
];
