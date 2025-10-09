"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { YearDiv } from "./YearDiv";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";
import { Album } from "@/types/album";

type AlbumContent = Record<"album" | "noAlbum", string>;

const getAlbumContent = (language: LanguageOption): AlbumContent =>
  ((
    {
      chinese: {
        album: "我的相簿",
        noAlbum: "沒有相簿",
      },
      english: {
        album: "My Album",
        noAlbum: "No Album",
      },
    } as LanguageContent<AlbumContent>
  )[language]);

export type MainSectionProps = {
  data: Album;
};

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const albumContent = getAlbumContent(Language.Current);

  const timeOrder = useTimeOrderTabs(data, (item) => item.year);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <h1 className="text-5xl font-bold">{albumContent.album}</h1>

        {timeOrder.sortedData.length === 0 ? (
          <div className="text-3xl font-bold">{albumContent.noAlbum}</div>
        ) : (
          <>
            <timeOrder.Div />
            {timeOrder.sortedData.map((item) => (
              <YearDiv key={item.year} item={item} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};
