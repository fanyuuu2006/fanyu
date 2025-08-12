"use client";
import { Toast } from "@/components/custom/Toast";
import { CaretLeftOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageCard } from "./ImageCard";
import { useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { LazyImage } from "@/components/custom/LazyImage";
import { useRouter } from "next/navigation";
import { useAlbum } from "@/contexts/AlbumContext";
import { cn } from "@/utils/className";
import { Tooltip } from "antd";

const DEFAULT_SKELETON_COUNT = 6;
const CLASSNAME =
  "aspect-square bg-[#888] border border-[var(--border-color)] hover:border-white";

type MainSectionProps = {
  year: string;
  eventName: string;
};

type ImagesContent = Record<
  "noImages" | "eventsLoadFailed" | "backToAlbum",
  string
>;

const getImagesContent = (language: LanguageOption): ImagesContent =>
  ((
    {
      chinese: {
        noImages: "沒有圖片",
        eventsLoadFailed: "載入相簿失敗",
        backToAlbum: "返回相簿",
      },
      english: {
        noImages: "No Images",
        eventsLoadFailed: "Album Load Failed",
        backToAlbum: "Back to Album",
      },
    } as LanguageContent<ImagesContent>
  )[language]);

export const MainSection = ({ year, eventName }: MainSectionProps) => {
  const { useImages } = useAlbum();
  const { data: images, error, isLoading } = useImages(year, eventName);
  const router = useRouter();
  const { Current: currentLanguage } = useLanguage();

  const imagesContent = useMemo(
    () => getImagesContent(currentLanguage),
    [currentLanguage]
  );

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: imagesContent.eventsLoadFailed,
      });
    }
  }, [error, imagesContent.eventsLoadFailed]);

  const skeletonCount = useMemo(
    () => images?.length || DEFAULT_SKELETON_COUNT,
    [images?.length]
  );

  return (
    <section className="min-h-screen">
      <div className="container flex flex-col items-center px-4 py-8">
        <div className="w-full">
          <Tooltip title={imagesContent.backToAlbum}>
            <button
              aria-label={imagesContent.backToAlbum}
              onClick={handleBackClick}
              className="btn text-xl flex items-center justify-center p-3 rounded-full"
            >
              <CaretLeftOutlined className="relative left-[-2px]" />
            </button>
          </Tooltip>
        </div>

        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{year}</h1>
          <h2 className="text-2xl md:text-4xl font-semibold">{eventName}</h2>
        </div>

        <motion.article
          key={`${isLoading}-${images?.length || 0}`}
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[1px]"
          role="main"
          aria-label={`${eventName} 照片集`}
        >
          {isLoading ? (
            [...Array(skeletonCount)].map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                variants={fadeInItem}
                className={cn(CLASSNAME, `animate-pulse`)}
              >
                <LazyImage loading={true} className="w-full" />
              </motion.div>
            ))
          ) : !images || images.length === 0 ? (
            <div className="w-full text-center py-8">
              <span className="text-2xl font-bold">
                {imagesContent.noImages}
              </span>
            </div>
          ) : (
            images.map((src) => (
              <motion.div key={src} variants={fadeInItem} className={cn(CLASSNAME)}>
                <ImageCard src={src} className="h-full w-full object-cover" />
              </motion.div>
            ))
          )}
        </motion.article>
      </div>
    </section>
  );
};
