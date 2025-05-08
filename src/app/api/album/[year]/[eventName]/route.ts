import { NextResponse } from "next/server";
import { listAllFiles } from "@/utils/googleapis";
import { deslugify } from "@/utils/url";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string; eventName: string }> }
) {
  try {
    const year = deslugify((await params).year);
    const eventName = deslugify((await params).eventName);

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    const years = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const yearFolder = years.find((f) => f.name === year);
    if (!yearFolder) return NextResponse.json({}, { status: 404 });

    const events = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );

    const eventFolder = events.find((e) => e.name === eventName);
    if (!eventFolder) {
      //「其他」：不是資料夾，而是圖片直接放在年份資料夾底下
      if (eventName === "其他") {
        const otherImages = await listAllFiles(
          `'${yearFolder.id}' in parents and mimeType contains 'image/' and not mimeType = 'application/vnd.google-apps.folder'`
        );
        return NextResponse.json(otherImages.map((f) => `/api/image/${f.id}`));
      }
      return NextResponse.json([], { status: 404 });
    }

    // 否則從該事件資料夾讀圖片
    const eventImages = await listAllFiles(
      `'${eventFolder.id}' in parents and mimeType contains 'image/'`
    );

    return NextResponse.json(
      eventImages.map((f) => `/api/image/${f.id}`).toReversed()
    );
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
