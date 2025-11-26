import { profile } from "@/libs/profile";
import type { Metadata } from "next";

const title = `${profile.nickname.chinese} ${profile.nickname.english}`;
const description = `${profile.description.chinese} ${profile.description.english}`;
const url = profile.url;

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
  authors: [
    { name: profile.nickname.english, url: "https://github.com/fanyuuu2006" },
  ],

  keywords: profile.keywords,

  openGraph: {
    siteName: title,
    title,
    description,
    url,
    images: [
      {
        url: "/GameShow.jpg",
        width: 1200,
        height: 630,
        alt: "FanYu Profile Image - Frontend Developer Portfolio",
      },
    ],
    locale: "zh_TW",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: `${url}/GameShow.jpg`,
        width: 1200,
        height: 630,
        alt: "FanYu Profile Image",
      },
    ],

    creator: "@fanyuuu2006",
    site: "@fanyuuu2006",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "BPwLDvPkjbND-Djvxq812SdYkm2pHQ18WPWt2KkPiQk",
    yandex: "b1e94267c95b0001",
    me: "73B631CBCD1EBDF32F1395A77E8758D9",
  },
  alternates: {
    canonical: profile.url,
    languages: {
      "zh-TW": profile.url,
      en: profile.url,
      "x-default": profile.url,
    },
  },
};
