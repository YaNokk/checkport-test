import { toast } from "react-toastify";
import style from "./toast.module.scss";

interface Notification {
  type: "info" | "success" | "warning" | "error";
  text: string;
  description: string;
}

export function notify({ text, description, type }: Notification) {
  toast(
    <div>
      <div className={style.header}>{text}</div>
      <div>{description}</div>
    </div>,
    {
      type,
    },
  );
}
