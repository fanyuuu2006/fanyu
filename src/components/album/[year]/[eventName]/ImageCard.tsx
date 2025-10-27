import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";
import Image from "next/image";
import { useCallback } from "react";

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
  React.HTMLAttributes<HTMLDivElement>,
  {
    image: Album[number]["events"][number]["images"][number];
  }
>;

export const ImageCard = ({ image, className, ...rest }: ImageCardProps) => {
  const language = useLanguage();
  const imageContent = IMAGE_CARD_CONTENT[language.Current];

  const handleImageError = useCallback(
    (e: React.SyntheticEvent) => {
      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
      console.error(e);
      Toast.fire({
        icon: "error",
        text: imageContent.imageLoadFailed,
      });
    },
    [imageContent.imageLoadFailed]
  );

  const handleImageLoad = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLImageElement;
    target.style.opacity = "1";
  }, []);
  return (
    <div
      className={cn(
        "relative aspect-square bg-[#888] cursor-pointer border border-[var(--border-color)] hover:border-[var(--text-color-primary)]",
        className
      )}
      {...rest}
    >
      {/* 圖片預覽圖 */}
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={image.thumbnailLink || FALLBACK_IMAGE}
        alt={`${image.name}`}
        className="h-full w-full object-cover"
        onError={handleImageError}
      />
      <Image
        src={image.url}
        title={image.name || imageContent.noImages}
        alt={`${image.name}`}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        onLoad={handleImageLoad}
        onError={handleImageError}
        width={image.imageMediaMetadata?.width}
        height={image.imageMediaMetadata?.height}
        loading="lazy"
      />
    </div>
  );
};
