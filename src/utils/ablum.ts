"use server";
import { AlbumData } from "@/types/ablum";
import fs from "fs/promises";
import path from "path";

export const getAlbumData = async (): Promise<AlbumData> => {
  const albumsDir = path.join(process.cwd(), "public", "Album");

  try {
    const albumsDirStat = await fs.stat(albumsDir);
    if (!albumsDirStat.isDirectory()) {
      throw new Error(`資料夾 ${albumsDir} 不存在或不是資料夾`);
    }

    const eventNames = await fs.readdir(albumsDir);
    const data: AlbumData = {};

    for (const eventName of eventNames) {
      const eventPath = path.join(albumsDir, eventName);
      const stat = await fs.stat(eventPath);
      if (!stat.isDirectory()) continue;

      const files = await fs.readdir(eventPath);
      const images = files
        .filter((file) => /\.(jpe?g|png)$/i.test(file))
        .map((file) => `/Album/${eventName}/${file}`);

      data[eventName] = images;
    }

    return data;
  } catch (error) {
    console.warn("⚠️ 讀取 Albums 資料夾時發生錯誤:", error);
    return {};
  }
};


