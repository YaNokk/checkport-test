import { IconButton, Table as RadixTable } from "@radix-ui/themes";
import { ReactNode, useMemo } from "react";
import Chart from "@/shared/assets/Chart.svg";
import Trash from "@/shared/assets/Trash.svg";
import Pen from "@/shared/assets/Pen.svg";
import style from "./table.module.scss";
import { Loader } from "@/shared/ui";

export type TableColumn<T> = {
  title: ReactNode;
  dataIndex: ((data: T) => ReactNode) | keyof T;
  key: string;
};

interface TableProps<T> {
  columns: Array<TableColumn<T>>;
  actions?: {
    onDelete: (data: T) => void;
    onEdit: (data: T) => void;
    onStat: (data: T) => void;
  };
  dataSource?: Array<T>;
  loading?: boolean;
}

export function Table<T extends { id: number }>({
  columns,
  dataSource,
  actions,
  loading,
}: TableProps<T>) {
  const actionsLength = useMemo(
    () => Object.keys(actions || {}).length,
    [actions],
  );

  return (
    <RadixTable.Root
      style={{ overflow: "auto", height: "100%" }}
      layout={"auto"}
    >
      <RadixTable.Header>
        <RadixTable.Row align={"center"} className={style.headerRow}>
          {columns.map(({ title, key }) => (
            <RadixTable.ColumnHeaderCell key={key}>
              <div className={style.headerCell}>{title}</div>
            </RadixTable.ColumnHeaderCell>
          ))}
          {actionsLength ? <RadixTable.ColumnHeaderCell /> : null}
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body style={{ position: "relative" }}>
        {dataSource && dataSource.length ? (
          dataSource.map((record) => {
            return (
              <RadixTable.Row
                align={"start"}
                className={style.row}
                key={record.id}
              >
                {columns.map(({ dataIndex }, index) => (
                  <RadixTable.Cell key={index}>
                    {typeof dataIndex === "function"
                      ? dataIndex(record)
                      : (record[dataIndex] as ReactNode)}
                  </RadixTable.Cell>
                ))}
                {actionsLength ? (
                  <RadixTable.Cell>
                    <div className={style.actions}>
                      {actions?.onStat ? (
                        <IconButton
                          className={style.action}
                          variant="ghost"
                          onClick={() => actions.onStat(record)}
                        >
                          <Chart />
                        </IconButton>
                      ) : null}
                      {actions?.onEdit ? (
                        <IconButton
                          className={style.action}
                          variant="ghost"
                          onClick={() => actions.onEdit(record)}
                        >
                          <Pen />
                        </IconButton>
                      ) : null}
                      {actions?.onDelete ? (
                        <IconButton
                          className={style.action}
                          variant="ghost"
                          onClick={() => actions.onDelete(record)}
                        >
                          <Trash />
                        </IconButton>
                      ) : null}
                    </div>
                  </RadixTable.Cell>
                ) : null}
              </RadixTable.Row>
            );
          })
        ) : (
          <RadixTable.Row align={"center"} className={style.row}>
            <RadixTable.Cell align={"center"} colSpan={columns.length + 1}>
              Данные не найдены!
            </RadixTable.Cell>
          </RadixTable.Row>
        )}
        {loading ? (
          <RadixTable.Row className={style.row}>
            <RadixTable.Cell
              style={{ display: "contents" }}
              colSpan={columns.length + 1}
            >
              <Loader />
            </RadixTable.Cell>
          </RadixTable.Row>
        ) : null}
      </RadixTable.Body>
    </RadixTable.Root>
  );
}
