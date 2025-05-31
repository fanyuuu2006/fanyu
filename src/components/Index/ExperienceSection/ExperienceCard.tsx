import { useLanguage } from "@/context/LanguageContext";
import { ExperienceItem } from "@/types/experience";
import { ClockCircleOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import { motion, HTMLMotionProps } from "framer-motion";

export type ExperienceCardProps = OverrideProps<
  HTMLMotionProps<"div">,
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
    <motion.div
      className={`${className} card w-full p-4 gap-4 flex flex-wrap items-center md:flex-nowrap`}
      {...rest}
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={
          item.imageSrc ??
          `https://s2.googleusercontent.com/s2/favicons?domain_url=${item.links?.[0].href}`
        }
        alt={item.name.english}
        className="h-30 w-30 object-cover bg-[#fff] rounded-full border border-[var(--border-color)]"
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
                  className="w-fit flex gap-2 items-center"
                >
                  {link.icon}
                  {link[Language.Current]}
                </OutsideLink>
              ))}
            </div>
          )}
        </div>
        {item.role && <span>{item.role[Language.Current]}</span>}
        {item.description && (
          <div>
            <item.description language={Language.Current} />
          </div>
        )}
      </div>
    </motion.div>
  );
};
