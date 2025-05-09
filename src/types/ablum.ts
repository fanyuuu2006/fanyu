export type AlbumData = {
  [year: string]: {
    其他: string[];
    [eventName: string]: string[];
  };
};
