import { LazyImage } from "@/components/custom/LazyImage";
import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeInItem } from "@/libs/motion";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useModal } from "fanyucomponents";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
type ImageContent = Record<"imageLoadFailed", string>;

const getImageContent = (language: LanguageOption): ImageContent =>
  ((
    {
      chinese: {
        imageLoadFailed: "載入圖片失敗",
      },
      english: {
        imageLoadFailed: "Image Load Failed",
      },
    } as LanguageContent<ImageContent>
  )[language]);

export const ImageCard = ({
  src,
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const Language = useLanguage();
  const imageContent = getImageContent(Language.Current);
  const modal = useModal();

  const inviewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inviewRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.div
      ref={inviewRef}
      variants={fadeInItem}
      className="relative border border-[var(--border-color)] w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 group"
    >
      <LazyImage
        draggable={true}
        loading={!isInView}
        onClick={modal.Open}
        src={src}
        alt={`Event Image ${src}`}
        className="text-5xl bg-[#888] cursor-pointer select-none aspect-square object-cover transition-colors duration-200 group-hover:outline"
      />
      <modal.Container>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Event Image ${src}`}
          className={`max-w-[95vw] max-h-[80vh] object-contain animate-pop`}
          onError={(e: React.SyntheticEvent) => {
            console.error(e);
            Toast.fire({
              icon: "error",
              text: imageContent.imageLoadFailed,
            });
          }}
        />
      </modal.Container>
    </motion.div>
  );
};
