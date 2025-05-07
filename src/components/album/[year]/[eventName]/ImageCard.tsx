import { Toast } from "@/components/common/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { useModal } from "fanyucomponents";

type ImageContent = Record<
  "noImages" | "albumLoadFailed" | "imageLoadFailed",
  string
>;

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
    <div className="p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 group">
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        draggable={false}
        src={src}
        alt={src?.toString()}
        className="cursor-pointer select-none w-full aspect-square  object-cover group-hover:outline"
        onClick={() => {
          Modal.Open();
        }}
        onError={(e) => {
          console.error(e);
          Toast.fire({
            icon: "error",
            text: imageContent.imageLoadFailed,
          });
        }}
      />
      <Modal.Container className="pt-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={src?.toString()}
          className="max-w-[90vw] max-h-[80vh] object-contain"
          onError={(e) => {
            console.error(e);
            Toast.fire({ icon: "error", text: imageContent.imageLoadFailed });
          }}
        />
      </Modal.Container>
    </div>
  );
};
