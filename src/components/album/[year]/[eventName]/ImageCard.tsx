import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";
import { useState } from "react";

const IMAGE_CARD_CONTENT: LanguageContent<
  Record<"noImages" | "imageLoadFailed", string>
> = {
  chinese: {
    noImages: "沒有圖片",
    imageLoadFailed: "載入圖片失敗",
  },
  english: {
    noImages: "No Images",
    imageLoadFailed: "Image Load Failed",
  },
};

export type ImageCardProps = OverrideProps<
  React.HTMLAttributes<HTMLElement>,
  {
    image: Album[number]["events"][number]["images"][number];
  }
>;

export const ImageCard = ({ image, className, ...rest }: ImageCardProps) => {
  const language = useLanguage();
  const imageContent = IMAGE_CARD_CONTENT[language.Current];
  const title = image.name || imageContent.noImages;
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
    console.error(imageContent.imageLoadFailed, e);
    Toast.fire({
      icon: "error",
      text: imageContent.imageLoadFailed,
    });
  };

  return (
    <figure
      className={cn(
        "relative aspect-square bg-[#888] cursor-pointer border border-[var(--border-color)] hover:border-[var(--text-color-primary)]",
        className
      )}
      itemScope
      itemType="https://schema.org/ImageObject"
      {...rest}
    >
      {/* 縮圖預覽 */}
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={image.thumbnailLink || FALLBACK_IMAGE}
        title={title}
        alt={title}
        className="h-full w-full object-cover"
        onError={handleImageError}
      />
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        loading={"lazy"}
        src={image.url}
        title={title}
        alt={title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
          {
            "opacity-0": !loaded,
          }
        )}
        onLoad={() => setLoaded(true)}
        onError={handleImageError}
        width={image.imageMediaMetadata?.width || 800}
        height={image.imageMediaMetadata?.height || 800}
        itemProp="contentUrl"
      />
      {/* 結構化數據 - 隱藏但對 SEO 有幫助 */}
      <meta itemProp="name" content={title} />
      <meta
        itemProp="thumbnailUrl"
        content={image.thumbnailLink || FALLBACK_IMAGE}
      />
      {image.imageMediaMetadata?.width && (
        <meta
          itemProp="width"
          content={String(image.imageMediaMetadata.width)}
        />
      )}
      {image.imageMediaMetadata?.height && (
        <meta
          itemProp="height"
          content={String(image.imageMediaMetadata.height)}
        />
      )}
    </figure>
  );
};
