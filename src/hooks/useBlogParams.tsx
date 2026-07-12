import { useCallback, useMemo } from "react";
import { useUrlParams } from "./useUrlParams";

export type SortOrder = "newest" | "oldest";

const PARAM = {
  query: "query",
  sort: "sort",
  page: "page",
} as const;

type ParamsPatch = Partial<{
  query: string;
  sort: SortOrder;
  page: number;
}>;

const DEFAULT = {
  query: "",
  sort: "newest" as SortOrder,
  page: 1,
};

export const PAGE_SIZE = 8;

/** 会影响筛选/排序结果的欄位；变更時應重置分頁 */
const FILTER_KEYS: (keyof ParamsPatch)[] = ["query", "sort"];

const parsePage = (raw: string | null): number => {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT.page;
};

export const useBlogParams = () => {
  const { searchParams, updateParams } = useUrlParams();

  const query = searchParams.get(PARAM.query) ?? DEFAULT.query;

  const sort: SortOrder =
    searchParams.get(PARAM.sort) === "oldest" ? "oldest" : DEFAULT.sort;

  const page = parsePage(searchParams.get(PARAM.page));

  // ---- 寫入工具 ----
  const push = useCallback(
    (patch: ParamsPatch) => {
      updateParams((next) => {
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

        // 若沒有明確指定新的 page，則自動回到第 1 頁
        const changedFilters = FILTER_KEYS.some((key) => key in patch);
        const explicitPage = "page" in patch ? patch.page! : undefined;
        const nextPage = explicitPage ?? (changedFilters ? DEFAULT.page : page);

        if (nextPage === DEFAULT.page) {
          next.delete(PARAM.page);
        } else {
          next.set(PARAM.page, `${nextPage}`);
        }
      });
    },
    [updateParams, page],
  );

  // ---- 操作 ----
  const setQuery = useCallback((q: string) => push({ query: q }), [push]);

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

  const params = useMemo(() => ({ query, sort, page }), [query, sort, page]);

  return {
    // 狀態
    params,
    // 操作
    setQuery,
    setSort,
    toggleSort,
    setPage,
  };
};
