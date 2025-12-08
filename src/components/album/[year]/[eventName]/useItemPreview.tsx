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
  LoadingOutlined,
} from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, memo, useRef } from "react";

// ==================== 常數定義 ====================

/**
 * 檔案大小計算常數
 * 用於將 bytes 轉換為 MB (1MB = 1024 * 1024 bytes)
 */
const MB_DIVISOR = 1024 * 1024;

/**
 * 鍵盤快捷鍵常數
 * 定義支援的鍵盤導航按鍵
 */
const KEYBOARD_KEYS = {
  /** 左箭頭鍵 - 上一個項目 */
  ARROW_LEFT: "ArrowLeft",
  /** 右箭頭鍵 - 下一個項目 */
  ARROW_RIGHT: "ArrowRight",
} as const;

/**
 * 項目預覽介面的多語言文字內容
 *
 * 包含所有預覽功能相關的文字標籤，支援中英文切換。
 * 涵蓋項目資訊顯示、操作按鈕、錯誤訊息等各種文字內容。
 *
 * @constant
 * @type {LanguageContent<Record<string, string>>}
 */
const ITEM_PREVIEW_CONTENT: LanguageContent<
  Record<
    | "title" // 項目資訊標題
    | "fileName" // 檔案名稱標籤
    | "fileExtension" // 檔案格式標籤
    | "untitled" // 無標題時的預設文字
    | "unknown" // 未知資訊的預設文字
    | "size" // 檔案大小標籤
    | "widthXheight" // 尺寸資訊標籤
    | "uploadTime" // 上傳時間標籤
    | "createdTime" // 建立時間標籤
    | "duration" // 影片時長標籤
    | "noSupport" // 不支援格式的錯誤訊息
    | "close" // 關閉按鈕文字
    | "details" // 詳細資訊按鈕文字
    | "download" // 下載按鈕文字
    | "seconds", // 時間單位：秒
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
    details: "Details",
    download: "Download Item",
    seconds: "seconds",
  },
};

/**
 * 相簿項目預覽 Hook
 *
 * 提供相簿項目的預覽功能，包含模態框控制、項目導航、詳細資訊顯示等功能
 *
 * @param items - 相簿項目陣列，包含圖片和影片等媒體檔案
 * @returns 返回預覽模態框的狀態和操作方法
 *
 * @example
 * ```tsx
 * const { open, close, Content, isOpen } = useItemPreview(albumItems);
 *
 * // 開啟第三個項目的預覽
 * open(2);
 *
 * // 渲染預覽內容
 * {isOpen && <Content />}
 * ```
 *
 * @features
 * - 🖼️ 支援圖片和影片預覽
 * - ⌨️ 鍵盤快捷鍵導航 (左右箭頭)
 * - 📱 響應式設計，適配桌面和行動裝置
 * - 📋 詳細的媒體資訊顯示
 * - 💾 下載功能
 * - 🔄 循環導航 (最後一個到第一個)
 */
export const useItemPreview = (
  items: Album[number]["events"][number]["items"]
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = useCallback(() => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    document.body.style.overflow = "";
    setIsModalOpen(false);
  }, []);

  const previewModal = useModal({
    onOpen: handleOpen,
    onClose: handleClose,
  });

  const [itemIndex, setItemIndex] = useState(0);

  /**
   * 打開預覽模態框並設定當前項目索引
   *
   * @param index - 要預覽的項目索引 (0-based)
   *
   * @example
   * ```tsx
   * // 打開第一個項目的預覽
   * open(0);
   *
   * // 打開最後一個項目的預覽
   * open(items.length - 1);
   * ```
   */
  const open = useCallback(
    (index: number) => {
      setItemIndex(index);
      previewModal.open();
    },
    [previewModal]
  );

  /**
   * 預覽內容元素
   *
   * 直接返回 React Element 而不是 Component，這樣可以避免 Component 重新定義導致的 Remount 問題。
   * 當 itemIndex 改變時，這個 Element 會被重新建立，但 React 只會更新 Props 而不會卸載組件。
   * 這樣 CSS transition 動畫就能正常運作。
   */
  const Content = (
    <PreviewContent
      items={items}
      itemIndex={itemIndex}
      setItemIndex={setItemIndex}
      close={previewModal.close}
      isOpen={isModalOpen}
    />
  );

  return {
    ...previewModal,
    open,
    Content,
  };
};

/**
 * 計算項目資訊欄位的 Hook
 */
