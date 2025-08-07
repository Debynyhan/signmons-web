// src/hooks/useLocalStorage.ts

import { useState, useEffect } from 'react';

/**
 * A React hook that syncs a piece of state with localStorage.
 *
 * @param key           The localStorage key under which to store the value.
 * @param defaultValue  The initial state if localStorage is empty or invalid.
 * @returns             A tuple [value, setValue], mirroring useState.
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (val: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Ignore write errors (e.g. storage full, disabled)
    }
  }, [key, state]);

  return [state, setState];
}
