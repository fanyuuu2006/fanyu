import {drive, SEARCH_FIELDS} from "@/libs/googleapis";
import { Album } from "@/types/album";
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
      fields: `nextPageToken, files(${SEARCH_FIELDS.join(",")})`,
      pageSize: 1000,
      pageToken,
    })) as unknown as GaxiosResponse<drive_v3.Schema$FileList>;

    if (res.data.files) files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return files;
};

export const toImageItem = (
  file: drive_v3.Schema$File
): Album[number]["events"][number]["images"][number] => {
  return Object.assign(file, {
    url: `/api/album/image/${file.id}`,
  });
};
