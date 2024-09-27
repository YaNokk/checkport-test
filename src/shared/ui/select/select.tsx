import { Select as RadixSelect, Spinner } from "@radix-ui/themes";
import { ComponentProps, CSSProperties, useMemo } from "react";

type Item<T> = {
  value: T;
  label: string;
};

interface SelectProps<T extends string>
  extends ComponentProps<typeof RadixSelect.Root> {
  items: Array<Item<T>>;
  style?: CSSProperties;
  onValueChange: (value: T) => void;
  loading?: boolean;
}

export function Select<T extends string>({
  items,
  value,
  onValueChange,
  style,
  loading,
  ...rest
}: SelectProps<T>) {
  const activeValue = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [value, items]);

  return (
    <RadixSelect.Root
      onValueChange={onValueChange}
      value={value}
      disabled={loading}
      {...rest}
    >
      <RadixSelect.Trigger style={style}>
        {loading ? <Spinner /> : null}
        {activeValue ? activeValue.label : null}
      </RadixSelect.Trigger>
      <RadixSelect.Content position={"popper"}>
        <RadixSelect.Group>
          {items.map(({ value, label }, index) => (
            <RadixSelect.Item key={index} value={value}>
              {label}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Group>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
