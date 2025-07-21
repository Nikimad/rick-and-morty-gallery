import axios from 'axios';

import { API_URL } from '../constants';

export const getData = async (endpoint, params = {}) => {
  let isError = false;
  let data = null;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter((param) => Boolean(param[1]))
  );

  try {
    const res = await axios.get(`${API_URL}/${endpoint}`, {
      params: filteredParams
    });
    data = res.data;
  } catch {
    isError = true;
  }

  return [isError, data];
};
