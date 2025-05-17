import { motion, HTMLMotionProps } from "framer-motion";

export type CardLinkProps = HTMLMotionProps<"div">;

export const CardLink = ({
  className = "",
  children,
  ...rest
}: CardLinkProps) => {
  return (
    <motion.div
      className={`${className} no-underline bg-[var(--background-color-dark)] rounded-lg hover:scale-105 transition-[scale] duration-200 ease-in-out`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