const useMediaInfoFields = (
  currentItem: Album[number]["events"][number]["items"][number] | undefined
) => {
  const language = useLanguage();
  const content = ITEM_PREVIEW_CONTENT[language.Current];
  const isVideo = currentItem?.mimeType?.startsWith("video/") ?? false;
  return useMemo(() => {
    if (!currentItem) return [];

    const baseFields = [
      {
        label: content.fileName,
        value: currentItem.name || content.untitled,
      },
      {
        label: content.fileExtension,
        value: currentItem.fileExtension || content.unknown,
      },
      {
        label: content.uploadTime,
        value: currentItem.createdTime
          ? formatDate(currentItem.createdTime, language.Current)
          : content.unknown,
      },
      {
        label: content.size,
        value: currentItem.size
          ? `${(Number(currentItem.size) / MB_DIVISOR).toFixed(2)} MB`
          : content.unknown,
      },
    ];

    const mediaSpecificFields = [];

    if (isVideo && currentItem.videoMediaMetadata) {
      const { width, height, durationMillis } = currentItem.videoMediaMetadata;
      mediaSpecificFields.push(
        {
          label: content.widthXheight,
          value: `${width} x ${height}`,
        },
        {
          label: content.duration,
          value: durationMillis ? formatTime(durationMillis) : content.unknown,
        }
      );
    } else if (currentItem.imageMediaMetadata) {
      const { width, height, time } = currentItem.imageMediaMetadata;
      mediaSpecificFields.push(
        {
          label: content.widthXheight,
          value: `${width} x ${height}`,
        },
        {
          label: content.createdTime,
          value: time
            ? formatDate(
                time.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3"),
                language.Current
              )
            : content.unknown,
        }
      );
    }

    return [...baseFields, ...mediaSpecificFields];
  }, [currentItem, content, language.Current, isVideo]);
};

const PreviewHeader = memo(
  ({
    currentItem,
    itemIndex,
    totalItems,
    close,
    openInfo,
  }: {
    currentItem: Album[number]["events"][number]["items"][number];
    itemIndex: number;
    totalItems: number;
    close: () => void;
    openInfo: () => void;
  }) => {
    const language = useLanguage();
    const content = ITEM_PREVIEW_CONTENT[language.Current];

    return (
      <div className="py-4 px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          {/* 關閉按鈕 */}
          <button
            className="text-2xl md:text-3xl text-(--text-color-muted) rounded-full p-2"
            onClick={close}
            aria-label={content.close}
            data-action="close-preview"
          >
            <CloseOutlined />
          </button>

          {/* 標題 + 計數 */}
          <div className="min-w-0 overflow-hidden truncate">
            <h3
              title={currentItem.name || content.untitled}
              className="text-lg md:text-xl font-semibold truncate"
              data-testid="preview-title"
            >
              {currentItem.name}
            </h3>

            <span 
              className="text-sm md:text-base text-(--text-color-muted)"
              data-testid="preview-counter"
            >
              {itemIndex + 1} / {totalItems}
            </span>
          </div>

          {/* 右側功能按鈕群組 */}
          <div className="text-3xl">
            {/* 下載按鈕 */}
            <Link
              className="rounded-full p-2 inline-block"
              href={currentItem.url || ""}
              download={
                currentItem.name || `${itemIndex}.${currentItem.fileExtension}`
              }
              aria-label={`${content.download} ${currentItem.name}`}
              data-action="download-item"
            >
              <DownloadOutlined />
            </Link>
            {/* 項目資訊按鈕 */}
            <button
              className="rounded-full p-2"
              aria-label={content.details}
              onClick={openInfo}
              data-action="open-info"
            >
              <InfoCircleOutlined />
            </button>
          </div>
        </div>
      </div>
    );
  }
);
PreviewHeader.displayName = "PreviewHeader";

