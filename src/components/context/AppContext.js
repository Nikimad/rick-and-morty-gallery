import { createContext } from 'react';

import { INIT_APP_STATE } from '../../constants';

export const AppContext = createContext({
  data: { characters: [], info: [] },
  meta: { isLoading: false, isError: false },
  state: INIT_APP_STATE,
  changeState: () => {},
  resetState: () => {}
});
