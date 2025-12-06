import { forwardRef, useCallback, useState } from "react";
import { FALLBACK_IMAGE } from "@/libs/album";
import { useLanguage } from "@/contexts/LanguageContext";
import { OverrideProps } from "fanyucomponents";

/**
 * @interface MyImageProps
 * @extends {React.ImgHTMLAttributes<HTMLImageElement>}
 */
export type MyImageProps = OverrideProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  {
    /** 圖片的來源 URL，可以是字串、undefined 或 null */
    src: string | undefined | null;
    maxRetryCount?: number;
    fallbackSrc?: string | undefined | null;
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
 * 自訂圖片組件
 *
 * 此組件擴展了標準的 HTML img 元素：
 * - 當原始圖片載入失敗時顯示後備圖片
 * - 發生錯誤時顯示 Toast 通知
 * - 根據當前語言環境支援中文和英文錯誤訊息
 *
 * @component
 * @param {MyImageProps} props - MyImage 組件的屬性
 * @param {string | undefined | null} props.src - 圖片的來源 URL
 * @param {string} [props.alt] - 圖片的替代文字
 * @param {React.ReactEventHandler<HTMLImageElement>} [props.onError] - 自訂錯誤處理器
 * @param {React.Ref<HTMLImageElement>} ref - 轉發到 img 元素的 ref
 * @returns {JSX.Element} 渲染的圖片元素
 *
 * @example
 * ```tsx
 * <MyImage
 *   src="https://example.com/image.jpg"
 *   alt="範例圖片"
 *   className="w-full h-auto"
 * />
 * ```
 *
 * @example
 * // 使用錯誤處理
 * ```tsx
 * <MyImage
 *   src={imageUrl}
 *   alt="使用者頭像"
 *   onError={(e) => console.log('自訂錯誤處理', e)}
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
    const language = useLanguage();
    const imageContent = IMAGE_CONTENT[language.Current];
    const [hasError, setHasError] = useState<boolean>(false);
    const [retryCount, setRetryCount] = useState<number>(0);

    const handleImageError: React.ReactEventHandler<HTMLImageElement> =
      useCallback(
        (e) => {
          console.error(imageContent.imageLoadFailed, e);
          if (retryCount < maxRetryCount && src) {
            // 使用帶有重試計數的查詢參數重新載入圖片
            setTimeout(
              () => setRetryCount((prev) => prev + 1),
              500 * (retryCount + 1)
            );
          } else {
            setHasError(true);
          }

          if (onError) onError(e);
        },
        [imageContent.imageLoadFailed, maxRetryCount, onError, retryCount, src]
      );
    const finalSrc =
      hasError || !src
        ? fallbackSrc || FALLBACK_IMAGE
        : `${src}${src.includes("?") ? "&" : "?"}fanyuRetry=${retryCount}`;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={finalSrc}
        ref={ref}
        alt={alt}
        onError={handleImageError}
        data-origin-src={src}
        data-retry-count={retryCount}
        {...rest}
      />
    );
  }
);
MyImage.displayName = "MyImage";
