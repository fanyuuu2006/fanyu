import { Toast } from "@/components/custom/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FALLBACK_IMAGE } from "@/libs/album";
import { LanguageOption, LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import {
  CloseOutlined,
  DownloadOutlined,
  // ExportOutlined,
} from "@ant-design/icons";
import { useModal } from "fanyucomponents";
import Link from "next/link";
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
  const modal = useModal();

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        draggable={true}
        onClick={modal.Open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            modal.Open();
          }
        }}
        tabIndex={0}
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
      <modal.Container style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
        {/* Header */}
        <div
          className={cn(
            "flex items-center gap-2",
            "text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[var(--text-color-muted)]",
            "w-full absolute top-0 left-0 py-4 px-8",
            "hover:bg-[var(--background-color)]/70 transition-colors duration-200"
          )}
        >
          <CloseOutlined onClick={modal.Close} />
          <span className="text-[0.75em]">{rest.title}</span>

          {/* 功能按鈕按鈕 */}
          <div
            className={cn(
              // "hidden lg:flex",
              "ms-auto items-center gap-6"
            )}
          >
            <Link
              href={src?.toString() || ""}
              download
              aria-label={`下載圖片 ${alt}`}
            >
              <DownloadOutlined />
            </Link>
            {/* <Link
              href={src?.toString() || ""}
              target="_blank"
              aria-label={`在新分頁開啟圖片 ${alt}`}
            >
              <ExportOutlined />
            </Link> */}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`select-none max-w-[95vw] max-h-[80vh] object-contain animate-pop`}
          onError={(e: React.SyntheticEvent) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
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
