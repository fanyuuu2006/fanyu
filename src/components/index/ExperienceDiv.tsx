import { ClockCircleOutlined } from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";
import { MyImage } from "../MyImage";
import { useMemo } from "react";

type ExperienceDivProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
  order?: "asc" | "desc";
  items: {
    title: string;
    subtitle?: string;
    imgSrc?: string;
    period: string;
    link?: string;
    points: React.ReactNode[];
    description?: React.ElementType;
  }[];
  children?: never;
};

export const ExperienceDiv = ({
  title,
  items,
  order = "desc",
  ...rest
}: ExperienceDivProps) => {
  const orderedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aStart = a.period.split(" - ")[0];
      const bStart = b.period.split(" - ")[0];
      if (order === "asc") {
        return aStart.localeCompare(bStart);
      }
      return bStart.localeCompare(aStart);
    });
  }, [items, order]);

  return (
    <div {...rest}>
      <h3 className="flex items-center gap-2 text-2xl font-semibold text-(--foreground) mb-8">
        <span className="size-2 shrink-0 rounded-full bg-(--primary) transition-transform" />
        {title}
      </h3>
      <div className="divide-y divide-white/25">
        {orderedItems.map((item) => {
          return (
            <article
              key={`${item.title}-${item.subtitle}-${item.period}`}
              className="py-7 first:pt-0 last:pb-0"
            >
              <div key={item.title} className="flex items-start gap-4">
                <div className="shrink-0 size-12 rounded-lg overflow-hidden bg-(--foreground)">
                  <MyImage
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-(--foreground)">
                        {item.link ? (
                          <OutsideLink
                            href={item.link}
                            className="hover:text-(--primary) transition-all duration-300"
                          >
                            {item.title}
                          </OutsideLink>
                        ) : (
                          item.title
                        )}
                      </h4>
                      <p className="text-sm text-(--muted) font-mono flex items-center gap-1">
                        <ClockCircleOutlined />
                        <span>{item.period}</span>
                      </p>
                    </div>
                    {item.subtitle && (
                      <p className="text-(--muted) text-sm">{item.subtitle}</p>
                    )}
                    {item.points.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {item.points.map((point, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="size-1.5 shrink-0 rounded-full bg-(--primary)" />
                            <span className="text-sm text-(--muted)">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.description && <item.description />}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
