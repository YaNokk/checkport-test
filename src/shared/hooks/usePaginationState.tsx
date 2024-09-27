import { useCallback, useState } from "react";

export function usePaginationState(limitPerPage: number = 5) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(limitPerPage);

  const handleReset = useCallback(() => {
    setPage(1);
  }, []);

  return { page, limit, setLimit, setPage, handleReset };
}
