/**
 * 圖片預覽 Hook
 * 提供相簿圖片的預覽、導航、資訊顯示等功能
 */

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
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const IMAGE_PREVIEW_CONTENT: LanguageContent<
  Record<
    | "title"
    | "fileName"
    | "fileExtension"
    | "untitled"
    | "unknown"
    | "size"
    | "widthXheight"
    | "imageLoadFailed"
    | "uploadTime"
    | "createdTime",
    string
  >
> = {
  chinese: {
    title: "圖片資訊",
    fileName: "檔案名稱",
    fileExtension: "檔案格式",
    uploadTime: "上傳時間",
    untitled: "無標題",
    unknown: "未知",
    size: "檔案大小",
    widthXheight: "寬 x 高",
    imageLoadFailed: "載入圖片失敗",
    createdTime: "建立時間",
  },
  english: {
    title: "Image Information",
    fileName: "File Name",
    fileExtension: "File Extension",
    uploadTime: "Upload Time",
    untitled: "Untitled",
    unknown: "Unknown",
    size: "File Size",
    widthXheight: "Width x Height",
    imageLoadFailed: "Failed to load image",
    createdTime: "Created Time",
  },
};

export const useImagePreview = ({
  event,
}: {
  event: Album[number]["events"][number];
}) => {
  // 當前預覽的圖片索引，-1 表示未開啟預覽
  const [imageIndex, setImageIndex] = useState<number>(0);
  const currentImage = event.images[imageIndex];

  // 主要預覽視窗的控制
  const previewModal = useModal({});
  // 圖片資訊視窗的控制
  const infoModal = useModal({});

  // 取得當前語言設定
  const language = useLanguage();
  const imagePreviewContent = IMAGE_PREVIEW_CONTENT[language.Current];

  /**
   * 處理圖片載入錯誤
   * 當圖片無法載入時，顯示備用圖片並提示錯誤訊息
   */
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = FALLBACK_IMAGE;
      console.error(e);
      Toast.fire({
        icon: "error",
        text: imagePreviewContent.imageLoadFailed,
      });
    },
    [imagePreviewContent.imageLoadFailed]
  );

  /**
   * 切換到上一張圖片
   * 如果目前是第一張，則循環到最後一張
   */
  const handlePrevImage = useCallback(() => {
    setImageIndex((prev) => (prev === 0 ? event.images.length - 1 : prev - 1));
  }, [event.images.length]);

  /**
   * 切換到下一張圖片
   * 如果目前是最後一張，則循環到第一張
   */
  const handleNextImage = useCallback(() => {
    setImageIndex((prev) => (prev === event.images.length - 1 ? 0 : prev + 1));
  }, [event.images.length]);

  /**
   * 計算圖片資訊欄位
   * 根據當前圖片的 metadata 動態生成顯示資訊
   * 包含:檔案名稱、格式、建立時間、大小、尺寸
   */
  const imageInfoFields = useMemo(() => {
    if (!currentImage) {
      return [];
    }

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
        label: imagePreviewContent.uploadTime,
        value: currentImage.createdTime
          ? new Date(currentImage.createdTime).toLocaleString(
              language.Current === "chinese" ? "zh-TW" : "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            )
          : imagePreviewContent.unknown,
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
      {
        label: imagePreviewContent.createdTime,
        value: currentImage.imageMediaMetadata?.time
          ? new Date(
              currentImage.imageMediaMetadata.time.replace(
                /^(\d{4}):(\d{2}):(\d{2})/,
                "$1-$2-$3"
              )
            ).toLocaleString(
              language.Current === "chinese" ? "zh-TW" : "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            )
          : imagePreviewContent.unknown,
      },
    ];
  }, [currentImage, imagePreviewContent, language.Current]);

  /**
   * 導航按鈕配置
   * 定義左右切換按鈕的圖示、位置和點擊事件
   */
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

  /**
   * 鍵盤快捷鍵監聽
   * - 左箭頭：上一張圖片
   * - 右箭頭：下一張圖片
   * - ESC：關閉預覽
   */
  useEffect(() => {
    if (!previewModal.isShow) return;

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
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextImage, handlePrevImage, previewModal]);

  /**
   * 預覽容器元件
   * 渲染完整的圖片預覽介面,包括:
   * - 頂部工具列(關閉、圖片名稱、下載、資訊按鈕)
   * - 中央圖片顯示區域
   * - 左右導航按鈕
   * - 圖片資訊彈出視窗
   */
  const Container = () => {
    if (!currentImage) {
      return null;
    }

    const title = currentImage.name || imagePreviewContent.untitled;

    return (
      <previewModal.Container style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        {/* Header - 頂部工具列 */}
        <div className="fixed top-0 left-0 w-full flex items-center py-4 px-8">
          {/* 關閉按鈕 */}
          <button
            className="text-2xl md:text-3xl text-[var(--text-color-muted)] rounded-full p-2"
            onClick={previewModal.Close}
            aria-label="關閉"
          >
            <CloseOutlined />
          </button>
          {/* 圖片標題和進度 */}
          <div className="flex flex-col min-w-0 ms-2">
            <h3
              title={currentImage.name || "無標題"}
              className="text-lg md:text-xl font-semibold truncate"
            >
              {currentImage.name}
            </h3>
            {/* 圖片計數 (當前/總數) */}
            <span className="text-sm md:text-base text-[var(--text-color-muted)]">
              {imageIndex + 1} / {event.images.length}
            </span>
          </div>
          {/* 右側功能按鈕群組 */}
          <div className="ms-auto text-3xl flex">
            {/* 下載按鈕 */}
            <Link
              className="rounded-full p-2"
              href={currentImage.url || ""}
              download={
                currentImage.name ||
                `${imageIndex}.${currentImage.fileExtension}`
              }
              aria-label={`下載圖片 ${currentImage.name}`}
            >
              <DownloadOutlined />
            </Link>
            {/* 圖片資訊按鈕 */}
            <button
              className="rounded-full p-2"
              aria-label="詳細資訊"
              onClick={infoModal.Open}
            >
              <InfoCircleOutlined />
            </button>
            {/* 圖片資訊彈出視窗 */}
            <infoModal.Container
              style={{
                zIndex: 6990,
              }}
            >
              <div className="card flex flex-col p-6 min-w-[280px] max-w-[90vw]">
                {/* 資訊視窗標頭 */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
                  <h3 className="text-xl font-semibold bg-gradient-to-br  from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
                    {imagePreviewContent.title}
                  </h3>
                  {/* 關閉資訊視窗按鈕 */}
                  <button
                    className="text-xl text-[var(--text-color-muted)] rounded-full p-2"
                    onClick={infoModal.Close}
                    aria-label="關閉"
                  >
                    <CloseOutlined />
                  </button>
                </div>

                {/* 圖片資訊內容 */}
                <div className="space-y-4">
                  {/* 動態渲染所有圖片資訊欄位 */}
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

        {/* 主要圖片顯示區域 */}
        <div
          className="max-w-[95vw] max-h-[80vh]"
          style={{
            width: currentImage.imageMediaMetadata?.width
              ? `${currentImage.imageMediaMetadata.width}px`
              : "auto",
            height: currentImage.imageMediaMetadata?.height
              ? `${currentImage.imageMediaMetadata.height}px`
              : "auto",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.url}
            className="w-full h-full object-contain"
            alt={title}
            title={title}
            onError={handleImageError}
            width={currentImage.imageMediaMetadata?.width}
            height={currentImage.imageMediaMetadata?.height}
          />
        </div>

        {/* 左右導航按鈕 */}
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
  Container.displayName = "ImagePreviewContainer";

  // 回傳預覽功能的所有方法和容器元件
  return {
    ...previewModal,
    Container,
    Open: (index: number) => {
      setImageIndex(index);
      return previewModal.Open();
    },
  };
};
