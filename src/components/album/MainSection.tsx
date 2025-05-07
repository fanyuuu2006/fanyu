"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { EventLinkCard } from "./EventLinkCard";
import { AlbumData } from "@/types/ablum";
import { Toast } from "@/components/common/Toast";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import useSWR from "swr";

type AlbumContent = Record<"album" | "noAlbum" | "albumLoadFailed", string>;

const getAlbumContent = (language: LanguageOption): AlbumContent =>
  ((
    {
      chinese: {
        album: "相簿",
        noAlbum: "沒有相簿",
        albumLoadFailed: "載入相簿失敗",
      },
      english: {
        album: "Album",
        noAlbum: "No Album",
        albumLoadFailed: "Album Load Failed",
      },
    } as LanguageContent<AlbumContent>
  )[language]);

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const MainSection = ({ year }: { year: string | null }) => {
  const Language = useLanguage();
  const albumContent = getAlbumContent(Language.Current);
  const {
    data: album,
    error,
    isLoading,
  } = useSWR("/api/album", (url: string) =>
    fetch(url).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <section className="flex justify-center items-center p-4">
        <LoadingOutlined className="title" />
      </section>
    );
  }

  if (error) {
    Toast.fire({
      icon: "error",
      text: albumContent.albumLoadFailed,
    });
    return null;
  }

  if (!album || Object.keys(album).length === 0)
    return (
      <section className="container flex flex-col items-center">
        {year && (
          <Link href="/album" className="w-full text-left content">
            <ArrowLeftOutlined />
          </Link>
        )}
        <div className="title font-bold">{albumContent.album}</div>
        <div className="content font-bold">{albumContent.noAlbum}</div>
      </section>
    );

  return (
    <section>
      <div className="container flex flex-col items-center">
        {year && (
          <Link href="/album" className="w-full text-left content">
            <ArrowLeftOutlined />
          </Link>
        )}
        <div className="title font-bold">{albumContent.album}</div>
        {Object.entries(album as AlbumData)
          .toSorted(([aYear], [bYear]) => parseInt(bYear) - parseInt(aYear))
          .map(([year, events]) => (
            <div key={year} className="w-full flex flex-col gap-2">
              <div className="label font-bold">{year}</div>
              <div className="w-full flex flex-wrap">
                {Object.entries(events).map(
                  ([eventName, imageSrcs]) =>
                    imageSrcs.length > 0 && (
                      <EventLinkCard
                        key={eventName}
                        year={year}
                        eventName={eventName}
                        imageSrcs={imageSrcs}
                      />
                    )
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
