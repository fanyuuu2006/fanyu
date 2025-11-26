/**
 * 項目預覽 Hook
 * 提供相簿項目的預覽、導航、資訊顯示等功能
 *
 * 性能優化:
 * - 使用 React.memo 避免不必要的重新渲染
 * - 提取常數到模組頂層
 * - 優化 useMemo 依賴項
 * - 預計算樣式物件
 */

import { MyImage } from "@/components/custom/MyImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModal } from "@/hooks/useModal";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { formatDate, formatTime } from "@/utils";
import { cn } from "@/utils/className";
import {
  CloseOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, memo } from "react";

// 常數提取到模組頂層
const MB_DIVISOR = 1024 * 1024;
const KEYBOARD_KEYS = {
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
} as const;

const ITEM_PREVIEW_CONTENT: LanguageContent<
  Record<
    | "title"
    | "fileName"
    | "fileExtension"
    | "untitled"
    | "unknown"
    | "size"
    | "widthXheight"
    | "uploadTime"
    | "createdTime"
    | "duration"
    | "noSupport"
    | "close"
    | "previous"
    | "next"
    | "details"
    | "download"
    | "seconds",
    string
  >
> = {
  chinese: {
    title: "項目資訊",
    fileName: "檔案名稱",
    fileExtension: "檔案格式",
    uploadTime: "上傳時間",
    untitled: "無標題",
    unknown: "未知",
    size: "檔案大小",
    widthXheight: "寬 x 高",
    createdTime: "建立時間",
    duration: "影片時長",
    noSupport: "您的瀏覽器不支援此媒體格式。",
    close: "關閉",
    previous: "上一個",
    next: "下一個",
    details: "詳細資訊",
    download: "下載項目",
    seconds: "秒",
  },
  english: {
    title: "Item Information",
    fileName: "File Name",
    fileExtension: "File Extension",
    uploadTime: "Upload Time",
    untitled: "Untitled",
    unknown: "Unknown",
    size: "File Size",
    widthXheight: "Width x Height",
    createdTime: "Created Time",
    duration: "Duration",
    noSupport: "Your browser does not support this media format.",
    close: "Close",
    previous: "Previous",
    next: "Next",
    details: "Details",
    download: "Download Item",
    seconds: "seconds",
  },
};

