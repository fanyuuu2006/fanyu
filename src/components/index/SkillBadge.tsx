import { OutsideLink, OutsideLinkProps } from "fanyucomponents";
import { MyImage } from "../MyImage";
import { SkillItem } from "@/types";

const normalizeTitle = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "");

type SkillBadgeProps = OutsideLinkProps & {
  item: SkillItem;
};
export const SkillBadge = ({ item }: SkillBadgeProps) => {
  const href = item.url
    ? item.url
    : `https://www.google.com/search?q=${encodeURIComponent(item.title)}`;
  const imgSrc = `/images/skills/${normalizeTitle(item.title)}.svg`;
  return (
    <OutsideLink
      href={href}
      key={item.title}
      className="card primary font-mono p-1.5 rounded-2xl tooltip size-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      data-tooltip={item.title}
    >
      <MyImage
        src={imgSrc}
        alt={item.title}
        className="w-full h-full object-contain"
      />
    </OutsideLink>
  );
};
