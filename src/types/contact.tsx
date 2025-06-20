export type ContactItem = {
  label: string;
  icon: React.ReactNode;
  id: string;
  href: string;
  backgrounds?: React.CSSProperties["color"][];
};

export enum ContactCategory {
  SocialNetwork = "Social Network",
  InstantMessaging = "Instant Messaging",
}
