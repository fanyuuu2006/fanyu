"use client";
import { Toast } from "@/components/custom/Toast";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { ImageCard } from "./ImageCard";
import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/lib/motion";

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
        <Link href={`/album#${year}`} className="w-full text-left content">
          <ArrowLeftOutlined />
        </Link>
        <div className="flex flex-col items-center">
          <span className="title font-bold">{year}</span>
          <span className="label font-bold">{eventName}</span>
        </div>
        <motion.div
          key={`${isLoading}`}
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full flex flex-wrap"
        >
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                variants={fadeInItem}
                className="rounded-lg bg-[#888] border border-black aspect-square w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 animate-pulse"
              />
            ))
          ) : !images || images.length === 0 ? (
            <div className="content font-bold">{imagesContent.noImages}</div>
          ) : (
            images.map((src) => <ImageCard key={src} src={src} />)
          )}
        </motion.div>
      </div>
    </section>
  );
};
