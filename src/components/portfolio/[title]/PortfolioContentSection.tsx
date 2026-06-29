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
    <section>
      <div className="container border-t-4 pt-8 border-(--border) flex flex-col md:flex-row">
        <ReadMeDiv item={item} className="w-full flex-1 min-w-0" />
        <div
          className="w-full flex flex-col gap-4 md:w-[minmax(256px,320px)] md:shrink-0 md:sticky md:top-32 md:self-start md:max-h-[calc(100vh-8rem)] md:overflow-y-auto"
          style={{ flexBasis: "clamp(256px,25%,320px)" }}
        >
          <MetaDiv item={item} />
          <GiscusDiv item={item} />
        </div>
      </div>
    </section>
  );
};
