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
      className="flex items-center justify-center p-[3px] rounded-2xl"
      style={{
        background: `linear-gradient(45deg, ${
          item.backgrounds?.join(",") || "var(--text-color-primary)"
        })`,
      }}
      {...rest}
    >
      <OutsideLink
        draggable={true}
        target="_blank"
        href={item.href}
        rel="noopener noreferrer"
        className="content w-full bg-[var(--background-color-dark)] transition-all duration-300 rounded-[inherit] flex items-center justify-center px-8 py-2 gap-2 hover:bg-transparent"
      >
        <item.icon />
      </OutsideLink>
    </motion.div>
  );
};
