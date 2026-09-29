import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CALCULATORS } from '../utils/calculators';
import { Star, ChevronRight } from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const { favorites } = useApp();
  const favCalculators = CALCULATORS.filter((c) => favorites.includes(c.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700 pb-3">
        <Star className="w-5 h-5 text-amber-500 fill-current" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Saved Favorites</h2>
      </div>

      {favCalculators.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          No favorite calculators added yet. Click the star icon on any formula to save it here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favCalculators.map((calc) => (
            <Link
              key={calc.id}
              to={`/calculators`}
              className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center hover:border-brand-500 transition"
            >
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">{calc.title}</h3>
                <p className="text-xs text-slate-400">{calc.category} • {calc.formula}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
                  
