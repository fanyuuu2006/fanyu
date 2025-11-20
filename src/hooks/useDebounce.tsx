/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useCallback } from "react";

type DebouncedFunction<Func extends (...args: any[]) => void> = (
  ...args: Parameters<Func>
) => void;

/**
 * useDebounce Hook - 用於延遲執行函數以減少頻繁調用
 * 
 * @template Func - 函數類型
 * @param callback - 要延遲執行的回調函數
 * @param delay - 延遲時間（毫秒）
 * @returns 包裝後的防抖函數
 * 
 * @example
 * const debouncedSearch = useDebounce((query: string) => {
 *   console.log('Searching for:', query);
 * }, 500);
 */
export const useDebounce = <Func extends (...args: any[]) => any>(
  callback: Func,
  delay: number
): DebouncedFunction<Func> => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // 清理函數，確保組件卸載時清除定時器
  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 組件卸載時清理定時器
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return useCallback(
    (...args: Parameters<Func>) => {
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, clearTimer]
  );
};
