/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useCallback } from "react";

type DebouncedFunction<Func extends (...args: any[]) => void> = (
  ...args: Parameters<Func>
) => void;

export const useDebounce = <Func extends (...args: any[]) => void>(
  callback: Func,
  delay: number
): DebouncedFunction<Func> => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<Func>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};
