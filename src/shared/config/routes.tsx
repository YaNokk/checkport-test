import { ReactNode } from "react";
import { Menu } from "@/pages/menu";

interface Route {
  name: string;
  path: string;
  content?: ReactNode;
}

export const routes: Array<Route> = [
  {
    name: "Компоненты",
    path: "/components",
  },
  {
    name: "Полуфабрикаты",
    path: "/semi-finished-products",
  },
  {
    name: "Товары",
    path: "/products",
  },
  {
    name: "Меню",
    path: "/menu",
    content: <Menu />,
  },
  {
    name: "Перемещения",
    path: "/movements",
  },
  {
    name: "Инвентаризация",
    path: "/inventory",
  },
  {
    name: "Выпуск товара",
    path: "/product-release",
  },
  {
    name: "Списание",
    path: "/write-off",
  },
  {
    name: "Накладные",
    path: "/invoices",
  },
];
