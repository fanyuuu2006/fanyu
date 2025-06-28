import { CopyButton } from "@/components/custom/CopyButton";
import { useLanguage } from "@/context/LanguageContext";
import { ContactItem } from "@/types/contact";
import { ArrowRightOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import { HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export type ContactCardProps = OverrideProps<
  HTMLMotionProps<"div">,
  {
    item: ContactItem;
  }
>;
export const ContactCard = ({ item, ...rest }: ContactCardProps) => {
  const Language = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.div
      ref={ref}
      className="group relative p-[2px] rounded-2xl"
      style={{
        background: item.backgrounds?.length
          ? `linear-gradient(45deg, ${item.backgrounds.join(",")})`
          : "var(--text-color-primary)",
      }}
      {...rest}
    >
      <button
        className="flex text-2xl no-underline  transition-all duration-300 rounded-[inherit] items-center justify-center px-4 py-2 gap-2"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          background: isOpen ? "transparent" : "var(--background-color-dark)",
        }}
      >
        <item.icon />
        {item.label}
      </button>

      {/**資訊卡 */}
      <div
        className="absolute transition-all duration-300 
       left-1/2 -translate-x-1/2
       z-1000
       "
        style={{
          top: isOpen ? "-8rem" : "-6rem",
          opacity: isOpen ? "1" : "0",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div
          className="p-[2px] rounded-2xl"
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
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: item.backgrounds?.[0] || "var(--text-color-primary)",
                  }}
                >
                  {item.info.name}
                </span>
                <span className="text-lg flex items-center gap-1">
                  {item.info.id}
                  <CopyButton content={item.info.id} />
                </span>
              </div>
            </div>
            {/**相關資訊(?) */}
            <div className="flex">
              <OutsideLink className="ms-auto text-2xl flex gap-2" href={item.href}>
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
