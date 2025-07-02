export type ContactItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  backgrounds?: React.CSSProperties["color"][];
  info: {
    image?: string;
    id: string;
    name: string;
    about?: React.ElementType;
  };
};

export enum ContactCategory {
  SocialNetwork = "Social Network",
  InstantMessaging = "Instant Messaging",
}
