import { Toast } from "@/components/common/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageOption, LanguageContent } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { useModal } from "fanyucomponents";
import { useState } from "react";

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
  const [loading, setLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent) => {
    console.error(e);
    Toast.fire({ icon: "error", text: imageContent.imageLoadFailed });
    setLoading(false);
  };

  return (
    <div className="relative bg-[#888] p-[1px] w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 group">
      {/* Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <LoadingOutlined className="content" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        draggable={false}
        src={src}
        alt={src?.toString()}
        className="cursor-pointer select-none w-full aspect-square object-cover group-hover:outline"
        onClick={() => {
          Modal.Open();
        }}
        onLoad={() => {
          setLoading(false);
        }}
        onError={handleError}
      />
      <Modal.Container>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={src?.toString()}
          className="max-w-[95vw] max-h-[80vh] object-contain"
          onError={handleError}
        />
      </Modal.Container>
    </div>
  );
};
