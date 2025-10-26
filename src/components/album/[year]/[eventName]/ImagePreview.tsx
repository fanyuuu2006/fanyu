import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import {
  CloseOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useModal } from "fanyucomponents";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const IMAGE_PREVIEW_CONTENT: LanguageContent<
  Record<
    | "title"
    | "fileName"
    | "fileExtension"
    | "createdTime"
    | "untitled"
    | "unknown"
    | "size"
    | "widthXheight"
    | "imageLoadFailed",
    string
  >
> = {
  chinese: {
    title: "圖片資訊",
    fileName: "檔案名稱",
    fileExtension: "檔案格式",
    createdTime: "建立時間",
    untitled: "無標題",
    unknown: "未知",
    size: "檔案大小",
    widthXheight: "寬 x 高",
    imageLoadFailed: "載入圖片失敗",
  },
  english: {
    title: "Image Information",
    fileName: "File Name",
    fileExtension: "File Extension",
    createdTime: "Created Time",
    untitled: "Untitled",
    unknown: "Unknown",
    size: "File Size",
    widthXheight: "Width x Height",
    imageLoadFailed: "Failed to load image",
  },
};

export type ImagePreviewProps = {
  event: Album[number]["events"][number];
};

export const ImagePreview = ({ event }: ImagePreviewProps) => {
  const previewModal = useModal();
  const infoModal = useModal();
  const language = useLanguage();
  const imagePreviewContent = IMAGE_PREVIEW_CONTENT[language.Current];
  const [imageIndex, setImageIndex] = useState<number>(-1);
  const isModalOpen = imageIndex > -1;
  const currentImage = isModalOpen ? event.images[imageIndex] : null;

  const handlePrevImage = useCallback(() => {
    setImageIndex((prev) => (prev === 0 ? event.images.length - 1 : prev - 1));
  }, [event.images.length]);

  const handleNextImage = useCallback(() => {
    setImageIndex((prev) => (prev === event.images.length - 1 ? 0 : prev + 1));
  }, [event.images.length]);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent) => {
      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
      console.error(e);
      Toast.fire({
        icon: "error",
        text: imagePreviewContent.imageLoadFailed,
      });
    },
    [imagePreviewContent.imageLoadFailed]
  );

  const imageInfoFields = useMemo(() => {
    if (!currentImage) return [];

    return [
      {
        label: imagePreviewContent.fileName,
        value: currentImage.name || imagePreviewContent.untitled,
      },
      {
        label: imagePreviewContent.fileExtension,
        value: currentImage.fileExtension || imagePreviewContent.unknown,
      },
      {
        label: imagePreviewContent.createdTime,
        value:
          new Date(currentImage.createdTime || "0").toLocaleString(
            language.Current === "chinese" ? "zh-TW" : "en-US",
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
      {
        label: imagePreviewContent.size,
        value: currentImage.size
          ? `${(Number(currentImage.size) / 1024).toFixed(2)} KB`
          : imagePreviewContent.unknown,
      },
      {
        label: imagePreviewContent.widthXheight,
        value: currentImage.imageMediaMetadata
          ? `${currentImage.imageMediaMetadata.width} x ${currentImage.imageMediaMetadata.height}`
          : imagePreviewContent.unknown,
      },
    ];
  }, [currentImage, imagePreviewContent, language.Current]);

  // 處理鍵盤事件
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNextImage();
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
  }, [handlePrevImage, handleNextImage, previewModal, isModalOpen]);

  const navigationButtons = useMemo(
    () => [
      {
        icon: LeftOutlined,
        className: "left-4",
        onClick: handlePrevImage,
        ariaLabel: "上一張",
      },
      {
        icon: RightOutlined,
        className: "right-4",
        onClick: handleNextImage,
        ariaLabel: "下一張",
      },
    ],
    [handlePrevImage, handleNextImage]
  );

  return (
    <previewModal.Container style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
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
            title={event.images[imageIndex].name || "無標題"}
            className="text-lg md:text-xl font-semibold truncate"
          >
            {event.images[imageIndex].name}
          </h3>
          <span className="text-sm md:text-base text-[var(--text-color-muted)]">
            {imageIndex + 1} / {event.images.length}
          </span>
        </div>
        <div className="ms-auto text-3xl flex">
          <Link
            className="rounded-full p-2"
            href={event.images[imageIndex].url || ""}
            download={
              event.images[imageIndex].name ||
              `${imageIndex}.${event.images[imageIndex].fileExtension}`
            }
            aria-label={`下載圖片 ${event.images[imageIndex].name}`}
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
            <div className="card flex flex-col p-6 min-w-[280px] max-w-[90vw]">
              {/* 標頭 */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
                <h3 className="text-xl font-semibold bg-gradient-to-br  from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
                  {imagePreviewContent.title}
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
              <div className="space-y-4">
                {imageInfoFields.map((info, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="text-sm text-[var(--text-color-muted)]">
                      {info.label}
                    </div>
                    <div className="text-base font-medium break-all">
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </infoModal.Container>
        </div>
      </div>

      <Image
        priority
        src={event.images[imageIndex].url}
        alt={event.images[imageIndex].name || "圖片"}
        className="select-none max-w-[95vw] max-h-[80vh] object-contain"
        onError={handleImageError}
        width={event.images[imageIndex].imageMediaMetadata?.width}
        height={event.images[imageIndex].imageMediaMetadata?.height}
      />
      {navigationButtons.map((item, i) => (
        <button
          key={i}
          className={cn(
            "btn fixed top-1/2 -translate-y-1/2 w-10 h-10 rounded-full",
            item.className
          )}
          onClick={item.onClick}
          aria-label={item.ariaLabel}
        >
          <item.icon />
        </button>
      ))}
    </previewModal.Container>
  );
};
