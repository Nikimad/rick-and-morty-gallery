import { useState, useRef, useCallback } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { InertContext } from '../context/InertContext';

export const InertProvider = ({ children }) => {
  const rootRef = useRef(null);
  const [isInert, setIsInert] = useState(false);
  const { blockScroll, unblockScroll } = useScroll(rootRef);

  const setInert = useCallback(() => {
    if (!isInert) {
      blockScroll();
      setIsInert(true);
    }
  }, [isInert, blockScroll]);

  const removeInert = useCallback(() => {
    if (isInert) {
      unblockScroll();
      setIsInert(false);
    }
  }, [isInert, unblockScroll]);

  return (
    <InertContext.Provider value={{ setInert, removeInert }}>
      <div id="content-root" ref={rootRef} {...(isInert && { inert: 'true' })}>
        {children}
      </div>
      <div id="popup-root" />
    </InertContext.Provider>
  );
};
