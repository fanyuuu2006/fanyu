"use client";
import { Toast } from "@/components/custom/Toast";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";
import { ImageCard } from "./ImageCard";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { LazyImage } from "@/components/custom/LazyImage";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        text: imagesContent.eventsLoadFailed,
      });
    }
  }, [error, imagesContent.eventsLoadFailed]);

  const skeletonCount = images?.length || 5;

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="w-full text-left content">
          <ArrowLeftOutlined
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="title font-bold">{year}</h2>
          <h2 className="label font-bold">{eventName}</h2>
        </div>
        <motion.article
          variants={staggerContainer}
          initial="hiddenBottom"
          animate="show"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full flex flex-wrap"
        >
          {isLoading ? (
            [...Array(skeletonCount)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                variants={fadeInItem}
                className="bg-[#888] border border-[var(--border-color)] aspect-square w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 animate-pulse"
              >
                <LazyImage loading={true} className="w-full" />
              </motion.div>
            ))
          ) : !images || images.length === 0 ? (
            <div className="w-full text-center">
              <span className="content font-bold">
                {imagesContent.noImages}
              </span>
            </div>
          ) : (
            images.map((src) => <ImageCard key={src} src={src} />)
          )}
        </motion.article>
      </div>
    </section>
  );
};
