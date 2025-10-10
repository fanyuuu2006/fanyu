import { Album } from "@/types/album";
import { profile } from "@/libs/profile";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";

const years = async () =>
  fetcher<string[]>(`${profile.url}/api/album`, { cache: "no-store" });

const events = async (year: string) =>
  fetcher<string[]>(`${profile.url}/api/album/${slugify(year)}`, {
    cache: "no-store",
  });

const images = async (year: string, eventName: string) =>
  fetcher<string[]>(
    `${profile.url}/api/album/${slugify(year)}/${slugify(eventName)}`,
    {
      cache: "no-store",
    }
  );

const image = async (year: string, eventName: string, index: number) =>
  fetcher<string>(
    `${profile.url}/api/album/${slugify(year)}/${slugify(eventName)}/${index}`,
    { cache: "no-store" }
  );

const album = { years, events, images, image };
export default album;

export function generateAlbumJsonLd({
  year,
  event,
}: {
  year: string;
  event: Album[number]["events"][number];
}) {
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
    url: `${profile.url}/album/${slugify(year)}/${slugify(event.name)}`,

    // 主要圖片實體 - 使用第一張圖片或預設圖片
    mainEntity: {
      "@type": "ImageObject",
      contentUrl: event.images[0] || `${profile.url}/GameShow.jpg`, // 圖片 URL
      name: `${year} ${event.name} 主要照片`, // 圖片名稱
      description: `${year} 年 ${event.name} 活動的主要照片`, // 圖片描述
    },

    // 關聯媒體 - 將所有圖片轉換為 ImageObject 陣列
    associatedMedia: event.images.map((image, index) => ({
      "@type": "ImageObject",
      contentUrl: image, // 圖片 URL
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
