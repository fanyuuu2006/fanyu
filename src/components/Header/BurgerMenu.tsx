import { DistributiveOmit } from "fanyucomponents";
import styled from "styled-components";

export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: ${4 / 3}em;
  height: 1em;
  cursor: pointer;
`;

export const Span = styled.span`
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  height: 0.25rem;
  border-radius: 0.5rem;
  background-color: var(--text-color);
  transition: 0.3s ease-in-out;
  transform-origin: right center;

  &:nth-of-type(1) {
    top: 0;
  }
  &:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  &:nth-of-type(3) {
    top: 100%;
    transform: translateY(-100%);
  }
`;

export const Checkbox = styled.input`
  display: none;

  &:checked ~ ${Span}:nth-of-type(1) {
    transform: rotate(-45deg);
    right: ${1 / 6}em;
  }

  &:checked ~ ${Span}:nth-of-type(2) {
    opacity: 0;
    width: 0;
  }

  &:checked ~ ${Span}:nth-of-type(3) {
    transform: rotate(45deg);
    top: ${29 / 30}em;
    right: ${1 / 6}em;
  }
`;

export type BurgerMenuProps = DistributiveOmit<
  React.ComponentPropsWithRef<typeof Checkbox>,
  "type"
>;
export const BurgerMenu = Object.assign(
  ({ ...rest }: BurgerMenuProps) => {
    return (
      <Label>
        <Checkbox type="checkbox" {...rest} />
        <Span />
        <Span />
        <Span />
      </Label>
    );
  },
  {
    displayName: "BurgerMenu",
    Label,
    Checkbox,
    Span,
  }
);
