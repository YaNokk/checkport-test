import { Button } from "../button/button.tsx";
import { useMemo } from "react";
import style from "./pagination.module.scss";
import { Select } from "@/shared/ui/select/select.tsx";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  maxPage?: number;
  pageSizeOptions?: {
    pageSize: number;
    pageSizeList?: Array<number>;
    onPageSizeChange: (pageSize: number) => void;
  };
};

export function Pagination(props: PaginationProps) {
  const {
    currentPage,
    maxPage = 1,
    pageSizeOptions,
    onNextPageClick,
    onPrevPageClick,
    onPageChange,
  } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };
  const handlePageSizeChange = (pageSize: string) => {
    pageSizeOptions!.onPageSizeChange(Number(pageSize));
  };

  const pages = useMemo(
    () => Array.from({ length: maxPage }, (_, index) => index + 1),
    [maxPage],
  );

  const pageSizeList = useMemo(() => {
    return pageSizeOptions?.pageSizeList?.length
      ? pageSizeOptions.pageSizeList
      : [1, 5, 10];
  }, [pageSizeOptions]);

  return (
    <div className={style.pagination}>
      <Button onClick={handlePrevPageClick} disabled={currentPage === 1}>
        {"<"}
      </Button>
      <span className={style.pages}>
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? undefined : "outline"}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Button>
        ))}
      </span>
      <Button
        type="button"
        onClick={handleNextPageClick}
        disabled={currentPage === maxPage}
      >
        {">"}
      </Button>
      {pageSizeOptions ? (
        <Select
          value={pageSizeOptions.pageSize.toString()}
          items={pageSizeList.map((size) => ({
            label: size.toString(),
            value: size.toString(),
          }))}
          onValueChange={handlePageSizeChange}
        />
      ) : null}
    </div>
  );
}
