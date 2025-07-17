import { useCallback } from 'react';

export const useScroll = (rootRef) => {
  const blockScroll = useCallback(() => {
    if (!rootRef?.current) return;

    const isScrollHeightEqual =
      Math.abs(
        document.documentElement.scrollHeight - rootRef.current.scrollHeight
      ) <= 1;

    if (isScrollHeightEqual) {
      rootRef.current.style.setProperty(
        'bottom',
        `-${Math.abs(
          document.documentElement.clientHeight -
            rootRef.current.getBoundingClientRect().bottom
        )}px`
      );
      rootRef.current.style.setProperty('overflow-y', 'scroll');
    }
    rootRef.current.style.setProperty('position', 'fixed');
    rootRef.current.style.setProperty('width', '100%');
  }, [rootRef]);

  const unblockScroll = useCallback(() => {
    if (!rootRef?.current) return;

    const restoredScrollPosition = Math.abs(
      rootRef.current.getBoundingClientRect().top
    );

    rootRef.current.removeAttribute('style');

    window.scrollTo(0, restoredScrollPosition);
  }, [rootRef]);

  return { blockScroll, unblockScroll };
};
