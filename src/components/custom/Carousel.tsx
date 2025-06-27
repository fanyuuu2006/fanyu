import { OverrideProps } from "fanyucomponents";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  mask-image: linear-gradient(to right, transparent, #000 5% 95%, transparent);
  overflow: hidden;
`;
Wrapper.displayName = "Wrapper";

const Track = styled.div`
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  animation: slide 20s linear infinite;

  @keyframes slide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
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

export type ItemProps = { width?: React.CSSProperties["width"] };
const Item = styled.div<ItemProps>`
  width: ${({ width }) => width || "10rem"};
  margin: 0.5rem;
  transition: all 0.3s ease-in-out;

  ${Track}:hover & {
    filter: grayscale(1);
  }

  &:hover {
    filter: grayscale(0) !important;
  }
`;

export type CarouselProps = OverrideProps<
  React.ComponentPropsWithRef<typeof Wrapper>,
  ItemProps & { children: React.ReactNode | React.ReactNode[] }
>;

export const Carousel = Object.assign(
  ({ children, width, ...rest }: CarouselProps) => {
    return (
      <Wrapper {...rest}>
        <Track>
          {[0, 1].map((group) => (
            <Group key={group}>
              {React.Children.toArray(children).map((child, idx) => (
                <Item
                  width={width}
                  key={idx}
                  aria-hidden={group ? "true" : undefined}
                >
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
