import { Toast } from "@/components/common/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import { useState } from "react";

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
  { loading?: boolean }
>;

export const LazyImage = ({
  loading = false,
  src,
  alt,
  className,
  ...rest
}: LazyImageProps) => {
  const Language = useLanguage();
  const lazyImageContent = getLazyImageContent(Language.Current);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent) => {
    console.error(e);
    Toast.fire({ icon: "error", text: lazyImageContent.imageLoadFailed });
    setIsLoading(false);
  };

  const showLoader = isLoading || loading;

  return (
    <>
      {showLoader && (
        <div className={`flex items-center justify-center ${className}`}>
          <LoadingOutlined />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? src?.toString()}
        className={`${className} ${showLoader ? "hidden" : ""}`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        draggable={!showLoader}
        {...rest}
      />
    </>
  );
};
