import { MyImage } from "@/components/custom/MyImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";
import { useState } from "react";

const ITEM_CARD_CONTENT: LanguageContent<Record<"noItem", string>> = {
  chinese: {
    noItem: "沒有圖片",
  },
  english: {
    noItem: "No Item",
  },
};

export type ImageCardProps = OverrideProps<
  React.HTMLAttributes<HTMLElement>,
  {
    item: Album[number]["events"][number]["items"][number];
  }
>;

export const ItemCard = ({ item, className, ...rest }: ImageCardProps) => {
  const language = useLanguage();
  const itemContent = ITEM_CARD_CONTENT[language.Current];
  const title = item.name || itemContent.noItem;
  const [loaded, setLoaded] = useState<boolean>(false);
  const isVideo = item.mimeType?.startsWith("video/");

  return (
    <figure
      className={cn(
        "relative aspect-square bg-[#888] cursor-pointer border border-[var(--border-color)] hover:border-[var(--text-color-primary)]",
        className
      )}
      itemScope
      itemType={
        isVideo
          ? "http://schema.org/VideoObject"
          : "http://schema.org/ImageObject"
      }
      {...rest}
    >
      {/* 縮圖預覽 */}
      <MyImage
        src={item.thumbnailLink}
        title={title}
        alt={title}
        className="h-full w-full object-cover"
      />
      {!isVideo && (
        <MyImage
          src={item.url}
          fallbackSrc={item.thumbnailLink}
          title={title}
          alt={title}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            {
              "opacity-0": !loaded,
            }
          )}
          onLoad={() => setLoaded(true)}
          width={item.imageMediaMetadata?.width || 800}
          height={item.imageMediaMetadata?.height || 800}
          itemProp="contentUrl"
        />
      )}
      {/* 結構化數據 - 隱藏但對 SEO 有幫助 */}
      <meta itemProp="name" content={title} />
      <meta
        itemProp="thumbnailUrl"
        content={item.thumbnailLink || FALLBACK_IMAGE}
      />
      {item.imageMediaMetadata?.width && (
        <meta
          itemProp="width"
          content={String(item.imageMediaMetadata.width)}
        />
      )}
      {item.imageMediaMetadata?.height && (
        <meta
          itemProp="height"
          content={String(item.imageMediaMetadata.height)}
        />
      )}
    </figure>
  );
};
