import { useContext } from 'react';

import { AppContext } from '../components/context/AppContext';

export const useAppState = () => useContext(AppContext);
