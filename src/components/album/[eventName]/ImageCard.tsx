import { Toast } from "@/components/common/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";

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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={src?.toString()}
      className="w-1/4 aspect-square object-cover rounded outline md:w-1/5"
      onError={(e) => {
        console.error(e);
        Toast.fire({
          icon: "error",
          text: imageContent.imageLoadFailed,
        });
      }}
    />
  );
};
