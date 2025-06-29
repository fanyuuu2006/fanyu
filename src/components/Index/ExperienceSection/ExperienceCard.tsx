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
      className={`${className} card w-full p-4 gap-4 flex flex-wrap items-center md:flex-nowrap`}
      {...rest}
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={
          item.imageSrc ||
          `https://s2.googleusercontent.com/s2/favicons?domain_url=${slugify(
            item.links?.[0].href ?? ""
          )}`
        }
        alt={item.name.english}
        className="h-30 w-30 object-cover bg-[#fff] rounded-full border-2 border-[var(--border-color)]"
        width={600}
        height={600}
      />
      <div className="flex flex-col gap-1 w-full">
        <span className="text-4xl font-bold">
          {item.name[Language.Current]}
        </span>
        {item.organization && (
          <span className="text-3xl font-bold opacity-75">
            {item.organization.name[Language.Current]}
          </span>
        )}
        {item.department && (
          <span className="text-3xl font-bold opacity-75">
            {item.department[Language.Current]}
          </span>
        )}
        <div className="flex flex-col text-lg opacity-75 ">
          <span className="flex gap-2">
            <ClockCircleOutlined />
            {`${item.duration.start ?? ""} ~ ${item.duration.end ?? ""}`}
          </span>
          {item.links && (
            <div className="flex gap-x-2 flex-wrap">
              {item.links.map((link) => (
                <CustomLink
                  key={link.href}
                  href={link.href}
                  className="w-fit flex gap-2 items-center"
                >
                  {link.icon}
                  {link[Language.Current]}
                </CustomLink>
              ))}
            </div>
          )}
        </div>
        {item.role && (
          <div>
            <span className="text-2xl">
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
