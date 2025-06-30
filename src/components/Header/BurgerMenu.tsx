import "@/styles/menu.css";
import { DistributiveOmit } from "fanyucomponents";

export type BurgerMenuProps = DistributiveOmit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;
export const BurgerMenu = ({ ...rest }: BurgerMenuProps) => {
  return (
    <label className="burger">
      <input type="checkbox" {...rest} />
      <span />
      <span />
      <span />
    </label>
  );
};
