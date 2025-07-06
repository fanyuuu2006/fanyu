import { CopyButton } from "@/components/custom/CopyButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactItem } from "@/types/contact";
import { ArrowRightOutlined } from "@ant-design/icons";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;
const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  border-radius: inherit;
  text-decoration: none;
  background-color: var(--background-color);
  transition: all 0.3s ease, color 0.3s ease;
  ${Container}:hover & {
    background-color: transparent;
  }
`;
const Overlay = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  ${Container}:hover & {
    bottom: 100%;
    opacity: 1;
    visibility: visible;
  }
`;

export type ContactCardProps = OverrideProps<
  React.ComponentPropsWithRef<typeof Container>,
  {
    item: ContactItem;
  }
>;
export const ContactCard = ({ item, ...rest }: ContactCardProps) => {
  const Language = useLanguage();

  return (
    <Container {...rest}>
      <OutsideLink
        href={item.href}
        className="block p-[2px] rounded-full no-underline"
        style={{
          background: item.backgrounds?.length
            ? `linear-gradient(45deg, ${item.backgrounds.join(",")})`
            : `linear-gradient(45deg,var(--text-color-primary),var(--text-color-secondary))`,
        }}
      >
        <Span className="text-2xl font-semibold">
          <item.icon />
          {item.label}
        </Span>
      </OutsideLink>

      {/**Overlay 資訊卡 */}
      <Overlay>
        <div
          className="p-[2px] rounded-2xl"
          style={{
            background: item.backgrounds?.length
              ? `linear-gradient(45deg, ${item.backgrounds.join(",")})`
              : `linear-gradient(45deg,var(--text-color-primary),var(--text-color-secondary))`,
          }}
        >
          <div className="bg-[var(--background-color)] rounded-[inherit] flex flex-col gap-2 p-4">
            <div className="flex items-center gap-4">
              {/**頭像 */}
              <div
                className="h-10 aspect-square rounded-xl overflow-hidden"
                style={{
                  border: `2px solid ${
                    item.backgrounds?.[0] || "var(--text-color-primary)"
                  }`,
                }}
              >
                {/*eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  src={item.info.image || `/favicon.ico`}
                  alt={`${item.label}-${item.info.id}`}
                  style={{
                    backgroundColor:
                      item.backgrounds?.[0] || "var(--text-color-primary)",
                  }}
                />
              </div>

              {/**名稱 & ID */}
              <div className="flex flex-col gap-0 whitespace-nowrap">
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: item.backgrounds?.[0] || "var(--text-color-primary)",
                  }}
                >
                  {item.info.name}
                </span>
                <span className="text-lg flex items-center gap-1">
                  {item.info.id}
                  <CopyButton content={item.info.id} />
                </span>
              </div>
            </div>
            {/**相關資訊(待定) */}
            {item.info.about && <div>{<item.info.about />}</div>}
            <div className="flex">
              <OutsideLink
                className="ms-auto text-2xl flex gap-2"
                href={item.href}
              >
                {
                  {
                    chinese: "前往",
                    english: "Go to",
                  }[Language.Current]
                }
                <ArrowRightOutlined />
              </OutsideLink>
            </div>
          </div>
        </div>
      </Overlay>
    </Container>
  );
};
