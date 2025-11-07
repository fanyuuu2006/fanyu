import { drive, SEARCH_FIELDS } from "@/libs/googleapis";
import { Album } from "@/types/album";
import { GaxiosResponse } from "gaxios";
import { drive_v3 } from "googleapis";
import { MyDriveFile } from "../types/googleapis";

export const listAllFiles = async <
  K extends (keyof drive_v3.Schema$File)[] = typeof SEARCH_FIELDS
>(
  query: string,
  searchFields?: K
): Promise<MyDriveFile[]> => {
  const files: MyDriveFile[] = [];
  const fieldsToUse = searchFields ?? SEARCH_FIELDS;
  let pageToken: string | undefined | null = undefined;

  do {
    const res = (await drive.files.list({
      q: query,
      fields: `nextPageToken, files(${fieldsToUse.join(",")})`,
      pageSize: 1000,
      pageToken,
    })) as unknown as GaxiosResponse<drive_v3.Schema$FileList>;

    if (res.data.files) files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return files;
};

export const toImageItem = (
  file: MyDriveFile
): Album[number]["events"][number]["images"][number] => {
  return Object.assign(file, {
    url: `/api/album/image/${file.id}`,
  });
};
