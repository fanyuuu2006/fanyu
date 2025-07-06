import { OverrideProps } from "fanyucomponents";
import React, { useMemo } from "react";
import "@/styles/carousel.css";

export type TrackProps = {
  duration?: number;
  groupCount?: number;
  direction?: "left" | "right" | "up" | "down";
};

export type GroupProps = {
  direction?: "left" | "right" | "up" | "down";
};

// 包裝器組件
const Wrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`carousel-wrapper ${className || ""}`} {...props} />
));
Wrapper.displayName = "Wrapper";

// 軌道組件
const Track = React.forwardRef<
  HTMLDivElement,
  TrackProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      duration = 15000,
      groupCount = 2,
      direction = "left",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const flexDirection = useMemo(() => {
      switch (direction) {
        case "left":
        case "right":
          return "row";
        case "up":
        case "down":
          return "column";
      }
    }, [direction]);

    return (
      <div
        ref={ref}
        className={`carousel-track carousel-track--${flexDirection} carousel-track--${direction} ${
          className || ""
        }`}
        style={
          {
            animationDuration: `${duration}ms`,
            "--transform-percent": `${100 / groupCount}%`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);
Track.displayName = "Track";

// 群組組件
const Group = React.forwardRef<
  HTMLDivElement,
  GroupProps & React.HTMLAttributes<HTMLDivElement>
>(({ direction = "left", className, ...props }, ref) => {
  const flexDirection = useMemo(() => {
    switch (direction) {
      case "left":
      case "right":
        return "row";
      case "up":
      case "down":
        return "column";
    }
  }, [direction]);

  return (
    <div
      ref={ref}
      className={`carousel-group carousel-group--${flexDirection} ${
        className || ""
      }`}
      {...props}
    />
  );
});
Group.displayName = "Group";

// 項目組件
const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`carousel-item ${className || ""}`} {...props} />
));
Item.displayName = "Item";

export type CarouselProps = OverrideProps<
  React.ComponentPropsWithRef<"div">,
  TrackProps & { children: React.ReactNode }
>;

export const Carousel = Object.assign(
  ({
    children,
    groupCount = 2,
    duration = 15000,
    direction = "left",
    ...rest
  }: CarouselProps) => {
    return (
      <Wrapper {...rest}>
        <Track
          duration={duration}
          groupCount={groupCount}
          direction={direction}
        >
          {[...Array(groupCount)].map((_, group) => (
            <Group key={group} direction={direction}>
              {React.Children.toArray(children).map((child, idx) => (
                <Item key={idx} aria-hidden={group ? "true" : undefined}>
                  {child}
                </Item>
              ))}
            </Group>
          ))}
        </Track>
      </Wrapper>
    );
  },
  {
    displayName: "Carousel",
    Wrapper,
    Track,
    Group,
    Item,
  }
);
