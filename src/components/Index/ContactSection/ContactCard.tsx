import { CopyButton } from "@/components/custom/CopyButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactItem } from "@/types/contact";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import "@/styles/contact-card.css";

export type ContactCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ContactItem;
  }
>;
export const ContactCard = ({ className, item, ...rest }: ContactCardProps) => {
  const Language = useLanguage();
  return (
    <div className={`contact-card ${className}`} {...rest}>
      <OutsideLink
        href={item.href}
        className="block p-[2px] rounded-full no-underline"
        style={{
          background: `linear-gradient(45deg, ${(item.backgrounds?.length
            ? item.backgrounds
            : ["var(--text-color-primary)", "var(--text-color-secondary)"]
          ).join(",")})`,
        }}
      >
        <span className="label text-2xl font-semibold">
          <item.icon />
          {item.label}
        </span>
      </OutsideLink>

      {/**Overlay 資訊卡 */}
      <div className="overlay">
        <div
          className="p-[2px] rounded-2xl"
          style={{
            background: `linear-gradient(45deg, ${(item.backgrounds?.length
              ? item.backgrounds
              : ["var(--text-color-primary)", "var(--text-color-secondary)"]
            ).join(",")})`,
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
            {item.info.about && (
              <div>{<item.info.about language={Language.Current} />}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
