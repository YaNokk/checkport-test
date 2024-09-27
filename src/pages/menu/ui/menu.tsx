import { Input, Pagination, Select, Table, TableColumn } from "@/shared/ui";
import { useEffect, useState } from "react";
import { appSelectors, useAppSelector } from "@/app/store";
import {
  useDebouncedState,
  usePagination,
  usePaginationState,
} from "@/shared/hooks";
import type { Menu } from "@/shared/api";
import { MenuActive } from "@/shared/api";
import { useGetMenuQuery } from "@/entities/menu";

export function Menu() {
  const filialId = useAppSelector(appSelectors.getBranch);
  const [debouncedName, name, setName] = useDebouncedState("");
  const [debouncedFilial, filial, setFilial] = useDebouncedState("");
  const [debouncedBranch, branch, setBranch] = useDebouncedState("");
  const [active, setActive] = useState<
    (typeof MenuActive)[keyof typeof MenuActive]
  >(MenuActive.active);

  const paginationState = usePaginationState();
  const { data, isFetching } = useGetMenuQuery(
    {
      name: debouncedName,
      filial: debouncedFilial,
      tt: debouncedBranch,
      page: paginationState.page,
      limit: paginationState.limit,
      active,
      filialId: filialId!,
    },
    { skip: !filialId },
  );
  const {
    page,
    limit,
    handlePageClick,
    handleNextPageClick,
    handleSetLimit,
    handlePrevPageClick,
  } = usePagination(paginationState, data?.max_pages);

  useEffect(() => {
    paginationState.handleReset();
  }, [
    filialId,
    debouncedName,
    debouncedFilial,
    debouncedBranch,
    active,
    limit,
  ]);

  const columns: Array<TableColumn<Menu>> = [
    {
      title: (
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={"Название меню"}
        />
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Input
          value={filial}
          onChange={(event) => setFilial(event.target.value)}
          placeholder={"Филиал"}
        />
      ),
      dataIndex: (data: Menu) => data.filial.name,
      key: "filial",
    },
    {
      title: (
        <Input
          value={branch}
          onChange={(event) => setBranch(event.target.value)}
          placeholder={"Торговая точка"}
        />
      ),
      dataIndex: (data: Menu) => data.tt.name,
      key: "tt",
    },
    {
      title: (
        <Select
          style={{ width: "100%" }}
          value={active}
          onValueChange={setActive}
          items={[
            { label: "Активно", value: MenuActive.active },
            { label: "Не активно", value: MenuActive.inactive },
          ]}
        />
      ),
      dataIndex: (data: Menu) => (data.active ? "Активно" : "Не активно"),
      key: "active",
    },
    {
      title: "Экспорт",
      dataIndex: (data: Menu) => (
        <>
          {data.export?.map((_export, index) => (
            <div key={index}>{_export}</div>
          ))}
        </>
      ),
      key: "export",
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data?.data}
        actions={{
          onStat: console.log,
          onDelete: console.log,
          onEdit: console.log,
        }}
      />
      <Pagination
        onNextPageClick={handleNextPageClick}
        onPageChange={handlePageClick}
        onPrevPageClick={handlePrevPageClick}
        currentPage={page}
        maxPage={data?.max_pages}
        pageSizeOptions={{
          pageSize: limit,
          onPageSizeChange: handleSetLimit,
        }}
      />
    </>
  );
}
