import { MyImage } from "@/components/custom/MyImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { Album } from "@/types/album";
import { LanguageContent } from "@/types/language";
import { formatTime } from "@/utils";
import { cn } from "@/utils/className";
import { PlayCircleFilled } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import { memo } from "react";

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

export const ItemCard = memo(({ item, className, ...rest }: ImageCardProps) => {
  const language = useLanguage();
  const itemContent = ITEM_CARD_CONTENT[language.Current];
  const title = item.name || itemContent.noItem;

  const isVideo = item.mimeType?.startsWith("video/") ?? false;
  const width = item.imageMediaMetadata?.width;
  const height = item.imageMediaMetadata?.height;

  return (
    <figure
      className={cn(
        "relative aspect-square overflow-hidden bg-[#888] cursor-pointer border border-(--border-color) hover:border-(--text-color-primary)",
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
        width={width}
        height={height}
        loading="lazy"
      />

      {isVideo && (
        <div className="text-sm md:text-base lg:text-lg xl:text-xl absolute top-1.5 right-1.5">
          <div className="flex gap-1 items-center">
            <span className="text-[0.75em] font-bold">
              {formatTime(item.videoMediaMetadata?.durationMillis || "0")}
            </span>
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

      {width && <meta itemProp="width" content={String(width)} />}

      {height && <meta itemProp="height" content={String(height)} />}
    </figure>
  );
});

ItemCard.displayName = "ItemCard";
