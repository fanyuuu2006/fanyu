import drive from "@/libs/googleapis";
import { GaxiosResponse } from "gaxios";
import { drive_v3 } from "googleapis";

export const listAllFiles = async (
  query: string
): Promise<drive_v3.Schema$File[]> => {
  const files: drive_v3.Schema$File[] = [];
  let pageToken: string | undefined | null = undefined;

  do {
    const res = (await drive.files.list({
      q: query,
      fields: "nextPageToken, files(id, name)",
      pageSize: 1000,
      pageToken,
    })) as unknown as GaxiosResponse<drive_v3.Schema$FileList>;

    if (res.data.files) files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return files;
};
