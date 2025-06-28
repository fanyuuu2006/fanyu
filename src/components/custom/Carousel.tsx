import { OverrideProps } from "fanyucomponents";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  mask-image: linear-gradient(to right, transparent, #000 5% 95%, transparent);
  overflow: hidden;
`;
Wrapper.displayName = "Wrapper";

export type TrackProps = {
  duration?: number;
  groupCount?: number;
  direction?: "left" | "right" | "up" | "down";
};
const Track = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["groupCount", "direction", "duration"].includes(prop),
})<TrackProps>`
  width: max-content;
  display: flex;
  flex-direction: ${({ direction }) => {
    switch (direction) {
      case "left":
      case "right":
        return "row";
      case "up":
      case "down":
        return "column";
    }
  }};
  flex-wrap: nowrap;
  animation: slide ${({ duration }) => `${duration ?? 15000}ms`} linear infinite;

  @keyframes slide {
    0% {
      transform: ${({ direction, groupCount }) => {
        const percent = 100 / (groupCount || 2);
        switch (direction) {
          case "left":
            return "translateX(0%)";
          case "right":
            return `translateX(-${percent}%)`;
          case "up":
            return "translateY(0%)";
          case "down":
            return `translateY(-${percent}%)`;
        }
      }};
    }
    100% {
      transform: ${({ direction, groupCount }) => {
        const percent = 100 / (groupCount || 2);
        switch (direction) {
          case "left":
            return `translateX(-${percent}%)`;
          case "right":
            return "translateX(0%)";
          case "up":
            return `translateY(-${percent}%)`;
          case "down":
            return "translateY(0%)";
        }
      }};
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;
Track.displayName = "Track";

export type GroupProps = {
  direction?: "left" | "right" | "up" | "down";
};
const Group = styled.div.withConfig({
  shouldForwardProp: (prop) => !["direction"].includes(prop),
})<GroupProps>`
  display: flex;
  flex-direction: ${({ direction }) => {
    switch (direction) {
      case "left":
      case "right":
        return "row";
      case "up":
      case "down":
        return "column";
    }
  }};
  flex-wrap: nowrap;
`;
Group.displayName = "Group";

const Item = styled.div`
  transition: all 0.3s ease-in-out;

  ${Track}:hover & {
    filter: grayscale(1);
  }

  &:hover {
    filter: grayscale(0) !important;
  }
`;
Item.displayName = "Item";

export type CarouselProps = OverrideProps<
  React.ComponentPropsWithRef<typeof Wrapper>,
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
