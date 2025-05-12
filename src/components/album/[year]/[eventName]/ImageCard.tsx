import { LazyImage } from "@/components/common/LazyImage";
import { Toast } from "@/components/common/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { fadeInItem } from "@/lib/motion";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useModal } from "fanyucomponents";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      variants={fadeInItem}
      className="relative p-[1px] w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 group"
    >
      <LazyImage
        src={src}
        className="title bg-[#888] cursor-pointer select-none w-full aspect-square object-cover group-hover:outline"
        onClick={() => {
          Modal.Open();
        }}
      />
      <Modal.Container>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={src?.toString()}
          className="max-w-[95vw] max-h-[80vh] object-contain"
          onError={(e: React.SyntheticEvent) => {
            console.error(e);
            Toast.fire({ icon: "error", text: imageContent.imageLoadFailed });
          }}
        />
      </Modal.Container>
    </motion.div>
  );
};
