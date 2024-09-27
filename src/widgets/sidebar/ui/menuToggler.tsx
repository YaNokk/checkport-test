import { toggleMenu, useAppDispatch } from "@/app/store/store.tsx";
import { Button } from "@/shared/ui/button/button.tsx";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export function MenuToggler() {
  const dispatch = useAppDispatch();

  function onClick() {
    dispatch(toggleMenu());
  }

  return (
    <Button onClick={onClick}>
      <HamburgerMenuIcon />
    </Button>
  );
}
