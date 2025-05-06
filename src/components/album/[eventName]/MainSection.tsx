"use client";

import { useEffect, useState } from "react";
import { getAlbumData } from "../../../utils/ablum";
import { Toast } from "@/components/common/Toast";
import { LoadingOutlined } from "@ant-design/icons";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";

type ImagesContent = Record<
  "noImages" | "albumLoadFailed" | "imageLoadFailed",
  string
>;

const getImagesContent = (language: LanguageOption): ImagesContent =>
  ((
    {
      chinese: {
        noImages: "沒有圖片",
        albumLoadFailed: "載入相簿失敗",
        imageLoadFailed: "載入圖片失敗",
      },
      english: {
        noImages: "No Images",
        albumLoadFailed: "Album Load Failed",
        imageLoadFailed: "Image Load Failed",
      },
    } as LanguageContent<ImagesContent>
  )[language]);

export const MainSection = ({ eventName }: { eventName: string }) => {
  const [imageSrcs, setImageSrcs] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const Language = useLanguage();
  const imagesContent = getImagesContent(Language.Current);

  useEffect(() => {
    setLoading(true); // Set loading true before starting the fetch
    getAlbumData()
      .then((data) => {
        setImageSrcs(data[eventName]);
      })
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: "error",
          text: imagesContent.albumLoadFailed,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventName, imagesContent.albumLoadFailed]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="title font-bold">{eventName}</div>

        {!imageSrcs || imageSrcs.length === 0 ? (
          <div className="label font-bold">
            {loading ? <LoadingOutlined /> : imagesContent.noImages}
          </div>
        ) : (
          <div className="w-full flex flex-wrap">
            {imageSrcs.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Image ${index + 1} from ${eventName}`}
                className="w-1/4 aspect-square object-cover rounded outline md:w-1/5"
                onError={(e) => {
                  console.error(e);
                  Toast.fire({
                    icon: "error",
                    text: imagesContent.imageLoadFailed,
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
