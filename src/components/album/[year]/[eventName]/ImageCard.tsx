import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { LanguageOption, LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
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
  className,
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const Language = useLanguage();
  const imageContent = getImageContent(Language.Current);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        draggable={true}
        src={src}
        alt={alt}
        className={cn("cursor-pointer", className)}
        onError={(e: React.SyntheticEvent) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          console.error(e);
          Toast.fire({
            icon: "error",
            text: imageContent.imageLoadFailed,
          });
        }}
        {...rest}
      />
    </>
  );
};
