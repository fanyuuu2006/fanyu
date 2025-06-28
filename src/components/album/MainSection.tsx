"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Toast } from "@/components/custom/Toast";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
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

export const MainSection = ({ year }: { year: string | null }) => {
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

  const sortedYears = years
    ? timeOrder.sortedData.filter((y) => !year || y === year)
    : [];

  return (
    <section>
      <div className="container flex flex-col items-center">
        {year && (
          <Link href="/album" className="w-full text-left content">
            <ArrowLeftOutlined />
            <span className="sr-only">
              {Language.Current === "chinese" ? "返回" : "Back"}
            </span>
          </Link>
        )}
        <h1 className="text-5xl font-bold">{albumContent.album}</h1>

        {!years && isLoading ? (
          <LoadingOutlined className="text-5xl" />
        ) : !sortedYears || sortedYears.length === 0 ? (
          <div className="text-3xl font-bold">{`${year} - ${albumContent.noAlbum}`}</div>
        ) : (
          <>
            <timeOrder.Div />
            {sortedYears.map((y) => (
              <YearDiv key={y} year={y} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};
