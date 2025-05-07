import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { AlbumData } from "@/types/ablum";

function isImageFile(file: string) {
  return /\.(jpe?g|png|webp)$/i.test(file);
}

export async function GET() {
  try {
    const albumDir = path.join(process.cwd(), "public", "Album");
    const albumDirStat = await fs.stat(albumDir);
    if (!albumDirStat.isDirectory()) {
      throw new Error(`資料夾 ${albumDir} 不存在或不是資料夾`);
    }

    const years = await fs.readdir(albumDir);
    const data: AlbumData = {};

    for (const year of years) {
      const yearDir = path.join(albumDir, year);
      const yearDirStat = await fs.stat(yearDir);
      if (!yearDirStat.isDirectory()) continue;

      const eventNames = await fs.readdir(yearDir);
      const yearData: Record<string, string[]> = {}; // 暫存該年份所有事件
      const otherImages: string[] = []; // 暫存"其他"圖片

      for (const eventName of eventNames) {
        const eventPath = path.join(yearDir, eventName);
        const stat = await fs.stat(eventPath);

        if (stat.isDirectory()) {
          const files = await fs.readdir(eventPath);
          const imageSrcs = files
            .filter(isImageFile)
            .map((file) => `/Album/${year}/${eventName}/${file}`);

          if (imageSrcs.length > 0) {
            yearData[eventName] = imageSrcs;
          }
        } else if (isImageFile(eventName)) {
          otherImages.push(`/Album/${year}/${eventName}`);
        }
      } // 把每年的事件加入到主 data 中，最後再加 "其他"
      data[year] = { ...yearData, 其他: otherImages };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
