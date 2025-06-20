import { ContactItem } from "@/types/contact";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import { HTMLMotionProps, motion } from "framer-motion";
export type ContactCardProps = OverrideProps<
  HTMLMotionProps<"div">,
  {
    item: ContactItem;
  }
>;
export const ContactCard = ({ item, ...rest }: ContactCardProps) => {
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
        target="_blank"
        href={item.href}
        rel="noopener noreferrer"
        className="content no-underline bg-[var(--background-color-dark)] transition-all duration-300 rounded-[inherit] flex items-center justify-center px-8 py-2 gap-2 group-hover:bg-transparent"
      >
        <item.icon />
        {item.label}
      </OutsideLink>
      <div
        className="absolute transition-all duration-300 
       left-1/2 -translate-x-1/2
       -top-16 group-hover:-top-25 
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
          <div className="bg-[var(--background-color-dark)] rounded-[inherit] p-4">
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-4"
              >
                <div className="h-10 aspect-square rounded-full">
                  {/*eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="bg-white w-full h-full object-cover rounded-full "
                    src={item.info.image || `/favicon.ico`}
                    alt={`${item.label}-${item.info.id}`}
                  />
                </div>
                <div className="flex flex-col gap-0 whitespace-nowrap">
                  <span className="note">{item.info.name}</span>
                  <span className="hint">{item.info.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
