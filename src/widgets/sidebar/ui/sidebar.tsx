import classNames from "classnames";
import { Separator, Text } from "@radix-ui/themes";
import { Select } from "@/shared/ui/select/select.tsx";
import { Menu } from "./menu.tsx";
import {
  appSelectors,
  setBranch,
  toggleMenu,
  useAppDispatch,
  useAppSelector,
} from "@/app/store/store.tsx";
import { useState } from "react";
import style from "./sidebar.module.scss";
import { MenuToggler } from "@/widgets/sidebar";
import { Card } from "./card.tsx";
import { useGetFilialQuery } from "@/entities/filial";

export function Sidebar() {
  const { data, isLoading } = useGetFilialQuery({});
  const isMenuOpen = useAppSelector(appSelectors.getMenu);
  const branch = useAppSelector(appSelectors.getBranch);
  const [selectOpen, setSelectOpen] = useState(false);
  const dispatch = useAppDispatch();

  function onBranch(branch: string) {
    dispatch(setBranch(Number(branch)));
  }

  function onOpenChange(open: boolean) {
    if (open) return setSelectOpen(open);
    setTimeout(() => {
      setSelectOpen(false);
    }, 200);
  }

  function onList() {
    dispatch(toggleMenu());
  }

  return (
    <>
      {isMenuOpen ? null : (
        <div className={classNames(style.sidebarWrapper, style.collapse)}>
          <MenuToggler />
        </div>
      )}
      <div
        className={classNames(style.sidebar, style.sidebarWrapper, {
          [style.collapse]: !isMenuOpen,
        })}
      >
        <Card
          onList={onList}
          companyName={"НАЗВАНИЕ ФИРМЫ"}
          fullName={"Лоскутникова В.П."}
        />
        <Text as={"div"} size="3">
          Филиалы
        </Text>
        <Select
          open={selectOpen}
          value={branch?.toString()}
          onOpenChange={onOpenChange}
          loading={isLoading}
          style={{ width: "100%" }}
          items={
            data?.map(({ id, name }) => ({
              label: name,
              value: id.toString(),
            })) || []
          }
          onValueChange={onBranch}
        />
        <Separator my={"3"} size={"4"} />
        <Menu className={classNames({ [style.inactive]: selectOpen })} />
      </div>
    </>
  );
}
