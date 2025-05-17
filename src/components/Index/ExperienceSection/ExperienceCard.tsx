import { useLanguage } from "@/context/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { ClockCircleOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import Image from "next/image";
import { fadeInItem } from "@/lib/motion";
import { Card, CardProps } from "@/components/common/Card";

export type ExperienceCardProps = OverrideProps<
  CardProps,
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
    <Card
      variants={fadeInItem}
      initial="hiddenLeft"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`${className} bordered w-full p-4 gap-4 flex flex-wrap items-center md:flex-nowrap`}
      {...rest}
    >
      <Image
        src={item.imageSrc}
        alt={item.name.english}
        className="h-30 w-30 object-cover bg-[#fff] rounded-full bordered"
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
              {item.links.map((link) => (
                <OutsideLink
                  key={link.href}
                  href={link.href}
                  className="w-fit flex gap-2"
                >
                  {link.icon}
                  {link[Language.Current]}
                </OutsideLink>
              ))}
            </div>
          )}
        </div>
        {item.role && <span>{item.role[Language.Current]}</span>}
      </div>
    </Card>
  );
};
