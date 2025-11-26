"use client";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback } from "react";
import { Tooltip } from "antd";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { useItemPreview } from "./useItemPreview";
import { ItemCard } from "./ItemCard";
import { useRouter } from "next/navigation";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";

type MainSectionProps = {
  event: Album[number]["events"][number];
  year: Album[number]["year"];
};

type ItemsContent = Record<
  "noItems" | "back" | "totalItems" | "imageLoadFailed",
  string
>;

const ITEMS_CONTENT: LanguageContent<ItemsContent> = {
  chinese: {
    noItems: "沒有項目",
    back: "返回",
    totalItems: "共 {count} 張照片",
    imageLoadFailed: "載入圖片失敗",
  },
  english: {
    noItems: "No Items",
    back: "Back",
    totalItems: "Total {count} items",
    imageLoadFailed: "Image Load Failed",
  },
};

export const MainSection = ({ year, event }: MainSectionProps) => {
  const language = useLanguage();
  const router = useRouter();
  const itemsContent = ITEMS_CONTENT[language.Current];

  const order = useTimeOrderTabs(
    event.items,
    (item) =>
      item.imageMediaMetadata?.time?.replace(
        /^(\d{4}):(\d{2}):(\d{2})/,
        "$1-$2-$3"
      ) ||
      item.createdTime ||
      "0"
  );

  const itemPreview = useItemPreview(order.data);

  const handleImageClick = useCallback(
    (index: number) => {
      itemPreview.open(index);
    },
    [itemPreview]
  );

  const handleBackClick = useCallback(() => {
    // 如果有上一頁 (history 長度大於 1)，則返回；否則導向 /album
    if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.length > 1
    ) {
      router.back();
    } else {
      router.push("/album");
    }
  }, [router]);

  return (
    <section className="min-h-screen">
      <div className="container">
        {/* 返回按鈕區域 */}
        <div className="w-full mb-6">
          <Tooltip placement="bottom" title={itemsContent.back}>
            <button
              onClick={handleBackClick}
              aria-label={itemsContent.back}
              className="btn text-lg lg:text-xl flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full "
            >
              <CaretLeftOutlined className="relative -left-[2%]" />
            </button>
          </Tooltip>
        </div>

        <div className="flex flex-col items-center leading-tight mb-6 ">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-color-muted)]">
            {year}
          </h2>
          <h1 className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
            {event.name}
          </h1>
        </div>
        <div className="w-full flex items-center justify-between mb-2">
          <order.div />
          <span className="text-[var(--text-color-muted)]">
            {itemsContent.totalItems.replace(
              "{count}",
              order.data.length.toString()
            )}
          </span>
        </div>

        {/* 圖片網格 */}
        <article
          className="w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-0.5"
          role="main"
          aria-label={`${year}-${event.name} 照片集`}
        >
          {order.data.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                {itemsContent.noItems}
              </h3>
            </div>
          ) : (
            <>
              {order.data.map((item, i) => (
                <ItemCard
                  id={i.toString()}
                  tabIndex={0}
                  item={item}
                  key={i}
                  onClick={() => handleImageClick(i)}
                />
              ))}
              {/* 預覽 Modal */}
              <itemPreview.Container className="animate-appear">
                <itemPreview.Content />
              </itemPreview.Container>
            </>
          )}
        </article>
      </div>
    </section>
  );
};
