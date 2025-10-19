import { drive_v3 } from "googleapis";

export type Album = {
  year: string;
  events: {
    name: string;
    images: (drive_v3.Schema$File & {
      url: string;
    })[];
  }[];
}[];
