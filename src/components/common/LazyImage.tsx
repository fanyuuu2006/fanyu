import { Toast } from "@/components/common/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";

type LazyImageContent = Record<"imageLoadFailed", string>;

const getLazyImageContent = (language: LanguageOption): LazyImageContent =>
  ((
    {
      chinese: { imageLoadFailed: "載入圖片失敗" },
      english: { imageLoadFailed: "Image Load Failed" },
    } as LanguageContent<LazyImageContent>
  )[language]);

export type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const LazyImage = ({ src, alt, className, ...rest }: LazyImageProps) => {
  const Language = useLanguage();
  const lazyImageContent = getLazyImageContent(Language.Current);
  const [loading, setLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent) => {
    console.error(e);
    Toast.fire({ icon: "error", text: lazyImageContent.imageLoadFailed });
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className={`flex items-center justify-center ${className}`}>
          <LoadingOutlined />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? src?.toString()}
        className={`${className} ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
        onError={handleError}
        draggable={!loading}
        {...rest}
      />
    </>
  );
};
