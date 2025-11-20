import { CustomLink } from "@/components/custom/CustomLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { LanguageContent, LanguageOption } from "@/types/language";
import { cn } from "@/utils/className";
import { slugify } from "@/utils/url";
import { ClockCircleOutlined } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import { useMemo } from "react";
import { MyImage } from "@/components/custom/MyImage";

type ExperienceContent = Record<
  "noRecord" | "present" | "role" | "description",
  string
>;
const getExperienceContent = (language: LanguageOption): ExperienceContent =>
  ((
    {
      chinese: {
        noRecord: "無紀錄",
        present: "至今",
        role: "角色/職位",
        description: "詳細描述",
      },
      english: {
        noRecord: "No Record",
        present: "Present",
        role: "Role/Position",
        description: "Description",
      },
    } as LanguageContent<ExperienceContent>
  )[language]);

export type ExperienceCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ExperienceItem;
  }
>;
/**
 * 經驗卡片組件 - 展示工作經驗、教育背景等資訊
 * @param item - 經驗項目資料
 * @param className - 額外的 CSS 類別
 * @param rest - 其他 HTML div 屬性
 */
export const ExperienceCard = ({
  item,
  className,
  ...rest
}: ExperienceCardProps) => {
  const Language = useLanguage();
  const experienceContent = useMemo(
    () => getExperienceContent(Language.Current),
    [Language.Current]
  );

  return (
    <div
      className={cn(`card w-full p-6 md:p-8 flex flex-col gap-6`, className)}
      {...rest}
    >
      {/** 標題區域 */}
      <div className="flex items-start flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-shrink-0 aspect-square h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 rounded-2xl overflow-hidden border-2 border-[var(--border-color)]">
          <MyImage
            src={
              item.imageSrc ||
              `https://s2.googleusercontent.com/s2/favicons?domain_url=${slugify(
                item.links?.[0].href ?? ""
              )}`
            }
            alt={item.name.english}
            className="w-full h-full object-cover bg-[#fff]"
            width={600}
            height={600}
          />
        </div>

        {/** 標題與時間 */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[var(--text-color)] leading-tight">
              {item.name[Language.Current]}
            </h3>
            {item.organization && (
              <p className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold text-[var(--text-color-muted)] leading-snug">
                {item.organization.name[Language.Current]}
              </p>
            )}
            {item.department && (
              <p className="text-sm sm:text-base md:text-base lg:text-lg font-medium text-[var(--text-color-muted)] leading-snug">
                {item.department[Language.Current]}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <ClockCircleOutlined className="text-[var(--text-color-muted)] flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base text-[var(--text-color-muted)] font-medium">
                {typeof item.duration === "string"
                  ? item.duration
                  : `${item.duration.start} ~ ${
                      item.duration.end ?? experienceContent.present
                    }`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/** 內容區域 */}
      <div className="flex flex-col gap-5">
        {/** 連結 */}
        {item.links && (
          <div className="flex gap-2 flex-wrap">
            {item.links.map((link) => (
              <CustomLink
                key={link.href}
                href={link.href}
                className="btn-primary font-medium text-xs sm:text-sm md:text-base flex gap-1 px-4 py-2 rounded-full items-center"
              >
                {link.icon}
                <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {link[Language.Current]}
                </span>
              </CustomLink>
            ))}
          </div>
        )}

        {/** 角色/職位 */}
        {item.role && (
          <div className="flex flex-col gap-3 p-4 sm:p-5 md:p-6 rounded-xl bg-[var(--card-background)] border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color-muted)] text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-bold">
              {experienceContent.role}
            </h4>
            <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-semibold text-[var(--text-color)]">
              {item.role[Language.Current]}
            </p>
          </div>
        )}

        {/** 描述 */}
        {item.description && (
          <div className="flex flex-col gap-3 p-4 sm:p-5 md:p-6 rounded-xl bg-[var(--card-background)] border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color-muted)] text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-bold">
              {experienceContent.description}
            </h4>
            <div className="text-sm sm:text-base md:text-base lg:text-base xl:text-base leading-relaxed">
              <item.description language={Language.Current} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
