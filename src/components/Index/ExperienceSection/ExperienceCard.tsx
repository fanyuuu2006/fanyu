import { CustomLink } from "@/components/custom/CustomLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { LanguageContent, LanguageOption } from "@/types/language";
import { cn } from "@/utils/className";
import { slugify } from "@/utils/url";
import { ClockCircleOutlined } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import { useMemo } from "react";

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
      className={cn(`card w-full p-6 lg:p-8 gap-4 flex flex-col`, className)}
      {...rest}
    >
      {/** 圖片 */}
      <div className="flex items-start flex-col lg:flex-row gap-3">
        <div className="flex-shrink-0 h-20 w-20 md:h-28 md:w-28 rounded-3xl overflow-hidden border-2 border-[var(--border-color)]">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
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
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-color)] leading-tight">
              {item.name[Language.Current]}
            </h3>
            {item.organization && (
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-[var(--text-color-muted)] leading-snug">
                {item.organization.name[Language.Current]}
              </p>
            )}
            {item.department && (
              <p className="text-base md:text-lg lg:text-xl font-medium text-[var(--text-color-muted)] leading-snug">
                {item.department[Language.Current]}
              </p>
            )}
            <p className="flex items-center gap-3 text-sm md:text-base text-[var(--text-color-muted)]">
              <ClockCircleOutlined />
              <span className="font-medium">
                {`${item.duration.start ?? experienceContent.noRecord} ~ ${
                  item.duration.end ?? experienceContent.present
                }`}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/** 連結 */}
        {item.links && (
          <div className="flex gap-3 flex-wrap">
            {item.links.map((link) => (
              <CustomLink
                key={link.href}
                href={link.href}
                className="btn-primary text-sm md:text-base flex gap-2 px-3 py-2 rounded-full items-center"
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
          <div className="flex flex-col gap-2 p-4 md:p-6 rounded-3xl border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color-muted)] text-lg md:text-xl lg:text-2xl font-bold">
              {experienceContent.role}
            </h4>
            <p className="text-base md:text-lg font-semibold">
              {item.role[Language.Current]}
            </p>
          </div>
        )}
        {/** 描述 */}
        {item.description && (
          <div className="flex flex-col gap-2 p-4 md:p-6 rounded-3xl border border-[var(--border-color)]">
            <h4 className="text-[var(--text-color-muted)] text-lg md:text-xl lg:text-2xl font-bold">
              {experienceContent.description}
            </h4>
            <div>
              <item.description language={Language.Current} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
