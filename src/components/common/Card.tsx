import { motion, HTMLMotionProps } from "framer-motion";

export type CardProps = HTMLMotionProps<"div">;

export const Card = ({ className = "", children, ...rest }: CardProps) => {
  return (
    <motion.div
      className={`${className} bg-[var(--background-color-dark)] rounded-lg`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
