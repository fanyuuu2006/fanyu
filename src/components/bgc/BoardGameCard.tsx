import { useLanguage } from "@/contexts/LanguageContext";
import { BoardGame } from "@/types/bgc";
import { LanguageContent, LanguageOption } from "@/types/language";
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
    recommendedCounts: "被推薦次數",
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
    recommendedCounts: "Recommended Counts",
    checked: "Checked",
    unchecked: "Unchecked",
    position: "Position",
    borrowed: "Borrowed",
    notborrowed: "Not Borrowed",
  },
};

const isEmpty = (str: string | undefined) =>
  !str || str.trim() === "" || str.trim().toLowerCase() === "無";

const getName = (item: BoardGame, lang: LanguageOption) => {
  const other = lang === "chinese" ? "english" : "chinese";
  const mainEmpty = isEmpty(item.name[lang]);

  return {
    main: !mainEmpty ? item.name[lang] : item.name[other],
    sub: mainEmpty ? undefined : item.name[other],
  };
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
  const name = getName(item, language.Current);

  return (
    <div className={cn("card p-5 flex flex-col gap-3", className)} {...rest}>
      {/* 桌遊 ID */}
      <div className="text-base text-[var(--text-color-muted)] font-mono tracking-wide">
        #{item.id}
      </div>

      {/* 桌遊名稱 */}
      <div className="flex flex-col gap-1 -mt-2">
        <h3 className="text-lg font-bold text-[var(--text-color)] leading-tight">
          {name.main}
        </h3>

        {name.sub && (
          <h4 className="text-sm font-medium text-[var(--text-color-muted)] leading-tight">
            {name.sub}
          </h4>
        )}
      </div>

      {/* 標籤區域 */}
      <div className="flex flex-wrap gap-2 -mt-1">
        {[
          {
            label: item.type,
            className:
              "bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--text-color-secondary)] text-white shadow-lg",
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
          },
        ].map((tag, i) => {
          if (!tag.label) return null;
          return (
            <span
              key={i}
              className={cn(
                tag.className,
                "text-xs px-3 py-1.5 rounded-full font-medium tracking-wide"
              )}
            >
              {tag.label}
            </span>
          );
        })}
      </div>

      {/* 位置和推薦次數資訊區域 */}
      <div className="flex flex-col gap-2">
        {[
          {
            label: bgcContent.position,
            value: item.position,
          },
          {
            label: bgcContent.recommendedCounts,
            value: item.recommendedCounts,
          },
        ].map((info) => {
          if (!info.value) return null;
          return (
            <div
              key={info.label}
              className="flex items-center gap-2 p-2 bg-[var(--background-color-tertiary)] rounded-lg border border-[var(--border-color)]"
            >
              <span className="font-medium text-[var(--text-color-muted)] text-xs tracking-wide">
                {info.label}:
              </span>
              <span className="text-[var(--text-color)] font-semibold text-sm">
                {info.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* 狀態詳情區域 */}
      <div className="border-t border-[var(--border-color)] pt-3 mt-1">
        <div className="grid grid-cols-2 gap-3">
          {/* 遍歷桌遊的各種狀態項目 */}
          {["shrinkWrap", "appearance", "missingParts", "sleeves"].map(
            (statusKey) => (
              <div
                key={statusKey}
                className="flex flex-col gap-1 px-3 py-2 bg-[var(--background-color-tertiary)]/50 rounded-lg border border-[var(--border-color)]/50 transition-all duration-300 hover:bg-[var(--background-color-tertiary)] hover:border-[var(--border-color)]"
              >
                {/* 狀態標題 */}
                <span className="text-[var(--text-color-muted)] text-xs font-semibold uppercase tracking-wide">
                  {bgcContent[statusKey as keyof BgcContent]}
                </span>
                {/* 狀態值 */}
                <span className="text-[var(--text-color)] font-bold text-xs">
                  {item.status[statusKey as keyof typeof item.status]}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* 備註區域（如果有備註的話） */}
      {item.note && (
        <div className="py-2 px-3 bg-gradient-to-br from-[var(--background-color-tertiary)] to-[var(--background-color-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <span className="font-semibold text-[var(--text-color-muted)] text-xs tracking-wide block">
                備註：
              </span>
              <span className="text-[var(--text-color)] font-medium text-sm leading-relaxed">
                {item.note}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
