import { DateString } from "./date";

export type ExperienceItem = {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  duration:
    | {
        start: DateString;
        end?: DateString;
      }
    | DateString;
  link?: string;
  description?: string;
};
