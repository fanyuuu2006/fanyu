import { LazyImage, LazyImageProps } from "@/components/custom/LazyImage";
import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { useModal } from "fanyucomponents";
import { useInView } from "framer-motion";
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

export const ImageCard = ({ src, className, ...rest }: LazyImageProps) => {
  const Language = useLanguage();
  const imageContent = getImageContent(Language.Current);
  const modal = useModal();

  const inviewRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(inviewRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <>
      <LazyImage
        draggable={true}
        ref={inviewRef}
        loading={!isInView}
        onClick={modal.Open}
        src={src}
        alt={`Event Image ${src}`}
        className={cn(
          "text-5xl cursor-pointer",
          className
        )}
        {...rest}
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
    </>
  );
};
