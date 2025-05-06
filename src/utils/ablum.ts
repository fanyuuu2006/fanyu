"use server";
import { AlbumData } from "@/types/ablum";
import fs from "fs/promises";
import path from "path";

export const getAlbumData = async (): Promise<AlbumData> => {
  const albumDir = path.join(process.cwd(), "public", "Album");

  try {
    const albumDirStat = await fs.stat(albumDir);
    if (!albumDirStat.isDirectory()) {
      throw new Error(`資料夾 ${albumDir} 不存在或不是資料夾`);
    }

    const eventNames = await fs.readdir(albumDir);
    const data: AlbumData = {};

    for (const eventName of eventNames) {
      const eventPath = path.join(albumDir, eventName);
      const stat = await fs.stat(eventPath);
      if (!stat.isDirectory()) continue;

      const files = await fs.readdir(eventPath);
      const imageSrc = files
        .filter((file) => /\.(jpe?g|png)$/i.test(file))
        .map((file) => `/Album/${eventName}/${file}`);

      data[eventName] = imageSrc;
    }

    return data;
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return {};
  }
};


