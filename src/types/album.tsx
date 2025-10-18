export type Album = {
  year: string;
  events: {
    name: string;
    images: {
      url: string;
      name: string;
    }[];
  }[];
}[];
