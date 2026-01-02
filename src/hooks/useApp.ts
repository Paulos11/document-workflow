import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextValue } from '../context/AppContext';

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
