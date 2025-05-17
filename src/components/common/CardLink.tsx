import { Card, CardProps } from "./Card";

export type CardLinkProps = CardProps;;

export const CardLink = ({
  className = "",
  children,
  ...rest
}: CardLinkProps) => {
  return (
    <Card
      className={`${className} no-underline hover:scale-105 hover:shadow-xl transition-[scale] duration-200 ease-in-out`}
      {...rest}
    >
      {children}
    </Card>
  );
};
