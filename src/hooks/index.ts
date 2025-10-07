import { useState, useEffect } from 'react';
import type { LoadingState } from '../types';

export function useAsync<T>(asyncFunction: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<LoadingState & { data: T | null }>({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let isMounted = true;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    asyncFunction()
      .then(data => {
        if (isMounted) {
          setState({ isLoading: false, error: null, data });
        }
      })
      .catch(error => {
        if (isMounted) {
          setState({ isLoading: false, error: error.message, data: null });
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useDebounce<T>(value: T, delay: number): T {
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

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse, setValue };
}

// Re-export property hooks
export * from './useProperties';