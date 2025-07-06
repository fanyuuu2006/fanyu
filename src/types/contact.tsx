import { LanguageOption } from "./language";

export type ContactItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  backgrounds?: React.CSSProperties["color"][];
  info: {
    image?: React.ImgHTMLAttributes<HTMLImageElement>;
    id: string;
    name: string;
    about?: React.FC<{ language: LanguageOption }>;
  };
};

export enum ContactCategory {
  SocialNetwork = "Social Network",
  InstantMessaging = "Instant Messaging",
}
