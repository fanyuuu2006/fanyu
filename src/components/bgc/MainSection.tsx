"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageContent } from "@/types/language";
import { Title } from "../custom/Title";
import { BoardGameResponse } from "@/types/bgc";

type BgcContent = Record<
  | "bgc"
  | "noData"
  | "total"
  | "recommendedCounts"
  | "checked"
  | "unchecked"
  |"position"
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
                <div
                  key={item.id}
                  className="card p-6 md:p-8 flex flex-col gap-4"
                  id={`${item.id}`}
                >
                  {/* 頂部區域：編號和名稱 */}
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-[var(--text-color-muted)] font-mono">
                      #{item.id}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-color)] leading-tight">
                      {item.name[Language.Current]}
                    </h3>
                  </div>

                  {/* 標籤和狀態區域 */}
                  <div className="flex flex-col gap-3">
                    {/* 桌遊類型標籤 */}
                    {item.type && (
                      <div className="flex gap-2">
                        <span className="bg-[var(--text-color-primary)] text-[var(--background-color)] text-sm px-3 py-1 rounded-full font-medium">
                          {item.type}
                        </span>
                      </div>
                    )}

                    {/* 清點狀態 */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                          item.inventory
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                        }`}
                      >
                        {item.inventory ? "✓" : "○"} {item.inventory ? bgcContent.checked : bgcContent.unchecked}
                      </span>
                    </div>
                  </div>

                  {/* 資訊區域 */}
                  <div className="flex flex-col gap-3 text-sm">
                    {/* 位置資訊 */}
                    {item.position && (
                      <div className="flex items-center gap-2 text-[var(--text-color-muted)]">
                        <span className="font-medium">{bgcContent.position}:</span>
                        <span>{item.position}</span>
                      </div>
                    )}

                    {/* 推薦次數 */}
                    <div className="flex items-center gap-2 text-[var(--text-color-muted)]">
                      <span className="font-medium">
                        {bgcContent.recommendedCounts.replace(
                          "{count}",
                          item.recommendedCounts.toString()
                        )}
                      </span>
                    </div>
                  </div>

                  {/* 狀態詳情 */}
                  <div className="border-t border-[var(--border-color)] pt-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        "shrinkWrap",
                        "appearance", 
                        "missingParts",
                        "sleeves",
                      ].map((statusKey) => (
                        <div key={statusKey} className="flex flex-col gap-1">
                          <span className="text-[var(--text-color-muted)] text-xs font-medium uppercase tracking-wide">
                            {bgcContent[statusKey as keyof BgcContent]}
                          </span>
                          <span className="text-[var(--text-color)] font-medium">
                            {item.status[statusKey as keyof typeof item.status]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 備註 */}
                  {item.note && (
                    <div className="mt-2 p-3 bg-[var(--background-color-tertiary)] border border-[var(--border-color)] rounded-lg">
                      <div className="text-sm text-[var(--text-color-muted)]">
                        <span className="font-medium">備註：</span>
                        <span className="ml-2 text-[var(--text-color)]">{item.note}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
