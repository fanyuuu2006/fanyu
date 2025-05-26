import { OverrideProps } from "fanyucomponents";
import { HTMLMotionProps, motion } from "framer-motion";

export type TimeUnitProps = OverrideProps<
  HTMLMotionProps<"div">,
  { value: number; maxLength: number; label: string }
>;

export const TimeUnit = ({
  value,
  maxLength,
  className,
  label,
  ...rest
}: TimeUnitProps) => (
  <motion.div
    className={`${className ?? "flex flex-col items-center"} `}
    {...rest}
  >
    <span style={{ fontSize: "0.5em" }}>{label}</span>
    <span className="font-bold bg-[var(--background-color-dark)] p-2 rounded-lg">
      {value.toString().padStart(maxLength, "0")}
    </span>
  </motion.div>
);
