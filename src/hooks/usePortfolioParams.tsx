import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type SortOrder = "newest" | "oldest";

const PARAM = {
  tags: "tags",
  query: "query",
  sort: "sort",
} as const;

const DEFAULT: {
  tags: string[];
  query: string;
  sort: SortOrder;
} = {
  tags: [],
  query: "",
  sort: "newest",
};

export const usePortfolioParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ---- 讀取 ----
  const tags = useMemo(
    () =>
      new Set(
        searchParams
          .getAll(PARAM.tags)
          .flatMap((t) => t.split(","))
          .filter(Boolean),
      ),
    [searchParams],
  );

  const query = searchParams.get(PARAM.query) ?? DEFAULT.query;

  const sort: SortOrder =
    searchParams.get(PARAM.sort) === "oldest" ? "oldest" : DEFAULT.sort;

  // ---- 寫入工具 ----
  const push = useCallback(
    (patch: Partial<{ tags: Set<string>; query: string; sort: SortOrder }>) => {
      const next = new URLSearchParams(searchParams);

      if ("tags" in patch) {
        if (patch.tags!.size > 0) {
          next.set(PARAM.tags, Array.from(patch.tags!).join(","));
        } else {
          next.delete(PARAM.tags);
        }
      }

      if ("query" in patch) {
        const q = patch.query!.trim();
        if (q) {
          next.set(PARAM.query, q);
        } else {
          next.delete(PARAM.query);
        }
      }

      if ("sort" in patch) {
        if (patch.sort === DEFAULT.sort) {
          next.delete(PARAM.sort);
        } else {
          next.set(PARAM.sort, patch.sort!);
        }
      }
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );
  // ---- 操作 ----
  const setQuery = useCallback((q: string) => push({ query: q }), [push]);

  const toggleTag = useCallback(
    (tag: string) => {
      const next = new Set(tags);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      push({ tags: next });
    },
    [tags, push],
  );

  const clearTags = useCallback(() => push({ tags: new Set() }), [push]);

  const toggleSort = useCallback(
    () => push({ sort: sort === "newest" ? "oldest" : "newest" }),
    [sort, push],
  );

  return {
    // 狀態
    params: { tags, query, sort },
    // 操作
    setQuery,
    toggleTag,
    clearTags,
    toggleSort,
  };
};
