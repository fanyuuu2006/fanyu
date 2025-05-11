"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Toast } from "@/components/common/Toast";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "@/utils/fetcher";
import { YearDiv } from "./YearDiv";

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
  } = useSWR<string[]>("/api/album", fetcher, {
    fallbackData: year ? [year] : undefined,
  });

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: albumContent.yearsLoadFailed,
      });
    }
  }, [albumContent.yearsLoadFailed, error]);

  const filteredYears = years
    ? years
        .filter((y) => !year || y === year)
        .sort((a, b) => parseInt(b) - parseInt(a))
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
        <div className="title font-bold">{albumContent.album}</div>

        {!years && isLoading ? (
          <LoadingOutlined className="title" />
        ) : !filteredYears || filteredYears.length === 0 ? (
          <div className="content font-bold">{`${year} - ${albumContent.noAlbum}`}</div>
        ) : (
          filteredYears.map((y) => <YearDiv key={y} year={y} />)
        )}
      </div>
    </section>
  );
};
