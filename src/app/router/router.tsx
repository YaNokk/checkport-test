import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { routes } from "@/app/config";
import { NotFound } from "@/pages/notFound";
import { Empty } from "@/pages/empty";
import { Layout } from "@/app/layouts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={"/"} element={<Layout />}>
        {routes.map(({ path, content }, index) => (
          <Route key={index} path={path} element={content || <Empty />} />
        ))}
      </Route>
      <Route path={"*"} element={<NotFound />} />
    </>,
  ),
  { basename: import.meta.env.VITE_BASE },
);

export function Router() {
  return <RouterProvider router={router} />;
}
