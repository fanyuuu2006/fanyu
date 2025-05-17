import { motion, HTMLMotionProps } from "framer-motion";

export type CardProps = HTMLMotionProps<"div">;

export const Card = ({ className = "", children, ...rest }: CardProps) => {
  return (
    <motion.div
      className={`${className} bg-[var(--background-color)] border border-[var(--border-color)] rounded-lg shadow`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
