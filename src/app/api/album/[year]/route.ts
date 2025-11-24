import { NextResponse } from "next/server";
import { listAllFiles, toEvent } from "@/utils/googleapis";
import { deslugify } from "@/utils/url";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year: y } = await params;
    const year = deslugify(y);

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

    // 找年份資料夾
    const yearFolders = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
      ["id", "name"]
    );
    const yearFolder = yearFolders.find((f) => f.name === year);
    if (!yearFolder) {
      return NextResponse.json([], { status: 404 });
    }

    // 找事件資料夾
    const eventFolders = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
      , ["id", "name", "createdTime"]
    );
    const events = eventFolders.map(toEvent);

    const otheritems = await listAllFiles(
      `'${yearFolder.id}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`
    );

    // 加上「其他」類別
    if (otheritems.length > 0) {
      events.push({
        name: "其他",
      });
    }

    return NextResponse.json(events);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json([], { status: 500 });
  }
}
