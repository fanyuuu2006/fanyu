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
  const previewModal = useModal({});
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
   * 預覽內容組件，使用 memo 優化重新渲染
   *
   * 渲染完整的預覽介面，包含：
   * - 媒體內容顯示 (圖片/影片)
   * - 導航控制按鈕
   * - 項目資訊視窗
   * - 下載功能
   *
   * 使用 useCallback 避免不必要的重新渲染，提升性能
   */
  const Content = useCallback(
    () => (
      <PreviewContent
        items={items}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
        close={previewModal.close}
      />
    ),
    [items, itemIndex, previewModal.close]
  );

  return {
    ...previewModal,
    open,
    Content,
  };
};

/**
 * 導航按鈕組件
 *
 * 提供上一個/下一個項目的導航功能，支援響應式佈局：
 * - 桌面版：固定在左右兩側的圓形按鈕
 * - 行動版：底部的兩個按鈕
 *
 * @param handlePrev - 切換到上一個項目的回調函數
 * @param handleNext - 切換到下一個項目的回調函數
 */
const NavgationButtons = ({
  handlePrev,
  handleNext,
}: {
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  // 導航按鈕配置，使用 useMemo 優化性能
  const navigationButtons = useMemo(
    () => [
      {
        icon: LeftOutlined,
        className: "left-4", // 左側定位
        onClick: handlePrev,
      },
      {
        icon: RightOutlined,
        className: "right-4", // 右側定位
        onClick: handleNext,
      },
    ],
    [handlePrev, handleNext]
  );
  return (
    <>
      {/* 左右導航按鈕 */}
      {navigationButtons.map((item, i) => (
        <button
          key={i}
          className={cn(
            "hidden sm:block btn fixed top-1/2 -translate-y-1/2 w-10 h-10 rounded-full",
            item.className
          )}
          onClick={item.onClick}
        >
          <item.icon />
        </button>
      ))}
      {/* <div className="fixed sm:hidden w-4/5 grid grid-cols-2 bottom-4 gap-2">
        {navigationButtons.map((item, i) => (
          <button
            key={i}
            className={cn("btn w-full rounded-lg p-1")}
            onClick={item.onClick}
          >
            <item.icon />
          </button>
        ))}
      </div> */}
    </>
  );
};

type PreviewContentProps = {
  /** 相簿項目陣列，包含圖片、影片等媒體檔案及其元數據 */
  items: Album[number]["events"][number]["items"];
  /** 當前正在預覽的項目索引 */
  itemIndex: number;
  /** 設定項目索引的 React 狀態更新函式 */
  setItemIndex: React.Dispatch<React.SetStateAction<number>>;
  /** 關閉預覽視窗的回調函式 */
  close: () => void;
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
  ({ items, itemIndex, close, setItemIndex }: PreviewContentProps) => {
    const language = useLanguage();
    const itemPreviewContent = ITEM_PREVIEW_CONTENT[language.Current];
    const currentItem = useMemo(() => items[itemIndex], [items, itemIndex]);
    const isVideo = currentItem?.mimeType?.startsWith("video/") ?? false;
    const title = currentItem.name || itemPreviewContent.untitled;

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

    const infoModal = useModal({});
    /**
     * 計算項目資訊欄位
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

    /**
     * 動態計算容器樣式
     */
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
      const handleKeyDown = (e: KeyboardEvent) => {
        // 安全檢查：確保當前有有效的項目
        if (!currentItem) {
          return;
        }

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

      // 註冊全域鍵盤事件監聽器
      window.addEventListener("keydown", handleKeyDown);

      // 清理函數：組件卸載時移除監聽器
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
              {itemIndex + 1} / {items.length}
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

        <NavgationButtons
          handlePrev={handlePrevItem}
          handleNext={handleNextItem}
        />
        <ThumbnailsBar
          items={items}
          currIndex={itemIndex}
          setCurrIndex={setItemIndex}
          className="absolute bottom-4 w-full overflow-hidden"
        />

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

type ThumbnailsBarProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    items: Album[number]["events"][number]["items"];
    currIndex: number;
    setCurrIndex: React.Dispatch<React.SetStateAction<number>>;
    children?: never;
  }
>;
const ThumbnailsBar = ({
  items,
  currIndex,
  setCurrIndex,
  ...rest
}: ThumbnailsBarProps) => {
  const contaionRef = useRef<HTMLDivElement>(null);
  return (
    <div {...rest}>
      <div
        ref={contaionRef}
        className={
          "relative h-16 aspect-square mx-auto transition-all duration-500"
        }
      >
        {items.map((item, i) => {
          return (
            <button
              key={item.name}
              className={cn(
                "absolute top-0 left-0",
                "w-full h-full bg-[var(--background-color)] overflow-hidden rounded-lg",
                "will-change-transform transition-all duration-500",
                {
                  "opacity-50 scale-95": i !== currIndex,
                }
              )}
              onClick={() => {
                if (i !== currIndex) setCurrIndex(i);
              }}
              style={{
                transform: `translateX(${(i - currIndex) * 105}%)`,
              }}
            >
              <MyImage
                draggable={false}
                className="w-full h-full object-cover"
                src={item.thumbnailLink || item.url}
                alt={`${i}-${item.name}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
