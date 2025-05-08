import { NextResponse } from "next/server";
import { listAllFiles } from "@/utils/googleapis";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year } = await params;

    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    const years = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    const yearFolder = years.find((f) => f.name === year);
    if (!yearFolder) return NextResponse.json({}, { status: 404 });

    const events = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );

    const yearData: Record<string, string[]> = {};
    for (const event of events) {
      const eventImages = await listAllFiles(
        `'${event.id}' in parents and mimeType contains 'image/'`
      );
      yearData[event.name!] = eventImages
        .map((file) => `/api/image/${file.id}`)
        .toReversed();
    }

    const otherImagesFiles = await listAllFiles(
      `'${yearFolder.id}' in parents and mimeType contains 'image/' and not mimeType = 'application/vnd.google-apps.folder'`
    );

    yearData["其他"] = otherImagesFiles.map((file) => `/api/image/${file.id}`);

    return NextResponse.json(yearData);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
