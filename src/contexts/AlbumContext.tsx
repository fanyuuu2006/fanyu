"use client";
import { fetcher } from "@/utils/fetcher";
import useSWR, { SWRResponse } from "swr";
import { createContext, useContext, useMemo } from "react";
import { slugify } from "@/utils/url";


/**
 * Album context，提供相冊相關的資料存取方法
 */
const AlbumContext = createContext<{
  /**
   * 獲取所有可用的年份
   */
  useYears: () => SWRResponse<string[]>;
  /**
   * 根據年份獲取該年度的所有活動
   */
  useEvents: (year: string) => SWRResponse<string[]>;
  /**
   * 根據年份和活動名稱獲取所有圖片
   */
  useImages: (year: string, eventName: string) => SWRResponse<string[]>;
  /**
   * 根據年份、活動名稱和索引獲取特定圖片
   */
  useImage: (
    year: string,
    eventName: string,
    index: number
  ) => SWRResponse<string>;
} | null>(null);


/**
 * Album provider 的 props 型別
 */
interface AlbumProviderProps {
  children: React.ReactNode;
}

/**
 * Album Provider 組件
 * 提供相冊相關的資料存取方法給子組件使用
 */
export const AlbumProvider = ({ children }: AlbumProviderProps) => {
  const value = useMemo(
    () => ({
      useYears: () => useSWR<string[]>("/api/album", fetcher),
      useEvents: (year: string) =>
        useSWR<string[]>(`/api/album/${slugify(year)}`, fetcher),
      useImages: (year: string, eventName: string) =>
        useSWR<string[]>(`/api/album/${slugify(year)}/${slugify(eventName)}`, fetcher),
      useImage: (year: string, eventName: string, index: number) =>
        useSWR<string>(`/api/album/${slugify(year)}/${slugify(eventName)}/${index}`, fetcher),
    }),
    []
  );

  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
};

/**
 * Album context hook
 * 提供相冊相關的資料存取方法
 */
export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum 必須在 AlbumProvider 內使用。請確保組件被 AlbumProvider 包裹。");
  }
  return context;
};
