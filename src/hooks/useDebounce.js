import { useRef, useEffect, useCallback } from 'react';

export const useDebounce = (callback, delay, options = {}) => {
  const { leading = false, maxWait } = options;

  const timeoutRef = useRef(null);
  const lastCallTimeRef = useRef(null);
  const lastInvokeTimeRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const debounced = useCallback(
    (...args) => {
      const now = Date.now();

      const invoke = () => {
        savedCallback.current(...args);
        lastInvokeTimeRef.current = now;
      };

      if (!lastCallTimeRef.current) {
        lastCallTimeRef.current = now;
      }

      const timeSinceLastInvoke = now - (lastInvokeTimeRef.current || 0);

      if (leading && !timeoutRef.current) {
        invoke();
      }

      clearTimeout(timeoutRef.current);

      if (maxWait && timeSinceLastInvoke >= maxWait) {
        invoke();
      } else {
        timeoutRef.current = setTimeout(() => {
          if (!leading) invoke();
          timeoutRef.current = null;
          lastCallTimeRef.current = null;
        }, delay);
      }

      lastCallTimeRef.current = now;
    },
    [delay, leading, maxWait]
  );

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debounced;
};
