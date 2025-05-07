"use client";
import { Toast } from "@/components/common/Toast";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { ImageCard } from "./ImageCard";
import Link from "next/link";
import useSWR from "swr";
import { AlbumData } from "@/types/ablum";

type ImagesContent = Record<
  "noImages" | "albumLoadFailed" | "imageLoadFailed",
  string
>;

const getImagesContent = (language: LanguageOption): ImagesContent =>
  ((
    {
      chinese: {
        noImages: "沒有圖片",
        albumLoadFailed: "載入相簿失敗",
      },
      english: {
        noImages: "No Images",
        albumLoadFailed: "Album Load Failed",
      },
    } as LanguageContent<ImagesContent>
  )[language]);

export const MainSection = ({
  year,
  eventName,
}: {
  year: string;
  eventName: string;
}) => {
  const {
    data: album,
    error,
    isLoading,
  } = useSWR("/api/album", (url: string) =>
    fetch(url).then((res) => res.json())
  );
  const Language = useLanguage();
  const imagesContent = getImagesContent(Language.Current);

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
      text: imagesContent.albumLoadFailed,
    });
    return null;
  }

  const imageSrcs = (album as AlbumData)[year][eventName];

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Link href="/album" className="w-full text-left content">
          <ArrowLeftOutlined />
        </Link>
        <div className="title font-bold">
          {year} {eventName}
        </div>
        <div className="w-full flex flex-wrap">
          {imageSrcs.map((src) => (
            <ImageCard key={src} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
};