export const useItemPreview = ({
  event,
}: {
  event: Album[number]["events"][number];
}) => {
  const previewModal = useModal({});
  const [itemIndex, setItemIndex] = useState(0);

  /**
   * 打開預覽模態框並設定當前項目索引
   */
  const open = useCallback(
    (index: number) => {
      setItemIndex(index);
      previewModal.open();
    },
    [previewModal]
  );

  /**
   * 預覽內容組件，使用 memo 優化重新渲染
   */
  const Content = useCallback(
    () => (
      <PreviewContent
        event={event}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        close={previewModal.close}
      />
    ),
    [event, itemIndex, previewModal.close]
  );

  return {
    ...previewModal,
    open,
    Content,
  };
};
const NavButton = ({
  icon: Icon,
  className,
  onClick,
  ariaLabel,
}: {
  icon: React.ElementType;
  className: string;
  onClick: () => void;
  ariaLabel: string;
}) => (
  <>
    {/* 大螢幕 */}
    <button
      className={cn(
        "hidden sm:block btn fixed top-1/2 -translate-y-1/2 w-10 h-10 rounded-full",
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon />
    </button>
    {/* 小螢幕 */}
    <button
      className="sm:hidden btn w-full rounded-lg p-1"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon />
    </button>
  </>
);

type PreviewContentProps = {
  event: Album[number]["events"][number];
  itemIndex: number;
  setItemIndex: React.Dispatch<React.SetStateAction<number>>;
  close: () => void;
};

const PreviewContent = memo(
  ({ event, itemIndex, close, setItemIndex }: PreviewContentProps) => {
    const language = useLanguage();
    const itemPreviewContent = ITEM_PREVIEW_CONTENT[language.Current];
    const currentItem = useMemo(
      () => event.items[itemIndex],
      [event.items, itemIndex]
    );
    const isVideo = currentItem?.mimeType?.startsWith("video/") ?? false;
    const title = currentItem.name || itemPreviewContent.untitled;

    /**
     * 切換到上一個項目
     * 如果目前是第一個，則循環到最後一個
     */
    const handlePrevItem = useCallback(() => {
      setItemIndex((prev) => (prev === 0 ? event.items.length - 1 : prev - 1));
    }, [event.items.length, setItemIndex]);

    /**
     * 切換到下一個項目
     * 如果目前是最後一個，則循環到第一個
     */
    const handleNextItem = useCallback(() => {
      setItemIndex((prev) => (prev === event.items.length - 1 ? 0 : prev + 1));
    }, [event.items.length, setItemIndex]);

    const infoModal = useModal({});
    /**
     * 計算項目資訊欄位
     * 根據當前項目的 metadata 動態生成顯示資訊
     * 包含:檔案名稱、格式、建立時間、大小、尺寸、影片時長等
     */
    const mediaInfoFields = useMemo(() => {
      if (!currentItem) {
        return [];
      }

      // 基本資訊欄位
      const baseFields = [
        {
          label: itemPreviewContent.fileName,
          value: currentItem.name || itemPreviewContent.untitled,
        },
        {
          label: itemPreviewContent.fileExtension,
          value: currentItem.fileExtension || itemPreviewContent.unknown,
        },
        {
          label: itemPreviewContent.uploadTime,
          value: currentItem.createdTime
            ? formatDate(currentItem.createdTime, language.Current)
            : itemPreviewContent.unknown,
        },
        {
          label: itemPreviewContent.size,
          value: currentItem.size
            ? `${(Number(currentItem.size) / MB_DIVISOR).toFixed(2)} MB`
            : itemPreviewContent.unknown,
        },
      ];

      // 根據媒體類型添加特定資訊
      const mediaSpecificFields = [];

      if (isVideo && currentItem.videoMediaMetadata) {
        const { width, height, durationMillis } =
          currentItem.videoMediaMetadata;
        mediaSpecificFields.push(
          {
            label: itemPreviewContent.widthXheight,
            value: `${width} x ${height}`,
          },
          {
            label: itemPreviewContent.duration,
            value: durationMillis
              ? formatTime(durationMillis)
              : itemPreviewContent.unknown,
          }
        );
      } else if (currentItem.imageMediaMetadata) {
        const { width, height, time } = currentItem.imageMediaMetadata;
        mediaSpecificFields.push(
          {
            label: itemPreviewContent.widthXheight,
            value: `${width} x ${height}`,
          },
          {
            label: itemPreviewContent.createdTime,
            value: time
              ? formatDate(
                  time.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3"),
                  language.Current
                )
              : itemPreviewContent.unknown,
          }
        );
      }

      return [...baseFields, ...mediaSpecificFields];
    }, [currentItem, itemPreviewContent, language.Current, isVideo]);

    // 避免每次重新計算
    const containerStyle = useMemo(
      () => ({
        width:
          isVideo && currentItem.videoMediaMetadata?.width
            ? `${currentItem.videoMediaMetadata.width}px`
            : currentItem.imageMediaMetadata?.width
            ? `${currentItem.imageMediaMetadata.width}px`
            : "auto",
        height:
          isVideo && currentItem.videoMediaMetadata?.height
            ? `${currentItem.videoMediaMetadata.height}px`
            : currentItem.imageMediaMetadata?.height
            ? `${currentItem.imageMediaMetadata.height}px`
            : "auto",
      }),
      [
        isVideo,
        currentItem.videoMediaMetadata?.width,
        currentItem.videoMediaMetadata?.height,
        currentItem.imageMediaMetadata?.width,
        currentItem.imageMediaMetadata?.height,
      ]
    );

    const navigationButtons = useMemo(
      () => [
        {
          icon: LeftOutlined,
          className: "left-4",
          onClick: handlePrevItem,
          ariaLabel: itemPreviewContent.previous,
        },
        {
          icon: RightOutlined,
          className: "right-4",
          onClick: handleNextItem,
          ariaLabel: itemPreviewContent.next,
        },
      ],
      [
        handlePrevItem,
        itemPreviewContent.previous,
        itemPreviewContent.next,
        handleNextItem,
      ]
    );

    /**
     * 鍵盤快捷鍵監聽
     * - 左箭頭：上一個項目
     * - 右箭頭：下一個項目
     */
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!currentItem) {
          return;
        }
        switch (e.key) {
          case KEYBOARD_KEYS.ARROW_LEFT:
            e.preventDefault();
            handlePrevItem();
            break;
          case KEYBOARD_KEYS.ARROW_RIGHT:
            e.preventDefault();
            handleNextItem();
            break;
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentItem, handleNextItem, handlePrevItem]);

    if (!currentItem) {
      return null;
    }

    return (
      <>
        <div className="fixed top-0 left-0 w-full flex items-center py-4 px-8">
          {/* 關閉按鈕 */}
          <button
            className="text-2xl md:text-3xl text-[var(--text-color-muted)] rounded-full p-2"
            onClick={close}
          >
            <CloseOutlined />
          </button>
          {/* 項目標題和進度 */}
          <div className="flex flex-col min-w-0 ms-2">
            <h3
              title={currentItem.name || itemPreviewContent.untitled}
              className="text-lg md:text-xl font-semibold truncate"
            >
              {currentItem.name}
            </h3>
            {/* 項目計數 (當前/總數) */}
            <span className="text-sm md:text-base text-[var(--text-color-muted)]">
              {itemIndex + 1} / {event.items.length}
            </span>
          </div>
          {/* 右側功能按鈕群組 */}
          <div className="ms-auto text-3xl flex">
            {/* 下載按鈕 */}
            <Link
              className="rounded-full p-2"
              href={currentItem.url || ""}
              download={
                currentItem.name || `${itemIndex}.${currentItem.fileExtension}`
              }
              aria-label={`${itemPreviewContent.download} ${currentItem.name}`}
            >
              <DownloadOutlined />
            </Link>
            {/* 項目資訊按鈕 */}
            <button
              className="rounded-full p-2"
              aria-label={itemPreviewContent.details}
              onClick={infoModal.open}
            >
              <InfoCircleOutlined />
            </button>
          </div>
        </div>
        {/* 主要項目顯示區域 */}
        <div
          className="select-none max-w-[90vw] max-h-[80vh]"
          style={containerStyle}
        >
          {isVideo ? (
            <video
              src={currentItem.url}
              poster={currentItem.thumbnailLink || undefined}
              className="w-full h-full object-contain"
              controls
              preload="metadata"
              width={currentItem.videoMediaMetadata?.width}
              height={currentItem.videoMediaMetadata?.height}
              title={title}
            >
              <p className="text-center p-4 text-[var(--text-color-muted)]">
                {itemPreviewContent.noSupport}
              </p>
            </video>
          ) : (
            <MyImage
              src={currentItem.url}
              fallbackSrc={currentItem.thumbnailLink}
              className="w-full h-full object-contain"
              alt={title}
              title={title}
              width={currentItem.imageMediaMetadata?.width}
              height={currentItem.imageMediaMetadata?.height}
            />
          )}
        </div>

        {/* 手機版按鈕容器 */}
        <div className="fixed sm:hidden w-4/5 grid grid-cols-2 bottom-4 gap-3">
          {navigationButtons.map((item, i) => (
            <NavButton key={i} {...item} />
          ))}
        </div>
        {/* 大螢幕按鈕 */}
        {navigationButtons.map((item, i) => (
          <NavButton key={i} {...item} />
        ))}

        {/* 項目資訊彈出視窗 */}
        <infoModal.Container>
          <div className="card flex flex-col p-6 min-w-[280px] max-w-[90vw]">
            {/* 資訊視窗標頭 */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
              <h3 className="text-xl font-semibold bg-gradient-to-br  from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent">
                {itemPreviewContent.title}
              </h3>
              {/* 關閉資訊視窗按鈕 */}
              <button
                className="text-xl text-[var(--text-color-muted)] rounded-full p-2"
                onClick={infoModal.close}
                aria-label={itemPreviewContent.close}
              >
                <CloseOutlined />
              </button>
            </div>

            {/* 項目資訊內容 */}
            <div className="space-y-4">
              {/* 動態渲染所有項目資訊欄位 */}
              {mediaInfoFields.map((info, i) => (
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
      </>
    );
  }
);

PreviewContent.displayName = "PreviewContent";
