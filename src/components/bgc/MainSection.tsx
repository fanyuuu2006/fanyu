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
                  className="card p-6 flex flex-col gap-1"
                  id={`${item.id}`}
                >
                  {/*桌遊編號 */}
                  <div className="text-sm text-gray-400 mb-2">{item.id}</div>

                  {/* 桌遊名稱 */}
                  <h3 className="text-xl font-bold mb-2">
                    {item.name[Language.Current]}
                  </h3>

                  {/* 桌遊類型 */}
                  <div className="flex gap-1 mb-3">
                    {[item.type].map((tag) => {
                      if (!tag) return null;
                      return (
                        <span
                          key={tag}
                          className="bg-blue-900 text-blue-200 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  {/* 位置資訊 */}
                  {item.position && (
                    <div className="mb-2 text-sm text-[var(--text-color-muted)]">
                      <span className="font-medium">{bgcContent.position}: {item.position}</span>
                    </div>
                  )}

                  {/* 清點狀態 */}
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.inventory
                          ? "bg-green-900 text-green-200"
                          : "bg-red-900 text-red-200"
                      }`}
                    >
                      {item.inventory
                        ? bgcContent.checked
                        : bgcContent.unchecked}
                    </span>
                  </div>

                  {/* 被推薦次數 */}
                  <div className="mb-3 text-sm text-[var(--text-color-muted)]">
                    <span className="font-medium">
                      {bgcContent.recommendedCounts.replace(
                        "{count}",
                        item.recommendedCounts.toString()
                      )}
                    </span>
                  </div>

                  {/* 狀態資訊 */}
                  <div className="border-t border-[var(--text-color-muted)] pt-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-color-muted)]">
                      {[
                        "shrinkWrap",
                        "appearance",
                        "missingParts",
                        "sleeves",
                      ].map((statusKey) => (
                        <div key={statusKey}>
                          <span className="font-medium">
                            {bgcContent[statusKey as keyof BgcContent]}:
                          </span>{" "}
                          {item.status[statusKey as keyof typeof item.status]}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 備註 */}
                  {item.note && (
                    <div className="mt-3 p-2 bg-gray-700 rounded text-sm text-gray-300">
                      <span className="font-medium">備註: </span>
                      {item.note}
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
