/* eslint-disable @typescript-eslint/no-explicit-any */
import { drive, SEARCH_FIELDS } from "@/libs/googleapis";
import { Album } from "@/types/album";
import { GaxiosResponse } from "gaxios";
import { drive_v3 } from "googleapis";
import { MyDriveFile } from "../types/googleapis";
import { proxyUrl } from "./url";

export const listAllFiles = async <
  Keys extends (keyof drive_v3.Schema$File)[] = typeof SEARCH_FIELDS
>(
  query: string,
  searchFields?: Keys
): Promise<MyDriveFile<Keys>[]> => {
  const files: MyDriveFile<Keys>[] = [];
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

const _createFileItem = <
  T extends MyDriveFile,
  G extends Record<string, any | ((item: T) => any)>
>(
  keyGenerators: G
) => {
  return (
    file: T
  ): T & {
    [K in keyof G]: G[K] extends (item: T) => infer R ? R : G[K];
  } => {
    const result: any = { ...file };

    for (const key in keyGenerators) {
      const gen = keyGenerators[key];
      result[key] = typeof gen === "function" ? gen(file) : gen;
    }

    return result;
  };
};
export const toEvent = (
  file: MyDriveFile
): Omit<Album[number]["events"][number], "items"> => {
  return _createFileItem({
    thumbnailLink: file.thumbnailLink
      ? proxyUrl(file.thumbnailLink)
      : undefined,
  })(file);
};
export const toItem = (
  file: MyDriveFile
): Album[number]["events"][number]["items"][number] => {
  return _createFileItem({
    thumbnailLink: file.thumbnailLink
      ? proxyUrl(file.thumbnailLink)
      : undefined,
    url: `/api/album/item/${file.id}`,
    iconLink: file.iconLink?.replace(/16/, "128") || undefined,
  } as Album[number]["events"][number]["items"][number])(file);
};
