import classNames from "classnames";
import style from "./menu.module.scss";
import { routes } from "@/app/config";
import { useLocation } from "react-router-dom";
import { Link } from "@/shared/ui";

interface MenuProps {
  className?: string;
}

export function Menu({ className }: MenuProps) {
  const location = useLocation();
  return (
    <div className={classNames(style.menu, className)}>
      {routes.map(({ path, name }, index) => (
        <Link
          className={classNames(style.menu_item, {
            [style.active]: location.pathname === path,
          })}
          key={index}
          to={path}
        >{`- ${name}`}</Link>
      ))}
    </div>
  );
}
