import { Outlet } from "react-router-dom";
import { Text } from "@radix-ui/themes";
import { ErrorBoundary } from "@/shared/ui/errorBoundary/errorBoundary.tsx";
import style from "./mainLayout.module.scss";
import { Sidebar } from "@/widgets/sidebar";

export function Layout() {
  return (
    <div className={style.layout}>
      <ErrorBoundary
        fallback={(error) => (
          <Text
            size={"5"}
          >{`Ошибка в работе боковой панели! ${error.message}`}</Text>
        )}
      >
        <Sidebar />
      </ErrorBoundary>
      <div className={style.content}>
        <ErrorBoundary
          fallback={(error) => (
            <Text size={"5"}>{`Ошибка на странице! ${error.message}`}</Text>
          )}
        >
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
