"use client";
import { fetcher } from "@/utils/fetcher";
import useSWR, { SWRResponse } from "swr";
import { createContext, useContext, useMemo } from "react";
import { slugify } from "@/utils/url";

const AlbumContext = createContext<{
  useYears: () => SWRResponse<string[]>;
  useEvents: (year: string) => SWRResponse<string[]>;
  useImages: (year: string, eventName: string) => SWRResponse<string[]>;
  useImage: (
    year: string,
    eventName: string,
    index: number
  ) => SWRResponse<string>;
} | null>(null);

const useYearsHook = () => useSWR<string[]>("/api/album", fetcher);
const useEventsHook = (year: string) =>
  useSWR<string[]>(`/api/album/${slugify(year)}`, fetcher);
const useImagesHook = (y: string, e: string) =>
  useSWR<string[]>(`/api/album/${slugify(y)}/${slugify(e)}`, fetcher);
const useImageHook = (y: string, e: string, i: number) =>
  useSWR<string>(`/api/album/${slugify(y)}/${slugify(e)}/${i}`, fetcher);

export const AlbumProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      useYears: useYearsHook,
      useEvents: useEventsHook,
      useImages: useImagesHook,
      useImage: useImageHook,
    }),
    []
  );

  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
};

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum 必須在 AlbumProvider 內使用");
  }
  return context;
};
