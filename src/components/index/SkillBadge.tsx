import { OutsideLink, OutsideLinkProps } from "fanyucomponents";
import { SkillItem } from "@/types";

type SkillBadgeProps = OutsideLinkProps & {
  item: SkillItem;
};
export const SkillBadge = ({ item }: SkillBadgeProps) => {
  const href = item.url
    ? item.url
    : `https://www.google.com/search?q=${encodeURIComponent(item.title)}`;
  return (
    <OutsideLink
      href={href}
      key={item.title}
      className="card primary font-mono p-1.5 rounded-lg tooltip size-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      data-tooltip={item.title}
    >
      <item.svg
        className="w-full h-full shrink-0"
      />
    </OutsideLink>
  );
};
