"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { Title } from "../custom/Title";
import { BoardGameResponse } from "@/types/bgc";
import { BoardGameCard } from "./BoardGameCard";

type BgcContent = Record<
  | "bgc"
  | "noData"
  | "total"
  | "recommendedCounts"
  | "checked"
  | "unchecked"
  | "position"
  | keyof BoardGameResponse["data"][number]["status"],
  string
>;
const BGC_CONTENT: LanguageContent<BgcContent> = {
  chinese: {
    bgc: "桌上遊戲研究社",
    noData: "沒有資料",
    total: "共 {count} 款桌遊",
    shrinkWrap: "包裝",
    appearance: "外觀",
    missingParts: "缺件",
    sleeves: "牌套",
    recommendedCounts: "被推薦次數: {count} 次",
    checked: "已清點",
    unchecked: "未清點",
    position: "位置",
  },
  english: {
    bgc: "Board Game Club",
    noData: "No Data",
    total: "Total {count} games",
    shrinkWrap: "Shrink Wrap",
    appearance: "Appearance",
    missingParts: "Missing Parts",
    sleeves: "Sleeves",
    recommendedCounts: "Recommended Counts: {count} times",
    checked: "Checked",
    unchecked: "Unchecked",
    position: "Position",
  },
};

export type MainSectionProps = {
  data: BoardGameResponse;
};

export const MainSection = ({ data }: MainSectionProps) => {
  const Language = useLanguage();
  const bgcContent = BGC_CONTENT[Language.Current];

  return (
    <section>
      <div className="container flex flex-col items-center">
        <Title>{bgcContent.bgc}</Title>

        {data.data.length === 0 ? (
          <div className="text-3xl font-bold">{bgcContent.noData}</div>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <span className="text-[var(--text-color-muted)]">
                {bgcContent.total.replace("{count}", data.total.toString())}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.data.map((item) => (
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
