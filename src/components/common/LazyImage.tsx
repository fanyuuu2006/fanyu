// components/common/LazyImage.tsx
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
  {
    containerProps: React.HTMLAttributes<HTMLDivElement>;
  }
>;

export const LazyImage = ({
  src,
  alt,
  className,
  containerProps,
  ...rest
}: LazyImageProps) => {
  const Language = useLanguage();
  const lazyImageContent = getLazyImageContent(Language.Current);
  const [loading, setLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent) => {
    console.error(e);
    Toast.fire({ icon: "error", text: lazyImageContent.imageLoadFailed });
    setLoading(false);
  };

  const {
    className: containerClassName,
    children,
    ...containerRest
  } = containerProps;

  return (
    <div
      className={`relative bg-[#888] ${containerClassName}`}
      {...containerRest}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingOutlined className="content" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? src?.toString()}
        className={`${className} ${loading && "opacity-0"}`}
        onLoad={() => setLoading(false)}
        onError={handleError}
        draggable={false}
        {...rest}
      />
      {children}
    </div>
  );
};
