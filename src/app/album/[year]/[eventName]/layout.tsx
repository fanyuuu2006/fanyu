import { profile } from "@/libs/profile";
import album, { generateAlbumJsonLd } from "@/utils/album";
import { deslugify, slugify } from "@/utils/url";
import { Metadata } from "next";
import Script from "next/script";

interface PageProps {
  params: Promise<{ year: string; eventName: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year: rawYear, eventName: rawEventName } = await params;
  const year = deslugify(rawYear);
  const eventName = deslugify(rawEventName);

  const title = `${year} - ${eventName}`;
  const description = `查看 ${year} 年 ${eventName} 的完整相片集，記錄美好時刻與珍貴回憶。FanYu 個人相簿中的精選活動照片，展現生活中的精彩瞬間。`;
  const image = await album.image(year, eventName, 0);
  const canonicalUrl = `${profile.url}/album/${slugify(year)}/${slugify(
    eventName
  )}`;

  return {
    title,
    description,
    keywords: [
      eventName,
      year,
      "FanYu",
      "飯魚",
      "相簿",
      "活動照片",
      "回憶",
      "photo album",
      "memories",
      "event photos",
      "personal gallery",
    ],
    authors: [
      { name: profile.nickname.chinese },
      { name: profile.nickname.english },
    ],
    creator: `${profile.nickname.chinese} (${profile.nickname.english})`,
    publisher: `${profile.nickname.chinese} Personal Website`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${title} | 相簿 Album`,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: `${profile.nickname.chinese} ${profile.nickname.english}`,
      locale: "zh_TW",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${year} ${eventName} - FanYu Photo Album`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@fanyu",
      creator: "@fanyu",
      title: `${title} | 相簿 Album`,
      description,
      images: [
        {
          url: image,
          alt: `${year} ${eventName} - FanYu Photo Album`,
          type: "image/jpeg",
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ year: string; eventName: string }>;
}>) {
  return (
    <>
      <AlbumJsonLdWrapper params={params} />
      {children}
    </>
  );
}

async function AlbumJsonLdWrapper({
  params,
}: {
  params: Promise<{ year: string; eventName: string }>;
}) {
  const { year: rawYear, eventName: rawEventName } = await params;
  const year = deslugify(rawYear);
  const eventName = deslugify(rawEventName);

  const images = await album.images(year, eventName);

  return (
    <Script
      id="album-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          generateAlbumJsonLd({
            year,
            event: { name: eventName, images },
          })
        ),
      }}
    />
  );
}
