"use client";
import { forwardRef, useCallback, useState } from "react";
import { OverrideProps } from "fanyucomponents";

/**
 * @interface MyImageProps
 * @extends {React.ImgHTMLAttributes<HTMLImageElement>}
 * @description 自訂圖片組件的屬性介面，繼承自標準 img 標籤屬性
 */
export type MyImageProps = OverrideProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  {
    /** 圖片的來源 URL，可以是字串、undefined 或 null。 */
    src: string | undefined | null;
    /**
     * 圖片載入失敗時的最大重試次數
     * @default 3
     */
    maxRetryCount?: number;
    /**
     * 當所有嘗試都失敗時顯示的後備圖片 URL
     * @default FALLBACK_IMAGE
     */
    fallbackSrc?: string | undefined | null;
  }
>;
const FALLBACK_IMAGE =
  "https://fanyu.vercel.app/api/proxy?url=https://www.kleinpaint.ca/cdn/shop/products/444A50.png?v=1666632521&width=713";
const MAX_RETRY_COUNT = 3;

/**
 * 自訂圖片組件 (MyImage)
 *
 * 此組件擴展了標準的 HTML img 元素，提供更強大的圖片載入與錯誤處理機制：
 * - **自動重試機制**：載入失敗時會自動重試，可設定 `maxRetryCount`。
 * - **後備圖片**：當所有來源都失敗時，顯示 `fallbackSrc` 或預設的後備圖片。
 * - **錯誤處理**：整合 Toast 通知與 `onError` 回調。
 * - **國際化支援**：根據當前語言環境顯示錯誤訊息。
 *
 * @component
 * @param {MyImageProps} props - MyImage 組件的屬性
 * @param {string | undefined | null} props.src - 主要圖片來源 URL
 * @param {number} [props.maxRetryCount=3] - 圖片載入失敗時的最大重試次數
 * @param {string | undefined | null} [props.fallbackSrc] - 自訂後備圖片 URL
 * @param {string} [props.alt] - 圖片的替代文字
 * @param {React.ReactEventHandler<HTMLImageElement>} [props.onError] - 自訂錯誤處理回調
 * @param {React.Ref<HTMLImageElement>} ref - 轉發到 img 元素的 ref
 * @returns {JSX.Element} 渲染的圖片元素
 *
 * @example
 * // 基本用法
 * ```tsx
 * <MyImage
 *   src="https://example.com/image.jpg"
 *   alt="範例圖片"
 *   className="w-full h-auto"
 * />
 * ```
 */
export const MyImage = forwardRef<HTMLImageElement, MyImageProps>(
  (
    {
      src,
      alt,
      onError,
      maxRetryCount = MAX_RETRY_COUNT,
      fallbackSrc,
      ...rest
    },
    ref
  ) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [retryCount, setRetryCount] = useState<number>(0);
    const [prevSrc, setPrevSrc] = useState<string | undefined | null>(src);

    if (src !== prevSrc) {
      setPrevSrc(src);
      setHasError(false);
      setRetryCount(0);
    }

    const handleImageError: React.ReactEventHandler<HTMLImageElement> =
      useCallback(
        (e) => {
          console.error("圖片加載失敗", e);

          if (hasError || !src) {
            if (onError) onError(e);
            return;
          }

          if (retryCount < maxRetryCount) {
            // 使用帶有重試計數的查詢參數重新載入圖片
            setTimeout(
              () => setRetryCount((prev) => prev + 1),
              500 * (retryCount + 1)
            );
          } else {
            setHasError(true);
          }
        },
        [src, hasError, onError, retryCount, maxRetryCount]
      );

    const finalSrc =
      hasError || !src
        ? fallbackSrc || FALLBACK_IMAGE
        : `${src}${src.includes("?") ? "&" : "?"}fanyuRetry=${retryCount}`;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        draggable={hasError ? false : undefined}
        src={finalSrc}
        ref={ref}
        alt={alt}
        onError={handleImageError}
        data-origin-src={src}
        data-retry-count={retryCount}
        data-has-error={hasError}
        {...rest}
      />
    );
  }
);
MyImage.displayName = "MyImage";