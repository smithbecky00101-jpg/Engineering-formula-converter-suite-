import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CalculationRecord } from '../types';

interface AppContextType {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  history: CalculationRecord[];
  addHistory: (record: Omit<CalculationRecord, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getStoredTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('theme') === 'dark';
};

const getStoredFavorites = (): string[] => {
  if (typeof window === 'undefined') return ['ohms-law', 'torque'];

  const saved = window.localStorage.getItem('favorites');
  if (!saved) return ['ohms-law', 'torque'];

  try {
    const parsed = JSON.parse(saved) as string[];
    return Array.isArray(parsed) ? parsed : ['ohms-law', 'torque'];
  } catch {
    return ['ohms-law', 'torque'];
  }
};

const getStoredHistory = (): CalculationRecord[] => {
  if (typeof window === 'undefined') return [];

  const saved = window.localStorage.getItem('calc_history');
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved) as CalculationRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(getStoredTheme);
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites);
  const [history, setHistory] = useState<CalculationRecord[]>(getStoredHistory);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('theme', 'light');
      }
    }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('calc_history', JSON.stringify(history));
    }
  }, [history]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const addHistory = (record: Omit<CalculationRecord, 'id' | 'timestamp'>) => {
    const newRecord: CalculationRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory((prev) => [newRecord, ...prev.slice(0, 49)]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode, favorites, toggleFavorite, history, addHistory, clearHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
