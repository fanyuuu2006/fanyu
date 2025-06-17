import { ContactItem } from "@/types/contact";
import { Tooltip } from "antd";
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
    <Tooltip title={item.label}>
      <motion.div {...rest}>
        <OutsideLink
          draggable={true}
          target="_blank"
          href={item.href}
          rel="noopener noreferrer"
          className="card w-full note flex items-center px-4 py-2 gap-2"
        >
          {item.icon}
          <span>{item.id}</span>
        </OutsideLink>
      </motion.div>
    </Tooltip>
  );
};
