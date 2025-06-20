import { ContactItem } from "@/types/contact";
import { OutsideLink } from "fanyucomponents";
import { motion } from "framer-motion";

export const ContactCard: React.FC<{
  item: ContactItem;
}> = ({ item }) => {
  return (
    <motion.div
      className="p-[3px] rounded-2xl"
      style={{
        background: `linear-gradient(45deg, ${
          item.backgrounds?.join(",") || "var(--text-color-primary)"
        })`,
      }}
    >
      <OutsideLink
        draggable={true}
        target="_blank"
        href={item.href}
        rel="noopener noreferrer"
        className="content w-full bg-[var(--background-color-dark)] transition-all duration-300 rounded-[inherit]  flex items-center justify-center px-8 py-2 gap-2 hover:bg-transparent"
      >
        {item.icon}
      </OutsideLink>
    </motion.div>
  );
};
