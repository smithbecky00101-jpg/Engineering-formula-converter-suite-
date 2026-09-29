import React from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../utils/calculators';
import { Calculator, ArrowLeftRight, ChevronRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const categories = Array.from(new Set(CALCULATORS.map((c) => c.category)));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Engineering Formula & Converter Suite</h2>
        <p className="text-brand-100 text-sm max-w-2xl">
          High-precision interactive tools, step-by-step calculation breakdown, visual dynamic diagrams, and unit converters engineered for offline productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/calculators" className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-400 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Formula Calculators</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{CALCULATORS.length} specialized engineering calculators</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>

        <Link to="/converters" className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-400 rounded-lg">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Unit Converters</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Multi-unit physical quantity converter</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/calculators?category=${encodeURIComponent(cat)}`}
              className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm text-center hover:border-brand-300 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
