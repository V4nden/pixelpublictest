import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, cooldown: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    timeoutId && clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        setDebouncedValue(value);
      }, cooldown)
    );
  }, [value]);

  return debouncedValue;
}
