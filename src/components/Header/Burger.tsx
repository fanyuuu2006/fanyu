import "@/styles/burger.css";
import { DistributiveOmit } from "fanyucomponents";

export type BurgerProps = DistributiveOmit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;
export const Burger = ({ ...rest }: BurgerProps) => {
  return (
    <label className="burger">
      <input type="checkbox" id={rest.id || "burger-toggle"} {...rest} />
      <span />
      <span />
      <span />
    </label>
  );
};