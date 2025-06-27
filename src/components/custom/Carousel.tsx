import { OverrideProps } from "fanyucomponents";
import React from "react";
import styled, { IStyledComponent } from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  mask-image: linear-gradient(to right, transparent, #000 5% 95%, transparent);
  overflow: hidden;
`;
Wrapper.displayName = "Wrapper";

export type TrackProps = {
  duration?: number;
  groupCount?: number;
};
const Track = styled.div<TrackProps>`
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  animation: slide ${({ duration }) => `${duration ?? 15000}ms`} linear infinite;

  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(
        -${({ groupCount }) => `${100 / (groupCount || 2)}%`}
      );
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;
Track.displayName = "Track";

const Group = styled.div`
  display: flex;
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
  ({ children, groupCount = 2, duration = 15000, ...rest }: CarouselProps) => {
    return (
      <Wrapper {...rest}>
        <Track duration={duration} groupCount={groupCount}>
          {[...Array(groupCount)].map((_, group) => (
            <Group key={group}>
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

export type a = IStyledComponent<"native">;
