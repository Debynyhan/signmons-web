// src/hooks/useStorage.ts
import { useState, useEffect, useCallback } from 'react';

export interface UseStorageOptions {
  /** window.localStorage or window.sessionStorage */
  storage?: Storage;
  /** if true, clears existing value on first render */
  clearOnInit?: boolean;
}

/**
 * Custom hook to sync state with Web Storage (localStorage/sessionStorage).
 * Single responsibility: handles storage read/write and reset functionality.
 */
export function useStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions = {},
): [T, (val: T) => void, () => void] {
  const storage = options.storage ?? window.localStorage;
  const [state, setState] = useState<T>(() => {
    if (options.clearOnInit) {
      storage.removeItem(key);
      return defaultValue;
    }
    try {
      const item = storage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Keep storage in sync
  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [key, state, storage]);

  // Reset function to clear storage and state
  const reset = useCallback(() => {
    try {
      storage.removeItem(key);
    } catch {
      // ignore remove errors
    }
    setState(defaultValue);
  }, [key, defaultValue, storage]);

  return [state, setState, reset];
}
