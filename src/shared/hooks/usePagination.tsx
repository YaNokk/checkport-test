import { useCallback } from "react";

import { usePaginationState } from "@/shared/hooks/usePaginationState.tsx";

export function usePagination(
  state: ReturnType<typeof usePaginationState>,
  maxPage: number = 1,
) {
  const { page, limit, setLimit, setPage } = state;
  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    setPage(next <= maxPage ? next : current);
  }, [page, maxPage]);

  const handlePageClick = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleSetLimit = useCallback((limit: number) => {
    setLimit(limit);
  }, []);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  return {
    page,
    limit,
    handleNextPageClick,
    handlePrevPageClick,
    handlePageClick,
    handleSetLimit,
  };
}
