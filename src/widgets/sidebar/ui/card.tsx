import style from "./card.module.scss";
import { IconButton, Separator, Text } from "@radix-ui/themes";
import List from "@/shared/assets/List.svg";

interface CardProps {
  fullName: string;
  companyName: string;
  onList?: () => void;
}

export function Card({ fullName, companyName, onList }: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.avatar}>
          <Text size={"4"}>Ф</Text>
        </div>
        <div>
          <Text size={"4"} as={"div"}>
            {companyName}
          </Text>
          <Text size={"4"} as={"div"}>
            {fullName}
          </Text>
        </div>
      </div>
      <Separator size="4" />
      <div className={style.footer}>
        <IconButton variant="ghost" onClick={onList}>
          <List />
        </IconButton>
        <Text size={"4"}>СКЛАДСКОЙ УЧЁТ</Text>
      </div>
    </div>
  );
}
