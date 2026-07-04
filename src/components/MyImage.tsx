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
    /**
     * 當圖片載入失敗時顯示的後備圖片 URL
     * @default FALLBACK_IMAGE
     */
    fallbackSrc?: string | undefined;
  }
>;

const FALLBACK_IMAGE =
  "https://fanyu.vercel.app/api/proxy?url=https://www.kleinpaint.ca/cdn/shop/products/444A50.png?v=1666632521&width=713";

/**
 * 自訂圖片組件 (MyImage)
 *
 * 此組件擴展了標準的 HTML img 元素，提供簡單的錯誤處理機制：
 * - **後備圖片**：當來源載入失敗時，改顯示 `fallbackSrc` 或預設的後備圖片。
 * - **來源切換重置**：當 `src` 變更時自動重置錯誤狀態，重新嘗試載入新來源。
 *
 * @component
 * @param {MyImageProps} props - MyImage 組件的屬性
 * @param {string | undefined | null} props.src - 主要圖片來源 URL
 * @param {string | undefined} [props.fallbackSrc] - 自訂後備圖片 URL
 * @param {string} [props.alt] - 圖片的替代文字
 * @param {React.ReactEventHandler<HTMLImageElement>} [props.onError] - 自訂錯誤處理回調
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
 */
export const MyImage = forwardRef<HTMLImageElement, MyImageProps>(
  ({ src, alt, onError, fallbackSrc, ...rest }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [prevSrc, setPrevSrc] = useState(src);

    if (src !== prevSrc) {
      setPrevSrc(src);
      setHasError(false);
    }

    const handleImageError: React.ReactEventHandler<HTMLImageElement> =
      useCallback(
        (e) => {
          console.error("圖片載入失敗", e);
          setHasError(true);
          onError?.(e);
        },
        [onError],
      );

    const finalSrc = hasError || !src ? fallbackSrc || FALLBACK_IMAGE : src;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src={finalSrc}
        alt={alt}
        onError={handleImageError}
        data-origin-src={src ?? undefined}
        data-has-error={hasError}
        {...rest}
      />
    );
  },
);
MyImage.displayName = "MyImage";
