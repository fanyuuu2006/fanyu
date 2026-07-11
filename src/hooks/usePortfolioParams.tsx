import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type SortOrder = "newest" | "oldest";

const PARAM = {
  tags: "tags",
  query: "query",
  sort: "sort",
  page: "page",
} as const;
type ParamsPatch = Partial<{
  tags: Set<string>;
  query: string;
  sort: SortOrder;
  page: number;
}>;

const DEFAULT = {
  tags: [] as string[],
  query: "",
  sort: "newest" as SortOrder,
  page: 1,
};

export const PAGE_SIZE = 8;

/** 会影响筛选/排序结果的欄位；变更時應重置分頁 */
const FILTER_KEYS: (keyof ParamsPatch)[] = ["tags", "query", "sort"];

const parsePage = (raw: string | null): number => {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT.page;
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

  const page = parsePage(searchParams.get(PARAM.page));

  // ---- 寫入工具 ----
  const push = useCallback(
    (patch: ParamsPatch) => {
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

      // 筛选条件变更时，若沒有明確指定新的 page，則自動回到第 1 頁
      const changedFilters = FILTER_KEYS.some((key) => key in patch);
      const explicitPage = "page" in patch ? patch.page! : undefined;
      const nextPage = explicitPage ?? (changedFilters ? DEFAULT.page : page);

      if (nextPage === DEFAULT.page) {
        next.delete(PARAM.page);
      } else {
        next.set(PARAM.page, `${nextPage}`);
      }

      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, page],
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

  const setSort = useCallback(
    (next: SortOrder) => push({ sort: next }),
    [push],
  );

  const toggleSort = useCallback(
    () => setSort(sort === "newest" ? "oldest" : "newest"),
    [sort, setSort],
  );

  const setPage = useCallback(
    (p: number) => push({ page: Math.max(1, Math.trunc(p)) }),
    [push],
  );

  const params = useMemo(
    () => ({ tags, query, sort, page }),
    [tags, query, sort, page],
  );

  return {
    // 狀態
    params,
    // 操作
    setQuery,
    toggleTag,
    clearTags,
    setSort,
    toggleSort,
    setPage,
  };
};
