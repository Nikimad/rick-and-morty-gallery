import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { InertContext } from '../components/context/InertContext';

export const usePopup = (openerRef) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isPopupClosed = useRef(true);

  const { setInert, removeInert } = useContext(InertContext);

  const openPopup = useCallback(() => {
    if (!isPopupOpen) {
      setIsPopupOpen(true);
      isPopupClosed.current = false;
      setInert();
    }
  }, [isPopupOpen, setInert]);

  const closePopup = useCallback(() => {
    if (isPopupOpen) {
      setIsPopupOpen(false);
      isPopupClosed.current = true;
      removeInert();
    }
  }, [isPopupOpen, removeInert]);

  useEffect(() => {
    if (isPopupClosed.current && openerRef?.current) {
      openerRef.current?.focus({ preventScroll: true });
    }
  }, [openerRef, isPopupOpen]);

  useEffect(() => {
    return () => {
      if (isPopupOpen && !isPopupClosed.current) {
        closePopup();
      }
    };
  }, [isPopupOpen, closePopup]);

  return { isPopupOpen, openPopup, closePopup };
};
