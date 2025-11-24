import { NextResponse } from "next/server";
import { listAllFiles, toItem } from "@/utils/googleapis";
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
      return NextResponse.json({ error: "索引無效" }, { status: 400 });
    }

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!rootFolderId) {
      return NextResponse.json(
        { error: "缺少 Google Drive 根資料夾 ID" },
        { status: 500 }
      );
    }

    // 找年份資料夾
    const yearFolders = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
      , ["id", "name"]
    );
    const yearFolder = yearFolders.find((f) => f.name === year);
    if (!yearFolder) {
      return NextResponse.json({ error: "找不到年份" }, { status: 404 });
    }

    // 處理 event = "其他"
    if (eventName === "其他") {
      const items = await listAllFiles(
        `'${yearFolder.id}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`
      );
      const item = items[index];

      if (!item) {
        return NextResponse.json(
          { error: "索引超出範圍" },
          { status: 404 }
        );
      }

      return NextResponse.json(toItem(item));
    }

    // 找事件資料夾
    const eventFolders = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
      , ["id", "name"]
    );
    const eventFolder = eventFolders.find((e) => e.name === eventName);
    if (!eventFolder) {
      return NextResponse.json({ error: "找不到事件" }, { status: 404 });
    }

    // 找事件圖片
    const items = await listAllFiles(
      `'${eventFolder.id}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`
    );
    const reversedItems = items;
    const item = reversedItems[index];

    if (!item) {
      return NextResponse.json(
        { error: "索引超出範圍" },
        { status: 404 }
      );
    }

    return NextResponse.json(toItem(item));
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json(
      { error: "伺服器內部錯誤" },
      { status: 500 }
    );
  }
}
