import { useLanguage } from "@/context/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { slugify } from "@/utils/url";
import { ClockCircleOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import Link from "next/link";

export type ExperienceCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ExperienceItem;
  }
>;

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
          item.imageSrc ??
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
        <span className="content font-bold">{item.name[Language.Current]}</span>
        {item.organization && (
          <span className="note font-bold opacity-75">
            {item.organization.name[Language.Current]}
          </span>
        )}
        {item.department && (
          <span className="note font-bold opacity-75">
            {item.department[Language.Current]}
          </span>
        )}
        <div className="flex flex-col hint opacity-75 ">
          <span className="flex gap-2">
            <ClockCircleOutlined />
            {`${item.duration.start ?? ""} ~ ${item.duration.end ?? ""}`}
          </span>
          {item.links && (
            <div className="flex flex-wrap gap-x-2">
              {item.links.map((link) => {
                // 判斷是否為外部連結
                const Tag = !link.href.startsWith("http") ? Link : OutsideLink;
                return (
                  <Tag
                    key={link.href}
                    href={link.href}
                    className="w-fit flex gap-2 items-center"
                  >
                    {link.icon}
                    {link[Language.Current]}
                  </Tag>
                );
              })}
            </div>
          )}
        </div>
        {item.role && (
          <span className="note">{item.role[Language.Current]}</span>
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
