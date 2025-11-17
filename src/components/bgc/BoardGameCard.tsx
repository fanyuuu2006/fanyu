import { useLanguage } from "@/contexts/LanguageContext";
import { BoardGame } from "@/types/bgc";
import { LanguageContent } from "@/types/language";
import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";

type BgcContent = Record<
  | "recommendedCounts"
  | "checked"
  | "unchecked"
  | "position"
  | "borrowed"
| "notborrowed"
  | keyof BoardGame["status"],
  string
>;
const BGC_CONTENT: LanguageContent<BgcContent> = {
  chinese: {
    shrinkWrap: "包裝",
    appearance: "外觀",
    missingParts: "缺件",
    sleeves: "牌套",
    recommendedCounts: "被推薦次數: {count} 次",
    checked: "已清點",
    unchecked: "未清點",
    position: "位置",
    borrowed: "已借出",
    notborrowed: "未借出",
  },
  english: {
    shrinkWrap: "Shrink Wrap",
    appearance: "Appearance",
    missingParts: "Missing Parts",
    sleeves: "Sleeves",
    recommendedCounts: "Recommended Counts: {count} times",
    checked: "Checked",
    unchecked: "Unchecked",
    position: "Position",
    borrowed: "Borrowed",
    notborrowed: "Not Borrowed",
  },
};

type BoardGameCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: BoardGame;
  }
>;

export const BoardGameCard = ({
  item,
  className,
  ...rest
}: BoardGameCardProps) => {
  const language = useLanguage();
  const bgcContent = BGC_CONTENT[language.Current];

  return (
    <div className={cn("card p-8 flex flex-col gap-6", className)} {...rest}>
      {/* 桌遊 ID */}
      <div className="text-xs text-[var(--text-color-muted)] font-mono tracking-wider uppercase">
        #{item.id}
      </div>

      {/* 桌遊名稱 */}
      <h3 className="text-2xl font-bold text-[var(--text-color)] leading-tight -mt-4">
        {item.name[language.Current]}
      </h3>

      {/* 標籤區域 */}
      <div className="flex flex-wrap gap-3 -mt-2">
        {[
          {
            label: item.type,
            className: "bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--text-color-secondary)] text-white shadow-lg",
          },
          {
            label: item.inventory ? bgcContent.checked : bgcContent.unchecked,
            className: item.inventory
              ? "bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-300 border border-emerald-500/50"
              : "bg-gradient-to-r from-rose-600/30 to-red-600/30 text-rose-300 border border-rose-500/50",
          },
          {
            label: item.borrowed ? bgcContent.borrowed : bgcContent.notborrowed,
            className: item.borrowed
              ? "bg-gradient-to-r from-amber-600/30 to-orange-600/30 text-amber-300 border border-amber-500/50"
              : "bg-gradient-to-r from-violet-600/30 to-purple-600/30 text-violet-300 border border-violet-500/50",
          }
        ].map((tag, i) => {
          if (!tag.label) return null;
          return (
            <span
              key={i}
              className={cn(
                tag.className,
                "text-sm px-4 py-2 rounded-full font-medium tracking-wide"
              )}
            >
              {tag.label}
            </span>
          );
        })}
      </div>

      {/* 位置和推薦次數資訊區域 */}
      <div className="flex flex-col gap-4">
        {item.position && (
          <div className="flex items-center gap-3 p-4 bg-[var(--background-color-tertiary)] rounded-lg border border-[var(--border-color)]">
            <div className="w-2 h-2 rounded-full bg-[var(--text-color-primary)] shadow-sm shadow-[var(--text-color-primary)]/50"></div>
            <span className="font-medium text-[var(--text-color-muted)] text-sm tracking-wide">{bgcContent.position}:</span>
            <span className="text-[var(--text-color)] font-semibold">{item.position}</span>
          </div>
        )}

        {/* 推薦次數顯示 */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[var(--background-color-tertiary)] to-[var(--background-color-secondary)] rounded-lg border border-[var(--border-color)]">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--text-color-quaternary)]/20 border border-[var(--text-color-quaternary)]/30">
            <span className="text-xs font-bold text-[var(--text-color-quaternary)]">★</span>
          </div>
          <span className="font-medium text-[var(--text-color)] text-sm tracking-wide">
            {bgcContent.recommendedCounts.replace(
              "{count}",
              item.recommendedCounts.toString()
            )}
          </span>
        </div>
      </div>

      {/* 狀態詳情區域 */}
      <div className="border-t border-[var(--border-color)] pt-6 mt-2">
        <div className="grid grid-cols-2 gap-4">
          {/* 遍歷桌遊的各種狀態項目 */}
          {["shrinkWrap", "appearance", "missingParts", "sleeves"].map(
            (statusKey) => (
              <div key={statusKey} className="flex flex-col gap-2 p-4 bg-[var(--background-color-tertiary)]/50 rounded-lg border border-[var(--border-color)]/50 transition-all duration-300 hover:bg-[var(--background-color-tertiary)] hover:border-[var(--border-color)]">
                {/* 狀態標題 */}
                <span className="text-[var(--text-color-muted)] text-xs font-semibold uppercase tracking-wider">
                  {bgcContent[statusKey as keyof BgcContent]}
                </span>
                {/* 狀態值 */}
                <span className="text-[var(--text-color)] font-bold text-sm">
                  {item.status[statusKey as keyof typeof item.status]}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* 備註區域（如果有備註的話） */}
      {item.note && (
        <div className="mt-4 p-5 bg-gradient-to-br from-[var(--background-color-tertiary)] to-[var(--background-color-secondary)] border border-[var(--border-color)] rounded-xl shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 mt-0.5 rounded-full bg-[var(--text-color-secondary)]/20 border border-[var(--text-color-secondary)]/30 flex-shrink-0">
              <span className="text-xs font-bold text-[var(--text-color-secondary)]">!</span>
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[var(--text-color-muted)] text-sm tracking-wide block mb-2">備註：</span>
              <span className="text-[var(--text-color)] font-medium leading-relaxed">{item.note}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
