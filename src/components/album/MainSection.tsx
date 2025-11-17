"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { YearDiv } from "./YearDiv";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";
import { Album } from "@/types/album";
import { Title } from "../custom/Title";
import { useMemo } from "react";

type AlbumContent = Record<
  "album" | "noAlbum" | "total" | "countImages" | "countEvents",
  string
>;
const ALBUM_CONTENT: LanguageContent<AlbumContent> = {
  chinese: {
    album: "我的相簿",
    noAlbum: "沒有相簿",
    total: "共",
    countImages: "{count} 張照片",
    countEvents: "{count} 個事件",
  },
  english: {
    album: "My Album",
    noAlbum: "No Album",
    total: "Total",
    countImages: "{count} images",
    countEvents: "{count} events",
  },
};

export type MainSectionProps = {
  data: Album;
};

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const albumContent = ALBUM_CONTENT[Language.Current];
  const timeOrder = useTimeOrderTabs(data, (item) => item.year);

  const totalCounts = useMemo(
    () =>
      data.reduce(
        (res, year) => {
          res.events += year.events.length;
          res.images += year.events.reduce(
            (eventRes, event) => eventRes + event.images.length,
            0
          );
          return res;
        },
        {
          events: 0,
          images: 0,
        }
      ),
    [data]
  );

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Title>{albumContent.album}</Title>

        {timeOrder.data.length === 0 ? (
          <div className="text-3xl font-bold">{albumContent.noAlbum}</div>
        ) : (
          <>
            {/* 總照片數和事件數 */}
            <div className="flex items-center gap-1">
              <span className="text-[var(--text-color-muted)]">
                {albumContent.total}
              </span>
              {(
                [
                  { key: "events", labelKey: "countEvents" },
                  { key: "images", labelKey: "countImages" },
                ] as const
              ).map((item) => (
                <span key={item.key} className="text-[var(--text-color-muted)]">
                  {albumContent[item.labelKey].replace(
                    "{count}",
                    totalCounts[item.key].toString()
                  )}
                </span>
              ))}
            </div>
            {/* 分類標籤 */}
            <timeOrder.div />
            <div className="w-full flex flex-col gap-6">
              {timeOrder.data.map((item) => (
                <YearDiv key={item.year} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
