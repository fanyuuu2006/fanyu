import { forwardRef, useCallback, useEffect, useState } from "react";
import { FALLBACK_IMAGE } from "@/libs/album";
import { useLanguage } from "@/contexts/LanguageContext";
import { OverrideProps } from "fanyucomponents";

/**
 * @interface MyImageProps
 * @extends {React.ImgHTMLAttributes<HTMLImageElement>}
 * @description 自訂圖片組件的屬性介面，繼承自標準 img 標籤屬性
 */
export type MyImageProps = OverrideProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  {
    /** 圖片的來源 URL，可以是字串、undefined 或 null。優先級高於 srcArray */
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
    /** 
     * 圖片來源陣列，當 src 為空或載入失敗時，會依序嘗試此陣列中的 URL 
     */
    srcArray?: string[] | undefined | null;
  }
>;

const IMAGE_CONTENT = {
  chinese: {
    imageLoadFailed: "載入圖片失敗",
  },
  english: {
    imageLoadFailed: "Image Load Failed",
  },
};
const MAX_RETRY_COUNT = 3;

/**
 * 自訂圖片組件 (MyImage)
 *
 * 此組件擴展了標準的 HTML img 元素，提供更強大的圖片載入與錯誤處理機制：
 * - **多重來源支援**：可透過 `src` 或 `srcArray` 提供圖片來源。
 * - **自動重試機制**：載入失敗時會自動重試，可設定 `maxRetryCount`。
 * - **後備圖片**：當所有來源都失敗時，顯示 `fallbackSrc` 或預設的後備圖片。
 * - **錯誤處理**：整合 Toast 通知與 `onError` 回調。
 * - **國際化支援**：根據當前語言環境顯示錯誤訊息。
 *
 * @component
 * @param {MyImageProps} props - MyImage 組件的屬性
 * @param {string | undefined | null} props.src - 主要圖片來源 URL
 * @param {string[] | undefined | null} [props.srcArray] - 備用圖片來源陣列，當 src 失敗或未提供時使用
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
 *
 * @example
 * // 使用多個來源與自訂重試次數
 * ```tsx
 * <MyImage
 *   src={primaryUrl}
 *   srcArray={[backupUrl1, backupUrl2]}
 *   maxRetryCount={5}
 *   fallbackSrc="/images/custom-fallback.png"
 *   alt="具有備援機制的圖片"
 * />
 * ```
 */
export const MyImage = forwardRef<HTMLImageElement, MyImageProps>(
  (
    {
      src,
      srcArray,
      alt,
      onError,
      maxRetryCount = MAX_RETRY_COUNT,
      fallbackSrc,
      ...rest
    },
    ref
  ) => {
    const language = useLanguage();
    const imageContent = IMAGE_CONTENT[language.Current];
    const [hasError, setHasError] = useState<boolean>(false);
    const [srcIndex, setSrcIndex] = useState<number>(src ? -1 : 0);
    const [retryCount, setRetryCount] = useState<number>(0);

    useEffect(() => {
      setSrcIndex(src ? -1 : 0);
      setRetryCount(0);
      setHasError(false);
    }, [src, srcArray]);

    const handleImageError: React.ReactEventHandler<HTMLImageElement> =
      useCallback(
        (e) => {
          console.error(imageContent.imageLoadFailed, e);
          const currentActiveSrc = srcIndex === -1 ? src : srcArray?.[srcIndex];

          if (hasError || !currentActiveSrc) {
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
            const nextIndex = srcIndex + 1;
            if (srcArray && nextIndex < srcArray.length) {
              setSrcIndex(nextIndex);
              setRetryCount(0);
            } else {
              setHasError(true);
            }
          }
        },
        [
          imageContent.imageLoadFailed,
          srcIndex,
          src,
          srcArray,
          hasError,
          onError,
          retryCount,
          maxRetryCount,
        ]
      );

    const activeSrc = srcIndex === -1 ? src : srcArray?.[srcIndex];
    const finalSrc =
      hasError || !activeSrc
        ? fallbackSrc || FALLBACK_IMAGE
        : `${activeSrc}${
            activeSrc.includes("?") ? "&" : "?"
          }fanyuRetry=${retryCount}`;

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
        data-src-index={srcIndex}
        data-has-error={hasError}
        data-src-array={srcArray ? srcArray.join(", ") : undefined}
        {...rest}
      />
    );
  }
);
MyImage.displayName = "MyImage";
