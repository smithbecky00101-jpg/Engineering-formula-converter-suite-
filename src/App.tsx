import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { CalculatorView } from './pages/CalculatorView';
import { ConverterView } from './pages/ConverterView';
import { FavoritesView } from './pages/FavoritesView';
import { HistoryPanel } from './components/HistoryPanel';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto pb-16 md:pb-0">
            <Navigation />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calculators" element={<CalculatorView />} />
                <Route path="/converters" element={<ConverterView />} />
                <Route path="/favorites" element={<FavoritesView />} />
              </Routes>
              <HistoryPanel />
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
                                                    
