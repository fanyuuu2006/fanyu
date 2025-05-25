import { OverrideProps } from "fanyucomponents";
import { HTMLMotionProps, motion } from "framer-motion";

export type TimeUnitProps = OverrideProps<
  HTMLMotionProps<"span">,
  { value: number; maxLength: number }
>;

export const TimeUnit = ({
  value,
  maxLength,
  className,
  ...rest
}: TimeUnitProps) => (
  <motion.span
    key={value}
    className={`${
      className ?? ""
    } bg-[var(--background-color-dark)] p-2 rounded-lg`}
    {...rest}
  >
    {value.toString().padStart(maxLength, "0")}
  </motion.span>
);
