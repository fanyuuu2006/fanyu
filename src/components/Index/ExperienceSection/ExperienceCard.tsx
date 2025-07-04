import { CustomLink } from "@/components/custom/CustomLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { slugify } from "@/utils/url";
import { ClockCircleOutlined } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";

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
  className = "",
  ...rest
}: ExperienceCardProps) => {
  const Language = useLanguage();

  return (
    <div
      className={`${className} card w-full p-6 gap-4 flex flex-col`}
      {...rest}
    >
      <div className="h-20 w-20 md:h-28 md:w-28 rounded-3xl overflow-hidden border-2 border-[var(--border-color)]">
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
      <div className="flex flex-col gap-1 w-full">
        <span className="text-3xl md:text-4xl font-bold">
          {item.name[Language.Current]}
        </span>
        {item.organization && (
          <span className="text-xl md:text-2xl font-bold text-[var(--text-color-muted)]">
            {item.organization.name[Language.Current]}
          </span>
        )}
        {item.department && (
          <span className="text-xl md:text-2xl font-bold text-[var(--text-color-muted)]">
            {item.department[Language.Current]}
          </span>
        )}
        <div className="flex flex-col gap-2">
          <span className="flex gap-2 text-base md:text-lg text-[var(--text-color-muted)]">
            <ClockCircleOutlined />
            {`${
              item.duration.start ??
              { chinese: "無紀錄", english: "No Record" }[Language.Current]
            } ~ ${
              item.duration.end ??
              { chinese: "至今", english: "Present" }[Language.Current]
            }`}
          </span>
          {item.links && (
            <div className="flex gap-1 flex-wrap">
              {item.links.map((link) => (
                <CustomLink
                  key={link.href}
                  href={link.href}
                  className="max-w-full btn-primary text-sm md:text-base flex gap-2 px-2 py-1 rounded-full items-center"
                >
                  {link.icon}
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {link[Language.Current]}
                  </span>
                </CustomLink>
              ))}
            </div>
          )}
        </div>
        {item.role && (
          <div>
            <span className="text-xl md:text-2xl">
              {item.role[Language.Current]}
            </span>
          </div>
        )}
        {item.description && (
          <div>
            <item.description language={Language.Current} />
          </div>
        )}
      </div>
    </div>
  );
};
