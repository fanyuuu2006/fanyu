"use client";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback } from "react";
import { cn } from "@/utils/className";
import { Tooltip } from "antd";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { Toast } from "@/components/custom/Toast";
import { FALLBACK_IMAGE } from "@/libs/album";
import Link from "next/link";
import Image from "next/image";
import { useImagePreview } from "./useImagePreview";

type MainSectionProps = {
  event: Album[number]["events"][number];
  year: Album[number]["year"];
};

type ImagesContent = Record<
  "noImages" | "back" | "totalImages" | "imageLoadFailed",
  string
>;

const IMAGES_CONTENT: LanguageContent<ImagesContent> = {
  chinese: {
    noImages: "沒有圖片",
    back: "返回",
    totalImages: "共 {count} 張照片",
    imageLoadFailed: "載入圖片失敗",
  },
  english: {
    noImages: "No Images",
    back: "Back",
    totalImages: "Total {count} images",
    imageLoadFailed: "Image Load Failed",
  },
};

export const MainSection = ({ year, event }: MainSectionProps) => {
  const language = useLanguage();

  const imagesContent = IMAGES_CONTENT[language.Current];

  const imagePreview = useImagePreview({
    event,
  });

  const handleImageError = useCallback(
    (e: React.SyntheticEvent) => {
      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
      console.error(e);
      Toast.fire({
        icon: "error",
        text: imagesContent.imageLoadFailed,
      });
    },
    [imagesContent.imageLoadFailed]
  );

  const handleImageClick = useCallback(
    (index: number) => {
      imagePreview.Open(index);
    },
    [imagePreview]
  );

  const handleImageLoad = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLImageElement;
    target.style.opacity = "1";
  }, []);

  return (
    <section className="min-h-screen">
      <div className="container">
        {/* 返回按鈕區域 */}
        <div className="w-full mb-6">
          <Tooltip placement="bottom" title={imagesContent.back}>
            <Link
              href="/album"
              aria-label={imagesContent.back}
              className="btn text-lg lg:text-xl flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full "
            >
              <CaretLeftOutlined className="relative -left-[2%]" />
            </Link>
          </Tooltip>
        </div>

        <div className="flex flex-col items-center leading-tight mb-6 ">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-color-muted)]">
            {year}
          </h2>
          <h1 className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-br from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
            {event.name}
          </h1>
          <span className="text-[var(--text-color-muted)]">
            {imagesContent.totalImages.replace(
              "{count}",
              event.images.length.toString()
            )}
          </span>
        </div>

        {/* 圖片網格 */}
        <article
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1"
          role="main"
          aria-label={`${year}-${event.name}照片集`}
        >
          {event.images.length === 0 ? (
            <div className="w-full text-center py-8">
              <span className="text-2xl font-bold">
                {imagesContent.noImages}
              </span>
            </div>
          ) : (
            event.images.map((imgItem, i) => (
              <div
                key={`${i}-${imgItem.name}`}
                className={cn(
                  "relative aspect-square bg-[#888] cursor-pointer border border-[var(--border-color)] hover:border-[var(--text-color-primary)]"
                )}
                onClick={() => handleImageClick(i)}
              >
                {/* 圖片預覽圖 */}
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={imgItem.thumbnailLink || FALLBACK_IMAGE}
                  alt={`${year} ${event.name} ${imgItem.name}`}
                  className="h-full w-full object-cover"
                />
                <Image
                  id={i.toString()}
                  src={imgItem.url}
                  title={imgItem.name || imagesContent.noImages}
                  alt={`${year} ${event.name} ${imgItem.name}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  width={imgItem.imageMediaMetadata?.width}
                  height={imgItem.imageMediaMetadata?.height}
                  loading="lazy"
                />
              </div>
            ))
          )}
        </article>
      </div>
      {/* 圖片預覽模態框 */}
      <imagePreview.Container />
    </section>
  );
};
