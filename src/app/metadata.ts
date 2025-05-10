import type { Metadata } from "next"

const title = "飯魚 FanYu"
const description =
  "飯魚的個人網站，包括個人資料、自我介紹、作品集、學經歷以及聯繫方式。FanYu's personal website featuring biography, self-introduction, portfolio, education background, project experience, and contact information."
const url = "https://fanyu.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | " + title,
  },
  description,
  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
  },
  authors: [{ name: "FanYu", url: "https://github.com/fanyuuu2006" }],

  keywords: [
    "FanYu",
    "飯魚",
    "Fan-Yu Zhen-Fu",
    "范余振富",
    "飯魚正負",
    "fan._.yuu",
    "fanyuuu2006",
    "范振富",
    "personal website",
    "個人網站",
    "portfolio",
    "web developer",
    "frontend developer",
    "Taiwan developer",
    "NTUST",
    "TypeScript",
    "React",
    "Next.js",
  ],

  openGraph: {
    siteName: title,
    title,
    description,
    url,
    images: [
      {
        url: "/GameShow.jpg",
        alt: "FanYu Profile Image",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/GameShow.jpg"],
  },
  robots: "index, follow",
}
