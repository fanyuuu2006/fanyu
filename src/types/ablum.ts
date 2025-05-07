// export type AlbumData = Record<string, Record<string, string[]>>;
export type AlbumData = {
  [year: string]: {
    其他: string[];
    [eventName: string]: string[];
  };
};
