import { PortfolioItem } from "@/types";
import { GiscusDiv } from "./GiscusDiv";
import { ReadMeDiv } from "./ReadMeDiv";
import { MetaDiv } from "./MetaDiv";

type PortfolioContentSectionProps = {
  item: PortfolioItem;
};

export const PortfolioContentSection = ({
  item,
}: PortfolioContentSectionProps) => {
  return (
    <section id="content">
      <div className="container border-t-4 pt-8 border-(--border) flex flex-col md:flex-row">
        <MetaDiv className="flex md:hidden" item={item} />

        <ReadMeDiv item={item} className="w-full flex-1 min-w-0" />
        <div className="shrink-0 w-full flex flex-col gap-4 md:w-[clamp(256px,25%,320px)]">
          <MetaDiv className="hidden md:flex" item={item} />
          <GiscusDiv item={item} />
        </div>
      </div>
    </section>
  );
};
