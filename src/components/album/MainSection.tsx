"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { YearDiv } from "./YearDiv";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";
import { Album } from "@/types/album";
import { Title } from "../custom/Title";
import { useMemo } from "react";

type AlbumContent = Record<"album" | "noAlbum" | "totalItems", string>;

const ALBUM_CONTENT: LanguageContent<AlbumContent> = {
  chinese: {
    album: "我的相簿",
    noAlbum: "沒有相簿",
    totalItems: "共 {count} 個項目",
  },
  english: {
    album: "My Album",
    noAlbum: "No Album",
    totalItems: "Total {count} items",
  },
};

export type MainSectionProps = {
  data: Album;
};

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const albumContent = ALBUM_CONTENT[Language.Current];

  const timeOrder = useTimeOrderTabs(data, (item) => item.year);

  const totalCount = useMemo(
    () =>
      data.reduce(
        (res, year) =>
          res +
          year.events.reduce((sum, event) => sum + event.images.length, 0),
        0
      ),
    [data]
  );

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Title>{albumContent.album}</Title>

        {timeOrder.sortedData.length === 0 ? (
          <div className="text-3xl font-bold">{albumContent.noAlbum}</div>
        ) : (
          <>
            <span className="text-[var(--text-color-muted)]">
              {albumContent.totalItems.replace(
                "{count}",
                totalCount.toString()
              )}
            </span>
            {/* 分類標籤 */}
            <timeOrder.Div />
            <div className="w-full flex flex-col gap-6">
              {timeOrder.sortedData.map((item) => (
                <YearDiv key={item.year} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
