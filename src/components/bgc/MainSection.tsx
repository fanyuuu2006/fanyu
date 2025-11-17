"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { Title } from "../custom/Title";
import { BoardGameResponse } from "@/types/bgc";
import { BoardGameCard } from "./BoardGameCard";
import { useOrder } from "@/hooks/useOrder";

type BgcContent = Record<
  "bgc" | "noData" | "total" | "newest" | "oldest" | "recommended",
  string
>;
const BGC_CONTENT: LanguageContent<BgcContent> = {
  chinese: {
    bgc: "桌上遊戲研究社",
    noData: "沒有資料",
    total: "共 {count} 款桌遊",
    newest: "最新",
    oldest: "最舊",
    recommended: "推薦度",
  },
  english: {
    bgc: "Board Game Club",
    noData: "No Data",
    total: "Total {count} games",
    newest: "Newest",
    oldest: "Oldest",
    recommended: "Recommended",
  },
};

export type MainSectionProps = {
  data: BoardGameResponse;
};

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const bgcContent = BGC_CONTENT[Language.Current];
  const order = useOrder(data.data, {
    newest: {
      label: bgcContent.newest,
      default: true,
      compareFn: (a, b) => b.id - a.id,
    },
    oldest: {
      label: bgcContent.oldest,
      default: true,
      compareFn: (a, b) => a.id - b.id,
    },
    recommended: {
      label: bgcContent.recommended,
      default: false,
      compareFn: (a, b) => b.recommendedCounts - a.recommendedCounts,
    },
  });

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Title>{bgcContent.bgc}</Title>

        {order.data.length === 0 ? (
          <div className="text-3xl font-bold">{bgcContent.noData}</div>
        ) : (
          <>
            <order.div />
            <div className="w-full flex items-center gap-1">
              <span className="text-[var(--text-color-muted)]">
                {bgcContent.total.replace(
                  "{count}",
                  order.data.length.toString()
                )}
              </span>
            </div>
            <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {order.data.map((item) => (
                <BoardGameCard
                  key={item.id}
                  id={item.id.toString()}
                  item={item}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
