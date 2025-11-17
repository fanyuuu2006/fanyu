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
    <div className={cn("card p-6 flex flex-col gap-2", className)} {...rest}>
      <div className="text-sm text-[var(--text-color-muted)] font-mono">
        #{item.id}
      </div>
      <h3 className="text-xl font-bold text-[var(--text-color)] leading-tight">
        {item.name[language.Current]}
      </h3>
      <div className="flex gap-2">
        {item.type && (
          <span className="bg-[var(--text-color-primary)] text-[var(--background-color)] text-sm px-3 py-1 rounded-full font-medium">
            {item.type}
          </span>
        )}
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
            item.inventory
              ? "bg-green-900/20 text-green-300 border-green-800"
              : "bg-red-900/20 text-red-300 border-red-800"
          }`}
        >
          {item.inventory ? "✓" : "○"}{" "}
          {item.inventory ? bgcContent.checked : bgcContent.unchecked}
        </span>
      </div>

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

      {/* 狀態詳情 */}
      <div className="border-t border-[var(--border-color)] pt-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {["shrinkWrap", "appearance", "missingParts", "sleeves"].map(
            (statusKey) => (
              <div key={statusKey} className="flex flex-col gap-1">
                <span className="text-[var(--text-color-muted)] text-xs font-medium uppercase tracking-wide">
                  {bgcContent[statusKey as keyof BgcContent]}
                </span>
                <span className="text-[var(--text-color)] font-medium">
                  {item.status[statusKey as keyof typeof item.status]}
                </span>
              </div>
            )
          )}
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
  );
};
