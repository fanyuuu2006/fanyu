import "@/styles/menu.css";
import { DistributiveOmit } from "fanyucomponents";

export type BurgerMenuProps = DistributiveOmit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;
export const BurgerMenu = ({ ...rest }: BurgerMenuProps) => {
  return (
    <label className="burger">
      <input type="checkbox" id={rest.id || "burger-menu-toggle"} {...rest} />
      <span />
      <span />
      <span />
    </label>
  );
};
