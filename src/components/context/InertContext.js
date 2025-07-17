import { createContext } from 'react';

export const InertContext = createContext({
  setInert: () => {},
  removeInert: () => {}
});
