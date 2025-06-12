import { LazyImage } from "@/components/custom/LazyImage";
import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/context/LanguageContext";
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
  const Modal = useModal();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeInItem}
      className="relative border border-[var(--border-color)] w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 group"
    >
      <LazyImage
        draggable={true}
        loading={!isInView}
        src={src}
        alt={`Event Image ${src}`}
        className="title bg-[#888] cursor-pointer select-none aspect-square object-cover group-hover:outline"
        onClick={Modal.Open}
      />
      <Modal.Container className="backdrop-blur-sm animate-pop">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Event Image ${src}`}
          className={`max-w-[95vw] max-h-[80vh] object-contain`}
          onError={(e: React.SyntheticEvent) => {
            console.error(e);
            Toast.fire({
              icon: "error",
              text: imageContent.imageLoadFailed,
            });
          }}
        />
      </Modal.Container>
    </motion.div>
  );
};
