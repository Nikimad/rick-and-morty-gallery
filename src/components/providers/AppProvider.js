import { useState, useCallback, useEffect, useMemo } from 'react';

import { CHARACTERS_EP, INIT_APP_STATE } from '../../constants';

import { getData } from '../../utils/getData';
import { AppContext } from '../context/AppContext';

const getStateFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const newState = { ...INIT_APP_STATE };

  for (const key of Object.keys(INIT_APP_STATE)) {
    const param = searchParams.get(key);
    if (param !== null) {
      const originalType = typeof INIT_APP_STATE[key];
      newState[key] = originalType === 'number' ? Number(param) : param;
    }
  }

  return newState;
};

const updateUrlSearchParams = (nextState) => {
  const params = new URLSearchParams(window.location.search);

  for (const key of Object.keys(INIT_APP_STATE)) {
    const newValue = nextState[key];

    if (newValue != null && newValue !== INIT_APP_STATE[key]) {
      params.set(key, newValue.toString());
    } else {
      params.delete(key);
    }
  }

  const newUrl = `${window.location.pathname}${
    params.size > 0 ? `?${params.toString()}` : ''
  }`;
  window.history.replaceState({}, '', newUrl);
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(getStateFromUrl());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ prev: null });

  const handleChangeState = useCallback((nextState) => {
    setState((prevState) => {
      const updatedState = { ...prevState, ...nextState };
      updateUrlSearchParams(updatedState);

      return updatedState;
    });
  }, []);

  const handleResetState = useCallback(() => {
    setState(INIT_APP_STATE);
    updateUrlSearchParams(INIT_APP_STATE);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    const [isFetchError, data] = await getData(CHARACTERS_EP, state);

    if (!isFetchError && data) {
      const { results, info } = data;
      if (!Array.isArray(results) || typeof info !== 'object') {
        setIsLoading(false);
        setIsError(true);

        return;
      }
      setCharacters(results);
      setInfo(info);
    }

    setIsLoading(false);
    if (isFetchError) setIsError(true);
  }, [state]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generalState = useMemo(
    () => ({
      data: { characters, info },
      meta: { isLoading, isError },
      state,
      changeState: handleChangeState,
      resetState: handleResetState
    }),
    [
      state,
      isLoading,
      isError,
      info,
      characters,
      handleChangeState,
      handleResetState
    ]
  );

  return (
    <AppContext.Provider value={generalState}>{children}</AppContext.Provider>
  );
};
