import { site } from "@/libs/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  description: site.description,
  keywords: site.keywords,
  title: {
    default: site.title,
    template: `%s | ${site.title}`,
  },
  icons: {
    icon: [
      {
        url: "/images/icons/favicon.ico",
        type: "image/x-icon",
        rel: "icon",
      },
    ],
  },
  authors: [{ name: "范余振富", url: "https://github.com/fanyuuu2006" }],

  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    type: "website",
    siteName: site.title,
    locale: "zh_TW",
    images: [
      {
        url: `${site.url}/images/fanyu.jpg`,
        alt: `${site.title} ${site.description}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/images/fanyu.jpg`],
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
    canonical: site.url,
    languages: {
      "zh-TW": site.url,
      en: site.url,
      "x-default": site.url,
    },
  },
};
