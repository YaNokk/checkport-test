import { Router } from "@/app/router";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <Provider store={store}>
      <Theme>
        <ToastContainer />
        <Router />
      </Theme>
    </Provider>
  );
}
