import { Route } from "@/types";
import { cn } from "@/utils/className";
import { connectSubHref } from "@/utils/url";
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
  console.log(pathName)

  const isActive =
    route.isActive?.(pathName) ??
    (pathName === route.url || pathName.startsWith(`${route.url}/`));

  return (
    <div className="group relative flex items-center justify-center">
      <Link
        href={route.url}
        className={cn(
          "text-nowrap font-semibold flex items-center justify-center gap-2 transition-all duration-300",
          {
            "text-(--primary)": isActive,
            "text-(--muted) hover:text-(--foreground)": !isActive,
          },
          className,
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
                  href={connectSubHref(route.url, subRoute.url)}
                  className={cn(
                    "text-(--muted) hover:text-(--foreground) px-4 py-2 text-nowrap flex items-center justify-center gap-2 transition-all duration-300",
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
