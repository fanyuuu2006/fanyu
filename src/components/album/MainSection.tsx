"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { EventLinkCard } from "./EventLinkCard";
import { useEffect, useState } from "react";
import { AlbumData } from "@/types/ablum";
import { getAlbumData } from "@/utils/ablum";
import { Toast } from "@/components/common/Toast";

type AlbumContent = Record<"album"|"albumLoadFailed", string>;

const getAlbumContent = (language: LanguageOption): AlbumContent =>
  ((
    {
      chinese: {
        album: "相簿",
        albumLoadFailed: "載入相簿失敗",
      },
      english: {
        album: "Album",
        albumLoadFailed: "Album Load Failed",
      },
    } as LanguageContent<AlbumContent>
  )[language]);

export const MainSection = () => {
  const Language = useLanguage();
  const albumContent = getAlbumContent(Language.Current);
  const [album, setAlbum] = useState<AlbumData | null>(null);

  useEffect(() => {
    getAlbumData()
      .then((data) => {
        setAlbum(data);
      })
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: "error",
          text: albumContent.albumLoadFailed,
        });
      });
  }, [albumContent.albumLoadFailed]);

  if (!album) return null;

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{albumContent.album}</div>
        <div className="w-full flex flex-wrap gap-2">
          {Object.entries(album).map(([eventName, items]) => (
            <EventLinkCard
              key={eventName}
              eventName={eventName}
              items={items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
