import React from 'react';
import { Trash2, History as HistoryIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoryPanel: React.FC = () => {
  const { history, clearHistory } = useApp();

  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
          <HistoryIcon className="w-4 h-4" />
          <span>Recent Calculations</span>
        </div>
        <button
          onClick={clearHistory}
          className="text-xs text-red-500 hover:text-red-600 flex items-center space-x-1"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {history.map((rec) => (
          <div key={rec.id} className="text-xs p-2 bg-slate-50 dark:bg-slate-700/40 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{rec.calculatorTitle}</p>
              <p className="text-slate-400">{rec.timestamp}</p>
            </div>
            <div className="font-mono text-brand-600 dark:text-brand-400 font-semibold">
              {rec.result.toFixed(2)} {rec.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
