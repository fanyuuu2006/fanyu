"use client";
import { Toast } from "@/components/common/Toast";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { ImageCard } from "./ImageCard";
import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";

type ImagesContent = Record<
  "noImages" | "eventsLoadFailed" | "imageLoadFailed",
  string
>;

const getImagesContent = (language: LanguageOption): ImagesContent =>
  ((
    {
      chinese: {
        noImages: "沒有圖片",
        eventsLoadFailed: "載入相簿失敗",
      },
      english: {
        noImages: "No Images",
        eventsLoadFailed: "Album Load Failed",
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
    data: images,
    error,
    isLoading,
  } = useSWR<string[]>(
    `/api/album/${slugify(year)}/${slugify(eventName)}`,
    fetcher
  );
  const Language = useLanguage();
  const imagesContent = getImagesContent(Language.Current);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: imagesContent.eventsLoadFailed,
      });
    }
  }, [error, imagesContent.eventsLoadFailed]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Link href="/album" className="w-full text-left content">
          <ArrowLeftOutlined />
        </Link>
        <div className="title font-bold">{year}</div>
        <div className="label font-bold">{eventName}</div>
        {isLoading ? (
          <LoadingOutlined className="title" />
        ) : !images || images.length === 0 ? (
          <div className="content font-bold">{imagesContent.noImages}</div>
        ) : (
          <div className="w-full flex flex-wrap">
            {images.map((src) => (
              <ImageCard key={src} src={src} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
