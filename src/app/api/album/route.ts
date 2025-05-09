import { NextResponse } from "next/server";
import { listAllFiles } from "@/utils/googleapis";

export async function GET() {
  try {
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    const years = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    return NextResponse.json(years.map((folder) => folder.name));
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json([], { status: 500 });
  }
}
