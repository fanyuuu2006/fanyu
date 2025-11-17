"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { Title } from "../custom/Title";
import { BoardGameResponse } from "@/types/bgc";

type BgcContent = Record<"bgc" | "noData" | "total", string>;
const BGC_CONTENT: LanguageContent<BgcContent> = {
  chinese: {
    bgc: "桌上遊戲研究社",
    noData: "沒有資料",
    total: "共 {count} 款桌遊",
  },
  english: {
    bgc: "Board Game Club",
    noData: "No Data",
    total: "Total {count} games",
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
                <div key={item.id} className="card" id={`${item.id}`}></div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
