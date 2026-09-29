import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalculationRecord } from '../types';

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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : ['ohms-law', 'torque'];
  });

  const [history, setHistory] = useState<CalculationRecord[]>(() => {
    const saved = localStorage.getItem('calc_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history));
  }, [history]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addHistory = (record: Omit<CalculationRecord, 'id' | 'timestamp'>) => {
    const newRecord: CalculationRecord = {
      ...record,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setHistory(prev => [newRecord, ...prev.slice(0, 49)]); // Keep last 50
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
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
      
