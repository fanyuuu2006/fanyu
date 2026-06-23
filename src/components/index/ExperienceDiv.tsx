import { ClockCircleOutlined } from "@ant-design/icons";
import { OutsideLink } from "fanyucomponents";
import { MyImage } from "../MyImage";
import { useMemo, useState } from "react";
import { ExperienceItem } from "@/types/experience";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/utils/className";

const getStartDate = (duration: ExperienceItem["duration"]) => {
  return typeof duration === "string" ? duration : duration.start;
};
const getPeriod = (duration: ExperienceItem["duration"]) => {
  if (typeof duration === "string") {
    return duration;
  }
  const { start, end } = duration;
  return `${start} - ${end || "至今"}`;
};
type ExperienceDivProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
  order?: "asc" | "desc";
  maxVisible?: number;
  items: ExperienceItem[];
  children?: never;
};

export const ExperienceDiv = ({
  title,
  items,
  order = "desc",
  maxVisible = Infinity,
  ...rest
}: ExperienceDivProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const orderedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aStart = getStartDate(a.duration);
      const bStart = getStartDate(b.duration);

      if (order === "asc") {
        return aStart.localeCompare(bStart);
      }
      return bStart.localeCompare(aStart);
    });
  }, [items, order]);

  const displayItems = useMemo(
    () => (expanded ? orderedItems : orderedItems.slice(0, maxVisible)),
    [expanded, orderedItems, maxVisible],
  );

  return (
    <div {...rest}>
      <h3 className="flex items-center gap-2 text-2xl font-semibold text-(--foreground) mb-8">
        <span className="size-2 shrink-0 rounded-full bg-(--primary) transition-transform" />
        {title}
        <div className="h-px w-12 rounded-full bg-linear-to-r from-(--secondary) to-transparent" />
      </h3>
      <div className="divide-y divide-white/25">
        {displayItems.map((item, i) => {
          return (
            <article
              key={`${item.title}-${i}`}
              className="py-7 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 size-10 md:size-12 lg:size-14 rounded-lg overflow-hidden bg-(--foreground)">
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
                        <span>{getPeriod(item.duration)}</span>
                      </p>
                    </div>
                    {item.subtitle && (
                      <p className="text-(--muted) text-sm">{item.subtitle}</p>
                    )}
                    {item.description && (
                      <div className="text-(--muted) text-sm mt-1">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            li: ({ children, className, ...rest }) => (
                              <li
                                className={cn(
                                  "flex gap-2 items-start",
                                  className,
                                )}
                                {...rest}
                              >
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-(--primary)" />
                                <span>{children}</span>
                              </li>
                            ),
                            a: ({ href, children, className, ...rest }) => (
                              <OutsideLink
                                href={href}
                                className={cn(
                                  "font-bold hover:underline transition-all duration-300",
                                  className,
                                )}
                                {...rest}
                              >
                                {children}
                              </OutsideLink>
                            ),
                          }}
                        >
                          {item.description}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {orderedItems.length > maxVisible && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="btn rounded-full px-4 py-2 text-sm"
          >
            {expanded
              ? "顯示較少"
              : `查看更多 (${orderedItems.length - maxVisible})`}
          </button>
        </div>
      )}
    </div>
  );
};
