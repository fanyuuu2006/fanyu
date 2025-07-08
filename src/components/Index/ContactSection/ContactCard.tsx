import { CopyButton } from "@/components/custom/CopyButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactItem } from "@/types/contact";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import { cn } from "@/utils/className";

export type ContactCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ContactItem;
  }
>;
export const ContactCard = ({ className, item, ...rest }: ContactCardProps) => {
  const Language = useLanguage();
  const {
    src: imageSrc,
    style: imageStyle,
    className: imageClassName,
    ...restImageProps
  } = item.info.image || {};

  const gradientStyle: React.CSSProperties = {
    background: `linear-gradient(45deg, ${(item.backgrounds?.length
      ? item.backgrounds
      : ["var(--text-color-primary)", "var(--text-color-secondary)"]
    ).join(",")})`,
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(1rem)",
    WebkitBackdropFilter: "blur(1rem)", // Safari 支援
    willChange: "background-color, backdrop-filter",
  };

  return (
    <div className={cn(`overlay-wrapper group`, className)} {...rest}>
      <OutsideLink
        draggable={true}
        href={item.href}
        className="block p-[2px] rounded-full no-underline "
        style={gradientStyle}
      >
        <span className="text-xl md:text-2xl font-semibold flex items-center justify-center px-4 py-2 gap-2 rounded-[inherit] no-underline bg-[var(--background-color)] transition-all duration-300 group-hover:bg-transparent">
          <item.icon />
          {item.label}
        </span>
      </OutsideLink>

      {/** 資訊卡 */}
      <div className="overlay-content">
        <div className="p-[2px] rounded-2xl" style={gradientStyle}>
          <div className="bg-[var(--background-color)] rounded-[inherit] flex flex-col gap-2 p-4">
            <div className="flex items-center gap-4">
              {/**頭像 */}
              <div
                className="h-12 aspect-square rounded-xl overflow-hidden"
                style={{
                  border: `2px solid ${
                    item.backgrounds?.[0] || "var(--text-color-primary)"
                  }`,
                }}
              >
                {/*eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={`w-full h-full object-cover ${
                    imageClassName || ""
                  }`}
                  src={imageSrc || `/GameShow.jpg`}
                  alt={`${item.label}-${item.info.id}`}
                  style={{
                    backgroundColor:
                      item.backgrounds?.[0] || "var(--text-color-primary)",
                    ...imageStyle,
                  }}
                  {...restImageProps}
                />
              </div>

              {/**名稱 & ID */}
              <div className="flex flex-col whitespace-nowrap leading-tight">
                <h5
                  className="text-lg md:text-xl font-bold"
                  style={{
                    color: item.backgrounds?.[0] || "var(--text-color-primary)",
                  }}
                >
                  {item.info.name}
                </h5>
                <div>
                  <CopyButton
                    content={item.info.id}
                    className="text-sm md:text-base text-[var(--text-color-muted)]"
                  >
                    <h6>{item.info.id}</h6>
                  </CopyButton>
                </div>
              </div>
            </div>
            {/**相關資訊(待定) */}
            {item.info.about && (
              <div>{<item.info.about language={Language.Current} />}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
