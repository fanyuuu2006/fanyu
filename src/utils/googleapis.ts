import drive from "@/lib/googleapis";
import { GaxiosResponse } from "gaxios";
import { drive_v3 } from "googleapis";

export const listAllFiles = async (
  query: string
): Promise<drive_v3.Schema$File[]> => {
  const files: drive_v3.Schema$File[] = [];
  let pageToken: string | undefined | null = undefined;

  do {
    const res: GaxiosResponse<drive_v3.Schema$FileList> =
      await drive.files.list({
        q: query,
        fields: "nextPageToken, files(id, name)",
        pageSize: 1000,
        pageToken,
      });

    if (res.data.files) files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return files;
};
