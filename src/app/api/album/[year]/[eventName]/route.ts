import { NextResponse } from "next/server";
import { listAllFiles, toImageItem } from "@/utils/googleapis";
import { deslugify } from "@/utils/url";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string; eventName: string }> }
) {
  try {
    const { year: y, eventName: eN } = await params;
    const year = deslugify(y);
    const eventName = deslugify(eN);

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

    // 找年份資料夾
    const yearFolders = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const yearFolder = yearFolders.find((f) => f.name === year);
    if (!yearFolder) {
      return NextResponse.json([], { status: 404 });
    }

    // 若為「其他」分類（圖片直接放在年份底下）
    if (eventName === "其他") {
      const images = await listAllFiles(
        `'${yearFolder.id}' in parents and mimeType contains 'image/'`
      );
      const result = images.map((f) => toImageItem(f));
      return NextResponse.json(result);
    }

    // 否則找該事件資料夾
    const eventFolders = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const eventFolder = eventFolders.find((f) => f.name === eventName);
    if (!eventFolder) {
      return NextResponse.json([], { status: 404 });
    }

    // 找該事件底下的圖片
    const images = await listAllFiles(
      `'${eventFolder.id}' in parents and mimeType contains 'image/'`
    );
    const result = images.map((f) => toImageItem(f));

    return NextResponse.json(result);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json([], { status: 500 });
  }
}
