import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedState<T>(
  initialValue: T,
  delay?: number,
): [T, T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(value, delay);
  return [debouncedValue, value, setValue];
}
