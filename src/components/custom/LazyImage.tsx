import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";
import { forwardRef, useState } from "react";

type LazyImageContent = Record<"imageLoadFailed", string>;

const getLazyImageContent = (language: LanguageOption): LazyImageContent =>
  ((
    {
      chinese: { imageLoadFailed: "載入圖片失敗" },
      english: { imageLoadFailed: "Image Load Failed" },
    } as LanguageContent<LazyImageContent>
  )[language]);

export type LazyImageProps = OverrideProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  { loading?: boolean; src?: string }
>;

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  (
    { loading = false, src, alt, className = "", ...rest }: LazyImageProps,
    ref
  ) => {
    const Language = useLanguage();
    const lazyImageContent = getLazyImageContent(Language.Current);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      console.error(e);
      Toast.fire({ icon: "error", text: lazyImageContent.imageLoadFailed });
      setIsLoading(false);
    };

    const showLoader = isLoading || loading;

    return (
      <>
        {showLoader && (
          <div
            className={cn(
              `flex items-center justify-center animate-pulse`,
              className
            )}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={ref}
          src={src}
          alt={alt ?? src?.toString()}
          className={cn(className, {
            "h-0": showLoader,
          })}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          draggable={!showLoader}
          {...rest}
        />
      </>
    );
  }
);

LazyImage.displayName = "LazyImage";
