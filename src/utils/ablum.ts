"use server";
import { AlbumData } from "@/types/ablum";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";

export const getAlbumData = async (): Promise<AlbumData> => {
  const cwd = process.cwd();
  const publicDir = path.join(cwd, "public", "Album");
  const rootDir = path.join(cwd, "Album");

  try {
    // 決定真的要讀哪個資料夾
    let albumDir: string;
    if (fs.existsSync(publicDir) && fs.statSync(publicDir).isDirectory()) {
      albumDir = publicDir;
    } else if (fs.existsSync(rootDir) && fs.statSync(rootDir).isDirectory()) {
      albumDir = rootDir;
    } else {
      console.warn(
        "⚠️ 找不到 Album 資料夾 (public/Album 也不是，根目錄/Album 也不是)"
      );
      return {};
    }

    const eventNames = await fsp.readdir(albumDir);
    const data: AlbumData = {};

    for (const eventName of eventNames) {
      const eventPath = path.join(albumDir, eventName);
      const stat = await fsp.stat(eventPath);
      if (!stat.isDirectory()) continue;

      const files = await fsp.readdir(eventPath);
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
