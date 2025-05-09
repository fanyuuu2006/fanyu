import { NextResponse } from "next/server";
import { listAllFiles } from "@/utils/googleapis";
import { deslugify } from "@/utils/url";

export async function GET(
  req: Request,
  {
    params,
  }: { params: Promise<{ year: string; eventName: string; index: string }> }
) {
  try {
    const { year: y, eventName: eN, index: i } = await params;

    const year = deslugify(y);
    const eventName = deslugify(eN);
    const index = parseInt(deslugify(i));

    if (isNaN(index) || index < 0) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!rootFolderId) {
      return NextResponse.json(
        { error: "Missing Google Drive root folder ID" },
        { status: 500 }
      );
    }

    // 找年份資料夾
    const yearFolders = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const yearFolder = yearFolders.find((f) => f.name === year);
    if (!yearFolder) {
      return NextResponse.json({ error: "Year not found" }, { status: 404 });
    }

    // 處理 event = "其他"
    if (eventName === "其他") {
      const images = await listAllFiles(
        `'${yearFolder.id}' in parents and mimeType contains 'image/'`
      );
      const reversedImages = images.reverse();
      const image = reversedImages[index];

      if (!image) {
        return NextResponse.json(
          { error: "Image index out of range" },
          { status: 404 }
        );
      }

      return NextResponse.json(`/api/image/${image.id}`);
    }

    // 找事件資料夾
    const eventFolders = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const eventFolder = eventFolders.find((e) => e.name === eventName);
    if (!eventFolder) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // 找事件圖片
    const images = await listAllFiles(
      `'${eventFolder.id}' in parents and mimeType contains 'image/'`
    );
    const reversedImages = images.reverse();
    const image = reversedImages[index];

    if (!image) {
      return NextResponse.json(
        { error: "Image index out of range" },
        { status: 404 }
      );
    }

    return NextResponse.json(`/api/image/${image.id}`);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
