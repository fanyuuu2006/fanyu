"use client";
import {
  LeftOutlined,
  RightOutlined,
  CaretLeftOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageCard } from "./ImageCard";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/className";
import { Tooltip } from "antd";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { Toast } from "@/components/custom/Toast";
import { FALLBACK_IMAGE } from "@/libs/album";
import { useModal } from "fanyucomponents";
import Link from "next/link";

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
  const router = useRouter();
  const language = useLanguage();
  const [modalImageIndex, setModalImageIndex] = useState<number>(-1);
  const modal = useModal({
    onClose: () => setModalImageIndex(-1),
  });

  const imagesContent = IMAGES_CONTENT[language.Current];
  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  // 處理鍵盤事件
  useEffect(() => {
    if (modalImageIndex === -1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setModalImageIndex((prev) =>
            prev === 0 ? event.images.length - 1 : prev - 1
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setModalImageIndex((prev) =>
            prev === event.images.length - 1 ? 0 : prev + 1
          );
          break;
        case "Escape":
          e.preventDefault();
          modal.Close();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalImageIndex, event.images.length, modal]);

  return (
    <section className="min-h-screen">
      <div className="container">
        {/* 返回按鈕區域 */}
        <div className="w-full mb-6">
          <Tooltip title={imagesContent.back}>
            <button
              aria-label={imagesContent.back}
              onClick={handleBackClick}
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
                  "aspect-square bg-[#888] border border-[var(--border-color)] hover:border-[var(--text-color-primary)]"
                )}
              >
                <ImageCard
                  id={i.toString()}
                  src={imgItem.url}
                  title={imgItem.name}
                  alt={`${year} ${event.name} ${imgItem.name}`}
                  className="h-full w-full object-cover"
                  onClick={() => {
                    setModalImageIndex(i);
                    modal.Open();
                  }}
                />
              </div>
            ))
          )}
        </article>
      </div>

      {modalImageIndex > -1 && (
        <modal.Container style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
          {/* Header */}
          <div
            className={cn(
              "flex items-center",
              "w-full absolute top-0 left-0 py-4 px-8",
              "hover:bg-[var(--background-color)] transition-all duration-200"
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <button
                className="text-2xl md:text-3xl text-[var(--text-color-muted)] rounded-full p-2"
                onClick={modal.Close}
              >
                <CloseOutlined />
              </button>
              <div className="flex flex-col min-w-0">
                <h3
                  title={event.images[modalImageIndex].name}
                  className="text-lg md:text-xl font-semibold truncate"
                >
                  {event.images[modalImageIndex].name}
                </h3>
                <span className="text-sm md:text-base text-[var(--text-color-muted)]">
                  {modalImageIndex + 1} / {event.images.length}
                </span>
              </div>
            </div>

            {/* 功能按鈕按鈕 */}
            <div className={cn("text-3xl ms-auto items-center gap-6")}>
              <Link
                href={event.images[modalImageIndex].url || ""}
                download
                aria-label={`下載圖片 ${event.images[modalImageIndex].name}`}
              >
                <DownloadOutlined />
              </Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.images[modalImageIndex].url}
            alt={event.images[modalImageIndex].name}
            className={`select-none max-w-[95vw] max-h-[80vh] object-contain`}
            onError={(e: React.SyntheticEvent) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              console.error(e);
              Toast.fire({
                icon: "error",
                text: imagesContent.imageLoadFailed,
              });
            }}
          />
          {[
            {
              icon: LeftOutlined,
              position: "left-4",
              onClick: () =>
                setModalImageIndex((prev) =>
                  prev === 0 ? event.images.length - 1 : prev - 1
                ),
            },
            {
              icon: RightOutlined,
              position: "right-4",
              onClick: () =>
                setModalImageIndex((prev) =>
                  prev === event.images.length - 1 ? 0 : prev + 1
                ),
            },
          ].map((item, i) => (
            <button
              key={i}
              className={cn(
                "text-lg rounded-full btn w-10 h-10",
                "flex items-center justify-center",
                "fixed top-1/2 -translate-y-1/2",
                item.position,
                "cursor-pointer select-none transition-opacity duration-200"
              )}
              onClick={item.onClick}
            >
              <item.icon />
            </button>
          ))}
        </modal.Container>
      )}
    </section>
  );
};
