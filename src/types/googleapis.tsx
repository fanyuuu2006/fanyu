import { SEARCH_FIELDS } from "@/libs/googleapis";
import { drive_v3 } from "googleapis";

export type MyDriveFile<
  K extends (keyof drive_v3.Schema$File)[] = typeof SEARCH_FIELDS
> = Pick<drive_v3.Schema$File, K[number]>;
