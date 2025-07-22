import { useCallback, useRef } from 'react';

export const useScroll = (rootRef) => {
  const scrollRef = useRef(0);

  const blockScroll = useCallback(() => {
    if (!rootRef.current) return;

    scrollRef.current = window.scrollY;
    const isScrollBarExist =
      window.innerWidth - document.documentElement.clientWidth > 0;

    rootRef.current.style.position = 'fixed';
    rootRef.current.style.top = `-${scrollRef.current}px`;
    rootRef.current.style.left = '0';
    rootRef.current.style.right = '0';
    rootRef.current.style.width = '100%';
    if (isScrollBarExist) {
      rootRef.current.style.overflowY = 'scroll';
    }
  }, [rootRef]);

  const unblockScroll = useCallback(() => {
    if (!rootRef.current) return;

    rootRef.current.removeAttribute('style');

    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollRef.current);

    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });
  }, [rootRef]);

  return { blockScroll, unblockScroll };
};
