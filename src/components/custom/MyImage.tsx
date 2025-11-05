import { forwardRef, useState } from "react";
import { Toast } from "./Toast";
import { FALLBACK_IMAGE } from "@/libs/album";
import { useLanguage } from "@/contexts/LanguageContext";
import { OverrideProps } from "fanyucomponents";

export type MyImageProps = OverrideProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  {
    src: string | undefined | null;
  }
>;

const IMAGE_CONTENT = {
  chinese: {
    imageLoadFailed: "載入圖片失敗",
  },
  english: {
    imageLoadFailed: "Image Load Failed",
  },
};

export const MyImage = forwardRef<HTMLImageElement, MyImageProps>(
  ({ src, alt, onError, ...rest }, ref) => {
    const language = useLanguage();
    const imageContent = IMAGE_CONTENT[language.Current];
    const [hasError, setHasError] = useState<boolean>(false);
    const handleImageError: React.ReactEventHandler<HTMLImageElement> = (e) => {
      setHasError(true);
      console.error(imageContent.imageLoadFailed, e);
      Toast.fire({
        icon: "error",
        text: imageContent.imageLoadFailed,
      });
      if (onError) onError(e);
    };

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={hasError ? FALLBACK_IMAGE : src || FALLBACK_IMAGE}
        ref={ref}
        alt={alt}
        onError={handleImageError}
        {...rest}
      />
    );
  }
);
MyImage.displayName = "MyImage";
