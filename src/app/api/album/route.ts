// app/api/albums/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { AlbumData } from "@/types/ablum";

export async function GET() {
  try {
    const albumDir = path.join(process.cwd(), "public", "Album");
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
        .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
        .map((file) => `/Album/${eventName}/${file}`);

      data[eventName] = imageSrc;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
