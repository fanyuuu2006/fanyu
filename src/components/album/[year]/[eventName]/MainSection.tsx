"use client";
import {
  LeftOutlined,
  RightOutlined,
  CaretLeftOutlined,
  CloseOutlined,
  // InfoCircleOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageCard } from "./ImageCard";
import { useEffect, useState } from "react";
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
  const language = useLanguage();
  const [modalImageIndex, setModalImageIndex] = useState<number>(-1);

  const previewModal = useModal({
    onClose: () => {
      setModalImageIndex(-1);
    },
  });
  const infoModal = useModal({});

  const imagesContent = IMAGES_CONTENT[language.Current];

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
          previewModal.Close();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalImageIndex, event.images.length, previewModal]);

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
                  "aspect-square bg-[#888] border border-[var(--border-color)] hover:border-[var(--text-color-primary)]"
                )}
              >
                <ImageCard
                  id={i.toString()}
                  src={imgItem.url}
                  title={imgItem.name || "無標題"}
                  alt={`${year} ${event.name} ${imgItem.name}`}
                  className="h-full w-full object-cover"
                  onClick={() => {
                    setModalImageIndex(i);
                    previewModal.Open();
                  }}
                />
              </div>
            ))
          )}
        </article>
      </div>

      {modalImageIndex > -1 && (
        <previewModal.Container
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          {/* Header */}
          <div className="fixed top-0 left-0 w-full flex items-center py-4 px-8">
            <button
              className="text-2xl md:text-3xl text-[var(--text-color-muted)] rounded-full p-2"
              onClick={previewModal.Close}
              aria-label="關閉"
            >
              <CloseOutlined />
            </button>

            <div className="flex flex-col min-w-0 ms-2">
              <h3
                title={event.images[modalImageIndex].name || "無標題"}
                className="text-lg md:text-xl font-semibold truncate"
              >
                {event.images[modalImageIndex].name}
              </h3>
              <span className="text-sm md:text-base text-[var(--text-color-muted)]">
                {modalImageIndex + 1} / {event.images.length}
              </span>
            </div>
            <div className="ms-auto text-3xl flex">
              <Link
                className="rounded-full p-2"
                href={event.images[modalImageIndex].url || ""}
                download={
                  event.images[modalImageIndex].name ||
                  `${modalImageIndex}.${event.images[modalImageIndex].fileExtension}`
                }
                aria-label={`下載圖片 ${event.images[modalImageIndex].name}`}
              >
                <DownloadOutlined />
              </Link>
              <button
                className="rounded-full p-2"
                aria-label="詳細資訊"
                onClick={infoModal.Open}
              >
                <InfoCircleOutlined />
              </button>
              <infoModal.Container
                style={{
                  zIndex: 6990,
                }}
              >
                <div className="card flex flex-col p-6">
                  {/* 標頭 */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">
                      {
                        {
                          chinese: "圖片資訊",
                          english: "Image Information",
                        }[language.Current]
                      }
                    </h3>
                    <button
                      className="text-xl text-[var(--text-color-muted)] rounded-full p-2"
                      onClick={infoModal.Close}
                      aria-label="關閉"
                    >
                      <CloseOutlined />
                    </button>
                  </div>

                  {/* 內容 */}
                  <div className="space-y-3">
                    {[
                      {
                        label: {
                          chinese: "檔案名稱",
                          english: "File Name",
                        },
                        value:
                          event.images[modalImageIndex].name ||
                          {
                            chinese: "無標題",
                            english: "Untitled",
                          }[language.Current],
                      },
                      {
                        label: {
                          chinese: "檔案格式",
                          english: "File Extension",
                        },
                        value:
                          event.images[modalImageIndex].fileExtension ||
                          {
                            chinese: "未知",
                            english: "Unknown",
                          }[language.Current],
                      },
                      {
                        label: {
                          chinese: "建立時間",
                          english: "Created Time",
                        },
                        value:
                          new Date(
                            event.images[modalImageIndex].createdTime || "0"
                          ).toLocaleString(
                            {
                              chinese: "zh-TW",
                              english: "en-US",
                            }[language.Current],
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          ) || "",
                      },
                    ].map((info, i) => (
                      <div key={i}>
                        <div className="text-sm text-[var(--text-color-muted)]">
                          {info.label[language.Current]}
                        </div>
                        <div className="text-base">{info.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </infoModal.Container>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.images[modalImageIndex].url}
            alt={event.images[modalImageIndex].name || "圖片"}
            className="select-none max-w-[90vw] max-h-[75vh] object-contain"
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
              className: "left-4",
              onClick: () =>
                setModalImageIndex((prev) =>
                  prev === 0 ? event.images.length - 1 : prev - 1
                ),
            },
            {
              icon: RightOutlined,
              className: "right-4",
              onClick: () =>
                setModalImageIndex((prev) =>
                  prev === event.images.length - 1 ? 0 : prev + 1
                ),
            },
          ].map((item, i) => (
            <button
              key={i}
              className={cn(
                "btn fixed top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center",
                item.className
              )}
              onClick={item.onClick}
            >
              <item.icon />
            </button>
          ))}
        </previewModal.Container>
      )}
    </section>
  );
};
