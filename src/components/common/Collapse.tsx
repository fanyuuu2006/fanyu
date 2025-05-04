import { useRef } from "react";

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  state: boolean;
}

export const Collapse = ({
  state: show,
  className,
  style,
  children,
  ...rest
}: CollapseProps) => {
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={innerRef}
      className={`overflow-hidden ${className ?? ""}`}
      style={{
        maxHeight: show ? `${innerRef.current?.scrollHeight ?? 0}px` : "0px",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

Collapse.displayName = "Collapse";
