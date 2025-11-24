import { MyDriveFile } from "./googleapis";

/**
 * 圖片項目的型別，包含 Google Drive 檔案資訊和相簿 URL
 */
type AlbumImageItem = MyDriveFile & {
  /** 圖片的 API URL，用於前端顯示 */
  url: string;
};

/**
 * 相簿事件的型別，代表某個年份下的特定活動
 */
type AlbumEvent = {
  /** 事件名稱 */
  name: string;
  /** 事件包含的圖片列表 */
  images: AlbumImageItem[];
};

/**
 * 相簿年份的型別，包含該年份的所有事件
 */
type AlbumYear = {
  /** 年份，格式如 "2024" */
  year: string;
  /** 該年份包含的所有事件 */
  events: AlbumEvent[];
};

/**
 * 完整的相簿型別，為年份陣列
 * @example
 * const album: Album = [
 *   {
 *     year: "2024",
 *     events: [
 *       {
 *         name: "春遊",
 *         images: [...]
 *       }
 *     ]
 *   }
 * ];
 */
export type Album = AlbumYear[];
