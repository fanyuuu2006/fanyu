import { NextResponse } from "next/server";
import { AlbumData } from "@/types/ablum";
import { listAllFiles } from "@/utils/googleapis";

export async function GET() {
  try {
    // 1️⃣ 讀取環境變數中設定的「根資料夾 ID」
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    const data: AlbumData = {}; // 最終要回傳的物件

    // 2️⃣ 拿到「年份」資料夾（Drive API 回傳的是前 100 筆，可改用 listAllFiles 以支援分頁）
    const years = await listAllFiles(
      `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
    );
    if (!years) throw new Error("No years folder found");

    // 3️⃣ 逐一處理每一年份
    for (const year of years) {
      const yearFolderId = year.id!; // 資料夾的唯一 ID
      const yearFolderName = year.name!; // 資料夾名稱，作為年份字串

      // 4️⃣ 讀取該年份底下所有「事件（子資料夾）」
      const events = await listAllFiles(
        `'${yearFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`
      );

      const yearData: Record<string, string[]> = {}; // 暫存此年份所有事件的圖片清單
      const otherImages: string[] = []; // 暫存此年份「直接放在年份資料夾下」的圖片

      // 5️⃣ 處理每個事件資料夾
      for (const event of events) {
        const eventId = event.id!; // 事件資料夾 ID
        const eventName = event.name!; // 事件名稱

        // 6️⃣ 列出該事件資料夾內所有圖片（使用分頁函式 listAllFiles）
        const eventImages = await listAllFiles(
          `'${eventId}' in parents and mimeType contains 'image/'`
        );
        // 7️⃣ 轉成前端可用的公開 URL
        const imageSrcs = eventImages.map(
          (file) => `/api/image/${file.id}`
        );
        yearData[eventName] = imageSrcs;
      }

      // 8️⃣ 把「年份資料夾下但不在任何事件子資料夾內」的圖片歸到 otherImages
      const otherImagesFiles = await listAllFiles(
        `'${yearFolderId}' in parents
           and mimeType contains 'image/'
           and not mimeType = 'application/vnd.google-apps.folder'`
      );
      otherImages.push(
        ...otherImagesFiles.map(
          (file) => `/api/image/${file.id}`
        )
      );

      // 9️⃣ 最後把這一年份的所有事件與「其他」組成物件，放入 data
      data[yearFolderName] = {
        ...yearData,
        其他: otherImages,
      };
    }

    // 🔟 回傳整個相簿資料結構
    return NextResponse.json(data);
  } catch (error) {
    console.warn("⚠️ 讀取 Album 資料夾時發生錯誤:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
