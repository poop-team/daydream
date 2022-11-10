import { useEffect, useState } from "react";

/**
 * Delays state changes of the returned value based on the input value and the delay.
 *
 * @param value - The value to be delayed.
 * @param delay - The delay in milliseconds.
 *
 * @returns The delayed value.
 */
export default function useDebounce(
  value: string | number | boolean,
  delay = 500
) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