const PreviewMain = memo(
  ({
    currentItem,
    isVideo,
    isLoaded,
    setIsLoaded,
    handleBackgroundClick,
  }: {
    currentItem: Album[number]["events"][number]["items"][number];
    isVideo: boolean;
    isLoaded: boolean;
    setIsLoaded: (loaded: boolean) => void;
    handleBackgroundClick: (e: React.MouseEvent) => void;
  }) => {
    const language = useLanguage();
    const content = ITEM_PREVIEW_CONTENT[language.Current];
    const title = currentItem.name || content.untitled;

    return (
      <div
        className="h-auto p-3 flex items-center justify-center overflow-hidden"
        onClick={handleBackgroundClick}
        data-testid="preview-main-container"
        data-media-type={isVideo ? "video" : "image"}
      >
        <div className="h-full w-fit max-h-[80vh] max-w-[80vw]">
          {isVideo ? (
            <video
              src={currentItem.url}
              poster={currentItem.thumbnailLink || undefined}
              controls
              preload="metadata"
              title={title}
              className="w-auto h-full"
              data-testid="preview-video"
            />
          ) : (
            <div 
              className="relative h-full w-auto flex items-center justify-center"
              data-loaded={isLoaded}
              data-testid="preview-image-container"
            >
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-3xl">
                  {currentItem.thumbnailLink && (
                    <MyImage
                      src={currentItem.thumbnailLink}
                      alt={title}
                      className="absolute inset-0 h-full w-full object-contain blur-xs opacity-70"
                    />
                  )}
                  <LoadingOutlined />
                </div>
              )}
              <MyImage
                src={currentItem.url}
                fallbackSrc={currentItem.thumbnailLink}
                alt={title}
                title={title}
                width={currentItem.imageMediaMetadata?.width}
                height={currentItem.imageMediaMetadata?.height}
                className={cn(
                  "h-full w-auto object-contain transition-opacity duration-300",
                  {
                    "opacity-0": !isLoaded,
                  }
                )}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);
PreviewMain.displayName = "PreviewMain";

const InfoModalContent = memo(
  ({
    mediaInfoFields,
    close,
  }: {
    mediaInfoFields: { label: string; value: string }[];
    close: () => void;
  }) => {
    const language = useLanguage();
    const content = ITEM_PREVIEW_CONTENT[language.Current];

    return (
      <div 
        className="card flex flex-col w-full max-w-[calc(100vw-1rem)] sm:max-w-[85vw] md:max-w-[700px] lg:max-w-[800px] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)] p-4 md:p-6 lg:p-8"
        data-testid="info-modal-content"
      >
        {/* 資訊視窗標頭 */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6 lg:mb-8 pb-3 sm:pb-4 md:pb-5 border-b border-(--border-color) shrink-0">
          <h3 className="uppercase text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold bg-linear-to-br from-(--text-color-primary) to-(--text-color-secondary) bg-clip-text text-transparent leading-tight">
            {content.title}
          </h3>
          {/* 關閉資訊視窗按鈕 */}
          <button
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-(--text-color-muted) rounded-full p-1.5 sm:p-2 md:p-2.5 lg:p-3 shrink-0"
            onClick={close}
            aria-label={content.close}
            data-action="close-info"
          >
            <CloseOutlined />
          </button>
        </div>

        {/* 項目資訊內容 */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 pb-2">
            {/* 動態渲染所有項目資訊欄位 */}
            {mediaInfoFields.map((info, i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-(--background-color-secondary) border border-(--border-color)"
              >
                <div className="text-xs sm:text-sm md:text-base font-medium text-(--text-color-muted) tracking-wide leading-tight">
                  {info.label}
                </div>
                <div className="break-all text-sm sm:text-base md:text-lg font-semibold leading-relaxed flex-1">
                  <span title={info.value}>{info.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
InfoModalContent.displayName = "InfoModalContent";

type PreviewContentProps = {
  /** 相簿項目陣列，包含圖片、影片等媒體檔案及其元數據 */
  items: Album[number]["events"][number]["items"];
  /** 當前正在預覽的項目索引 */
  itemIndex: number;
  /** 設定項目索引的 React 狀態更新函式 */
  setItemIndex: React.Dispatch<React.SetStateAction<number>>;
  /** 關閉預覽視窗的回調函式 */
  close: () => void;
  /** 模態框是否開啟 */
  isOpen: boolean;
};

/**
 * 預覽內容主組件
 *
 * 處理單個媒體項目的完整預覽體驗，包含：
 * - 圖片/影片的顯示和播放
 * - 項目資訊的詳細展示
 * - 鍵盤導航支援
 * - 下載功能
 * - 響應式佈局適配
 *
 * 使用 React.memo 優化重新渲染性能
 *
 * @param items - 完整的項目陣列
 * @param itemIndex - 當前顯示項目的索引
 * @param close - 關閉預覽的回調函數
 * @param setItemIndex - 設定項目索引的狀態更新函數
 */
const PreviewContent = memo(
  ({ items, itemIndex, close, setItemIndex, isOpen }: PreviewContentProps) => {
    const currentItem = useMemo(() => items[itemIndex], [items, itemIndex]);
    const isVideo = currentItem?.mimeType?.startsWith("video/") ?? false;

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      setIsLoaded(false);
    }, [itemIndex]);

    /**
     * 預載圖片
     *
     * 當前圖片顯示時，預先載入前後幾張圖片，以提升切換時的流暢度
     */
    useEffect(() => {
      if (!items || items.length === 0) return;

      const preloadImage = (index: number) => {
        const item = items[index];
        if (item && !isVideo && item.url) {
          const img = new Image();
          img.src = item.url;
        }
      };

      const len = items.length;
      // 預載下一張
      preloadImage((itemIndex + 1) % len);
      // 預載上一張
      preloadImage((itemIndex - 1 + len) % len);
    }, [isVideo, itemIndex, items]);

    /**
     * 切換到上一個項目
     */
    const handlePrevItem = useCallback(() => {
      setItemIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    }, [items.length, setItemIndex]);

    /**
     * 切換到下一個項目
     */
    const handleNextItem = useCallback(() => {
      setItemIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, [items.length, setItemIndex]);

    const handleBackgroundClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          close();
        }
      },
      [close]
    );

    const infoModal = useModal({});
    const mediaInfoFields = useMediaInfoFields(currentItem);

    /**
     * 鍵盤快捷鍵監聽器
     *
     * 提供鍵盤導航功能，增強使用者體驗：
     * - ⬅️ 左箭頭鍵：切換到上一個項目
     * - ➡️ 右箭頭鍵：切換到下一個項目
     *
     * 🔒 安全檢查：
     * - 只在有有效 currentItem 時才處理鍵盤事件
     * - 使用 preventDefault() 防止瀏覽器預設行為
     *
     * 🧹 清理機制：
     * - 組件卸載時自動移除事件監聽器，防止記憶體洩漏
     */
    useEffect(() => {
      if (!isOpen) {
        return;
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case KEYBOARD_KEYS.ARROW_LEFT:
            e.preventDefault(); // 防止頁面滾動
            handlePrevItem();
            break;
          case KEYBOARD_KEYS.ARROW_RIGHT:
            e.preventDefault(); // 防止頁面滾動
            handleNextItem();
            break;
        }
      };

      const handleScroll = (e: WheelEvent) => {
        if (e.ctrlKey) return; // 允許 Ctrl + 滾輪 用於縮放
        e.preventDefault();
        const delta = e.deltaY;
        if (delta > 0) {
          handleNextItem();
        } else if (delta < 0) {
          handlePrevItem();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("wheel", handleScroll, { passive: false });
      // 清理函數：組件卸載時移除監聽器
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("wheel", handleScroll);
      };
    }, [handleNextItem, handlePrevItem, isOpen]);

    if (!currentItem) {
      return null;
    }

    return (
      <>
        <div 
          className="w-screen h-full grid grid-rows-[auto_1fr_4rem] md:grid-rows-[auto_1fr_5rem]"
          data-testid="preview-content"
        >
          <PreviewHeader
            currentItem={currentItem}
            itemIndex={itemIndex}
            totalItems={items.length}
            close={close}
            openInfo={infoModal.open}
          />

          <PreviewMain
            currentItem={currentItem}
            isVideo={isVideo}
            isLoaded={isLoaded}
            setIsLoaded={setIsLoaded}
            handleBackgroundClick={handleBackgroundClick}
          />

          {/* 底部縮圖導航列 */}
          <ThumbnailsBar
            items={items}
            currIndex={itemIndex}
            setCurrIndex={setItemIndex}
            className="overflow-hidden pb-2"
            isOpen={isOpen}
          />
        </div>

        {/* 項目資訊彈出視窗 */}
        <infoModal.Container className="bg-black/25 flex items-center justify-center p-4">
          <InfoModalContent
            mediaInfoFields={mediaInfoFields}
            close={infoModal.close}
          />
        </infoModal.Container>
      </>
    );
  }
);

PreviewContent.displayName = "PreviewContent";

type ThumbnailsBarProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    items: Album[number]["events"][number]["items"];
    currIndex: number;
    setCurrIndex: React.Dispatch<React.SetStateAction<number>>;
    isOpen: boolean;
    children?: never;
  }
>;

const ThumbnailsBar = memo(
  ({ items, currIndex, setCurrIndex, isOpen, ...rest }: ThumbnailsBarProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 當 currIndex 改變時，自動捲動到該項目
    useEffect(() => {
      if (isOpen && scrollContainerRef.current) {
        const activeItem = scrollContainerRef.current.children[
          currIndex
        ] as HTMLElement;
        if (activeItem) {
          activeItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, [currIndex, isOpen]);

    return (
      <div {...rest} data-testid="thumbnails-bar">
        <div
          ref={scrollContainerRef}
          className="flex h-full items-center gap-1 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              className={cn(
                "h-full aspect-square rounded-xl shrink-0 transition-all duration-300",
                {
                  "btn opacity-60 hover:opacity-100": index !== currIndex,
                  "btn-tertiary": index === currIndex,
                }
              )}
              onClick={() => setCurrIndex(index)}
              aria-label={`選擇項目 ${index + 1}: ${item.name}`}
              aria-current={index === currIndex ? "true" : undefined}
              data-index={index}
              data-active={index === currIndex}
            >
              <MyImage
                draggable={false}
                className="w-full h-full object-cover"
                src={item.thumbnailLink || item.url}
                alt={`縮圖 ${index + 1} - ${item.name}`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ThumbnailsBar.displayName = "ThumbnailsBar";
