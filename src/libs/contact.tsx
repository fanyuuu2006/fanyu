import { ContactItem } from "@/types";
import Script from "next/script";
import {
  BilibiliOutlined,
  DiscordOutlined,
  FacebookOutlined,
  GithubFilled,
  InstagramOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { BiLogoGmail } from "react-icons/bi";
import { BsLine } from "react-icons/bs";
import { FaThreads, FaFacebookMessenger } from "react-icons/fa6";
import { SiWakatime } from "react-icons/si";

export const contactCategories: {
  label: string;
  items: ContactItem[];
}[] = [
  {
    label: "社群",
    items: [
      {
        label: "Instagram",
        icon: InstagramOutlined,
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
        icon: InstagramOutlined,
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
        icon: GithubFilled,
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
        icon: FaThreads,
        url: "https://www.threads.net/@fan._.yuuu",
        colors: ["#777"],
        info: {
          id: "fan._.yuuu",
          name: "🍚🐟➕➖",
        },
      },
      {
        label: "YouTube",
        icon: YoutubeOutlined,
        url: "https://www.youtube.com/@fan_yuuu",
        colors: ["#ff0000"],
        info: {
          id: "fan._.yuuu",
          name: "閃火",
        },
      },
      {
        label: "TikTok",
        icon: TikTokOutlined,
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
        icon: () => {
          return (
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              width="1em"
              viewBox="0 0 684 684"
            >
              <rect width="684" height="684" fill="transparent" />
              <path
                d="M0 0 C0 225.72 0 451.44 0 684 C-254.637 684 -254.637 684 -282 657 C-304.042 634.206 -308.492 605.028 -308.381 574.557 C-308.384 572.459 -308.389 570.361 -308.395 568.263 C-308.408 562.55 -308.402 556.838 -308.392 551.125 C-308.385 544.944 -308.396 538.763 -308.404 532.581 C-308.417 521.19 -308.416 509.799 -308.407 498.407 C-308.4 487.881 -308.398 477.355 -308.401 466.829 C-308.402 466.129 -308.402 465.428 -308.402 464.707 C-308.403 461.864 -308.404 459.021 -308.405 456.178 C-308.414 429.55 -308.406 402.921 -308.39 376.292 C-308.375 352.672 -308.377 329.051 -308.391 305.431 C-308.407 278.848 -308.414 252.266 -308.404 225.684 C-308.403 222.846 -308.402 220.009 -308.401 217.171 C-308.401 216.473 -308.401 215.774 -308.401 215.054 C-308.397 204.539 -308.401 194.023 -308.409 183.508 C-308.417 171.542 -308.415 159.577 -308.399 147.612 C-308.391 141.513 -308.388 135.414 -308.398 129.316 C-308.407 123.722 -308.402 118.129 -308.386 112.536 C-308.383 110.523 -308.384 108.51 -308.392 106.498 C-308.493 76.48 -302.736 48.028 -281 26 C-215.921 -36.934 -31.091 0 0 0 Z"
                fill="currentColor"
                transform="translate(308,0)"
              />
              <path
                d="M0 0 C195.367 0 195.367 0 247 45 C247.976 45.842 248.952 46.684 249.957 47.551 C287.117 80.202 304.328 129.186 307.804 177.501 C310.207 220.339 304.885 263.954 284 302 C283.357 303.211 282.713 304.422 282.07 305.633 C274.858 318.965 265.393 330.073 255 341 C254.71 341.316 254.71 341.316 253.242 342.918 C244.024 352.669 232.577 360.377 221 367 C220.455 367.322 220.455 367.322 217.695 368.953 C202.755 377.54 186.238 383.235 169.562 387.375 C169.118 387.488 169.118 387.488 166.868 388.061 C114.666 400.172 45.331 393 0 393 C0 263.31 0 133.62 0 0 Z"
                fill="currentColor"
                transform="translate(376,0)"
              />
              <path
                d="M0 0 C101.64 0 203.28 0 308 0 C308 73.26 308 146.52 308 222 C119.884 222 119.884 222 57 160 C15.485 118.01 0 57.535 0 0 Z"
                fill="currentColor"
                transform="translate(376,462)"
              />
            </svg>
          );
        },
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
        icon: SiWakatime,
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
        icon: () => (
          <svg viewBox="0 0 24 24" height="1em" width="1em">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3.156 1.201h8.608c2.281 0 4.469.908 6.083 2.526A8.653 8.653 0 0 1 20.37 9.83v4.332a8.655 8.655 0 0 1-2.52 6.109 8.59 8.59 0 0 1-6.086 2.53H3.156v-21.6Zm15.027 13.627c.023-.221.035-.444.035-.666V9.83a6.455 6.455 0 0 0-.761-3.033A5.3 5.3 0 0 0 16.1 5.474a16.142 16.142 0 0 1-4.753 4.287 16.08 16.08 0 0 1-6.039 2.097v8.783h6.45a6.436 6.436 0 0 0 3.257-.888 6.468 6.468 0 0 0 2.365-2.417 6.063 6.063 0 0 1-3.462-1.712l1.523-1.53c.444.44.984.767 1.578.957.11.03.223.045.337.046.297-.002.586-.096.827-.27ZM13.636 9.78a1.788 1.788 0 0 1 2.264.224 1.803 1.803 0 0 1-.582 2.935 1.787 1.787 0 0 1-1.954-.39 1.802 1.802 0 0 1 .272-2.77"
              clipRule="evenodd"
            />
          </svg>
        ),
        url: "https://www.dcard.tw/@yorn90104",
        colors: ["#006aa6"],
        info: {
          id: "yorn90104",
          name: "芯渝啥都沒說",
        },
      },
      {
        label: "bilibili",
        icon: BilibiliOutlined,
        url: "https://space.bilibili.com/1488181486",
        colors: ["#FF6999"],
        info: {
          id: "1488181486",
          name: "飯魚",
        },
      },
      {
        label: "Facebook",
        icon: FacebookOutlined,
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
        icon: BsLine,
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
        icon: BiLogoGmail,
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
        icon: DiscordOutlined,
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
        icon: FaFacebookMessenger,
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
