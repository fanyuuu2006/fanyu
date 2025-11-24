import { profile } from "@/libs/profile";
import { Album } from "@/types/album";
import * as album from "@/utils/album";
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
  const item = await album.item(year, eventName, 0);
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
          url: item.url,
          width: 1200,
          height: 630,
          alt: `${year} ${eventName} - FanYu Photo Album`,
          type: "item/jpeg",
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
          url: item.url,
          alt: `${year} ${eventName} - FanYu Photo Album`,
          type: "item/jpeg",
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

function generateAlbumJsonLd({
  year,
  event,
}: {
  year: string;
  event: Album[number]["events"][number];
}) {
  if (!year || !event || event.items.length === 0) {
    return null;
  }
  // 如果有年份和事件名稱，生成特定事件的結構化資料
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery", // 定義為圖片庫類型
    name: `${year} - ${event.name}`, // 事件標題
    description: `${year} 年 ${event.name} 的相片集，記錄美好時刻與珍貴回憶`, // 事件描述

    // 創作者資訊 - 使用 Person 類型描述作者
    creator: {
      "@type": "Person",
      name: `${profile.nickname.chinese} (${profile.nickname.english})`, // 作者姓名
      alternateName: [profile.nickname.chinese, profile.nickname.english], // 別名陣列
      url: profile.url, // 作者個人網站
    },

    // 時間資訊
    dateCreated: `${year}-01-01`, // 創建日期 (估計值)
    dateModified: new Date().toISOString().split("T")[0], // 最後修改日期

    // 相簿頁面 URL
    url: `${profile.url}/album/${slugify(year)}/${slugify(event.name || "其他")}`,

    // 主要圖片實體 - 使用第一張圖片或預設圖片
    mainEntity: {
      "@type": "ImageObject",
      contentUrl:
        `${profile.url}${event.items[0].url}` || `${profile.url}/GameShow.jpg`, // 圖片 URL
      name: `${year} ${event.name} 主要照片`, // 圖片名稱
      description: `${year} 年 ${event.name} 活動的主要照片`, // 圖片描述
    },

    // 關聯媒體 - 將所有圖片轉換為 ImageObject 陣列
    associatedMedia: event.items.map((item, index) => ({
      "@type": "ImageObject",
      contentUrl: `${profile.url}${item.url}`, // 圖片 URL
      name: `${year} ${event.name} 照片 ${index + 1}`, // 圖片名稱 (編號)
      description: `${year} 年 ${event.name} 活動照片`, // 圖片描述
    })),

    // 其他屬性
    genre: "Personal Photography", // 類型：個人攝影
    inLanguage: "zh-TW", // 語言：繁體中文

    // 所屬的父級相簿
    isPartOf: {
      "@type": "ImageGallery",
      name: "FanYu 個人相簿",
      url: `${profile.url}/album`,
    },
  };
}

async function AlbumJsonLdWrapper({
  params,
}: {
  params: Promise<{ year: string; eventName: string }>;
}) {
  const { year: rawYear, eventName: rawEventName } = await params;
  const year = deslugify(rawYear);
  const eventName = deslugify(rawEventName);

  const items = await album.items(year, eventName);

  return (
    <Script
      id="album-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          generateAlbumJsonLd({
            year,
            event: { name: eventName, items },
          })
        ),
      }}
    />
  );
}
