// src/hooks/useLocalStorage.ts

import { useState, useEffect, useCallback } from 'react';

export interface UseStorageOptions {
  /** window.localStorage or window.sessionStorage */
  storage?: Storage;
  /** if true, clears existing value on first render */
  clearOnInit?: boolean;
}

/**
 * A React hook that syncs a piece of state with localStorage.
 *
 * @param key           The localStorage key under which to store the value.
 * @param defaultValue  The initial state if localStorage is empty or invalid.
 * @param options        Configuration options for the hook.
 * @returns             A tuple [value, setValue], mirroring useState.
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

  // keep storage in sync
  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch {
      /* swallow */
    }
  }, [key, state, storage]);

  // reset function
  const reset = useCallback(() => {
    try {
      storage.removeItem(key);
    } catch {
      /* swallow */
    }
    setState(defaultValue);
  }, [key, defaultValue, storage]);

  return [state, setState, reset];
}
