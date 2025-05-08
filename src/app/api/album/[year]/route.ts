import { NextResponse } from "next/server";
import { listAllFiles } from "@/utils/googleapis";
import { deslugify } from "@/utils/url";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const year = deslugify((await params).year);

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    const years = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const yearFolder = years.find((f) => f.name === year);
    if (!yearFolder) return NextResponse.json({}, { status: 404 });

    const events = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );

    const eventNames = [...events.map((event) => event.name), "其他"];

    return NextResponse.json(eventNames);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
