import { CopyButton } from "@/components/custom/CopyButton";
import { useLanguage } from "@/context/LanguageContext";
import { ContactItem } from "@/types/contact";
import { ArrowRightOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import { HTMLMotionProps, motion } from "framer-motion";
export type ContactCardProps = OverrideProps<
  HTMLMotionProps<"div">,
  {
    item: ContactItem;
  }
>;
export const ContactCard = ({ item, ...rest }: ContactCardProps) => {
  const Language = useLanguage();
  return (
    <motion.div
      className="group relative p-[3px] rounded-2xl"
      style={{
        background: item.backgrounds?.length
          ? `linear-gradient(45deg, ${item.backgrounds.join(",")})`
          : "var(--text-color-primary)",
      }}
      {...rest}
    >
      <OutsideLink
        href={item.href}
        className="flex content no-underline bg-[var(--background-color-dark)] transition-all duration-300 rounded-[inherit] items-center justify-center px-4 py-2 gap-2 group-hover:bg-transparent"
      >
        <item.icon />
        {item.label}
      </OutsideLink>

      {/**Hover 資訊卡 */}
      <div
        className="absolute transition-all duration-300 
       left-1/2 -translate-x-1/2
       -top-24 group-hover:-top-32 
       opacity-0 group-hover:opacity-100
       invisible group-hover:visible
       z-1000
       "
      >
        <div
          className="p-[3px] rounded-2xl"
          style={{
            background: item.backgrounds?.length
              ? `linear-gradient(45deg, ${item.backgrounds.join(",")})`
              : "var(--text-color-primary)",
          }}
        >
          <div className="bg-[var(--background-color-dark)] rounded-[inherit] flex flex-col gap-2 p-4">
            <div className="flex items-center gap-4">
              {/**頭像 */}
              <div
                className="h-10 aspect-square rounded-full overflow-hidden"
                style={{
                  border: `2px solid ${
                    item.backgrounds?.[0] || "var(--text-color-primary)"
                  }`,
                }}
              >
                {/*eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="bg-white w-full h-full object-cover"
                  src={item.info.image || `/favicon.ico`}
                  alt={`${item.label}-${item.info.id}`}
                />
              </div>

              {/**名稱 & ID */}
              <div className="flex flex-col gap-0 whitespace-nowrap">
                <span className="note font-bold">{item.info.name}</span>
                <span className="hint flex items-center gap-1">
                  {item.info.id}
                  <CopyButton content={item.info.id} />
                </span>
              </div>
            </div>
            {/**相關資訊(?) */}
            <div className="flex">
              <OutsideLink className="ms-auto note flex gap-2" href={item.href}>
                {
                  {
                    chinese: "前往",
                    english: "Go to",
                  }[Language.Current]
                }
                <ArrowRightOutlined />
              </OutsideLink>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
