import { MyImage } from "@/components/custom/MyImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { PlayCircleFilled } from "@ant-design/icons";
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

  const [loaded, setLoaded] = useState(false);

  const isVideo = item.mimeType?.startsWith("video/") ?? false;
  const { width = 800, height = 800 } = item.imageMediaMetadata ?? {};

  return (
    <figure
      className={cn(
        "relative aspect-square overflow-hidden bg-[#888] cursor-pointer border border-[var(--border-color)] hover:border-[var(--text-color-primary)]",
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
      {/* 第一張：縮圖預覽 */}
      <MyImage
        src={item.thumbnailLink}
        title={title}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* 第二張：高解析版本 */}
      <MyImage
        src={isVideo ? item.thumbnailLink : item.url}
        fallbackSrc={item.thumbnailLink}
        title={title}
        alt={title}
        className={cn(
          "absolute inset-0 object-cover transition-opacity duration-300",
          { "opacity-0": !loaded }
        )}
        width={width}
        height={height}
        itemProp="contentUrl"
        onLoad={() => setLoaded(true)}
      />
      {isVideo && (
        <div className="text-sm absolute top-1 right-1">
          <div className="flex gap-1">
            <PlayCircleFilled />
          </div>
        </div>
      )}

      {/* 結構化數據（SEO 使用） */}
      <meta itemProp="name" content={title} />
      <meta
        itemProp="thumbnailUrl"
        content={item.thumbnailLink || FALLBACK_IMAGE}
      />

      {item.imageMediaMetadata?.width && (
        <meta itemProp="width" content={String(width)} />
      )}

      {item.imageMediaMetadata?.height && (
        <meta itemProp="height" content={String(height)} />
      )}
    </figure>
  );
};
