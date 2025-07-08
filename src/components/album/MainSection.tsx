"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Toast } from "@/components/custom/Toast";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "@/utils/fetcher";
import { YearDiv } from "./YearDiv";
import { useTimeOrderTabs } from "@/hooks/useTimeOrderTabs";

type AlbumContent = Record<"album" | "noAlbum" | "yearsLoadFailed", string>;

const getAlbumContent = (language: LanguageOption): AlbumContent =>
  ((
    {
      chinese: {
        album: "我的相簿",
        noAlbum: "沒有相簿",
        yearsLoadFailed: "載入年份失敗",
      },
      english: {
        album: "My Album",
        noAlbum: "No Album",
        yearsLoadFailed: "Years Load Failed",
      },
    } as LanguageContent<AlbumContent>
  )[language]);

export const MainSection = () => {
  const Language = useLanguage();
  const albumContent = getAlbumContent(Language.Current);

  const {
    data: years,
    error,
    isLoading,
  } = useSWR<string[]>("/api/album", fetcher);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: albumContent.yearsLoadFailed,
      });
    }
  }, [albumContent.yearsLoadFailed, error]);

  const timeOrder = useTimeOrderTabs(years ?? []);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <h1 className="text-5xl font-bold">{albumContent.album}</h1>

        {!years && isLoading ? (
          <LoadingOutlined className="text-5xl" />
        ) : timeOrder.sortedData.length === 0 ? (
          <div className="text-3xl font-bold">{albumContent.noAlbum}</div>
        ) : (
          <>
            <timeOrder.Div />
            {timeOrder.sortedData.map((y) => (
              <YearDiv key={y} year={y} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};
