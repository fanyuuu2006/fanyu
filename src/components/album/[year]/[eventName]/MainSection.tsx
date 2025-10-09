"use client";
import { CaretLeftOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageCard } from "./ImageCard";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/className";
import { Tooltip } from "antd";
import { Album } from "@/types/album";
import { Title } from "@/components/custom/Title";

type MainSectionProps = {
  event: Album[number]["events"][number];
  year: Album[number]["year"];
};

type ImagesContent = Record<"noImages" | "back", string>;

const getImagesContent = (language: LanguageOption): ImagesContent =>
  ((
    {
      chinese: {
        noImages: "沒有圖片",
        back: "返回",
      },
      english: {
        noImages: "No Images",
        back: "Back",
      },
    } as LanguageContent<ImagesContent>
  )[language]);

export const MainSection = ({ year, event }: MainSectionProps) => {
  const router = useRouter();
  const language = useLanguage();

  const imagesContent = useMemo(
    () => getImagesContent(language.Current),
    [language.Current]
  );

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <section className="min-h-screen">
      <div className="container">
        {/* 返回按鈕區域 */}
        <div className="w-full mb-6">
          <Tooltip title={imagesContent.back}>
            <button
              aria-label={imagesContent.back}
              onClick={handleBackClick}
              className="btn text-lg lg:text-xl flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full "
            >
              <CaretLeftOutlined className="relative left-[-1px]" />
            </button>
          </Tooltip>
        </div>

        <Title className="flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-bold mb-2">{year}</span>
          <span className="text-2xl md:text-4xl font-semibold">{event.name}</span>
        </Title>

        {/* 圖片網格 */}
        <motion.article
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          role="main"
          aria-label={`${year}-${event.name}照片集`}
        >
          {event.images.length === 0 ? (
            <div className="w-full text-center py-8">
              <span className="text-2xl font-bold">
                {imagesContent.noImages}
              </span>
            </div>
          ) : (
            event.images.map((src) => (
              <motion.div
                key={src}
                variants={fadeInItem}
                className={cn(
                  "rounded-xl overflow-hidden aspect-square bg-[#888] border border-[var(--border-color)] hover:border-white"
                )}
              >
                <ImageCard src={src} className="h-full w-full object-cover" />
              </motion.div>
            ))
          )}
        </motion.article>
      </div>
    </section>
  );
};
