import { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

import { DataContext } from '../context/DataContext';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const DataProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const { data } = await axios.get(url);
      const { results = [], info = {} } = data;
      setCharacters(results);
      setInfo(info);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info, fetchData]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
};
