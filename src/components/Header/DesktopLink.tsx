import { Route } from "@/types";
import { cn } from "@/utils/className";
import { DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DesktopLinkProps = OverrideProps<
  DistributiveOmit<React.ComponentProps<typeof Link>, "href" | "children">,
  {
    route: Route;
  }
>;

export const DesktopLink = ({
  route,
  className,
  ...rest
}: DesktopLinkProps) => {
  const pathName = usePathname();
  const isActive =
    route.isActive?.(pathName) ?? pathName.startsWith(route.url);
  const isSubActive = route.sub?.some((sub) => pathName === sub.url);

  return (
    <div className="group relative flex items-center justify-center">
      <Link
        href={route.url}
        className={cn(
          "text-nowrap font-semibold flex items-center justify-center gap-2 text-(--muted) transition-all duration-300 hover:text-(--foreground)",
          {
            "text-(--foreground) ": isActive || isSubActive,
          },
          className
        )}
        {...rest}
      >
        <span>{route.label}</span>
      </Link>
      {route.sub && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block w-max z-50">
          <div className="text-[0.8em] card secondary flex flex-col overflow-hidden p-1">
            {route.sub.map((subRoute) => {
              return (
                <Link
                  key={subRoute.url}
                  href={`${route.url}${subRoute.url}`}
                  className={cn(
                    "px-4 py-2 text-nowrap flex items-center justify-center gap-2 text-(--muted) hover:text-(--foreground) transition-all duration-300"
                  )}
                >
                  {subRoute.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};