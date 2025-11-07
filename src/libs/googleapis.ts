import { drive_v3, google } from "googleapis";

// 初始化 Google Drive API 客戶端
export const drive = google.drive({
  version: "v3",
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  }),
});

export const SEARCH_FIELDS = [
  "id",
  "name",
  "createdTime",
  "fileExtension",
  "size",
  "imageMediaMetadata",
  "thumbnailLink",
] as const satisfies (keyof drive_v3.Schema$File)[];
