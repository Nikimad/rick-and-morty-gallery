import { useContext } from 'react';
import { DataContext } from '../components/context/DataContext';

export const useData = () => useContext(DataContext);
