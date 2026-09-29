import React, { useState } from 'react';
import { UNIT_DATA, convertValue } from '../utils/converters';
import { ArrowLeftRight } from 'lucide-react';

export const ConverterView: React.FC = () => {
  const categories = Object.keys(UNIT_DATA).concat(['Temperature']);
  const [selectedCategory, setSelectedCategory] = useState<string>('Length');

  const getUnits = (cat: string) => {
    if (cat === 'Temperature') {
      return ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'];
    }
    return Object.keys(UNIT_DATA[cat]?.units || {});
  };

  const units = getUnits(selectedCategory);
  const [fromUnit, setFromUnit] = useState<string>(units[0] || '');
  const [toUnit, setToUnit] = useState<string>(units[1] || units[0] || '');
  const [value, setValue] = useState<number>(1);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newUnits = getUnits(cat);
    setFromUnit(newUnits[0] || '');
    setToUnit(newUnits[1] || newUnits[0] || '');
  };

  const converted = convertValue(value, fromUnit, toUnit, selectedCategory);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-700 pb-4">
        <ArrowLeftRight className="w-6 h-6 text-brand-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Engineering Unit Converter</h2>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">From</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono dark:text-white"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
          >
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">To</label>
          <div className="w-full px-3 py-2 bg-brand-50 dark:bg-slate-900/80 border border-brand-100 dark:border-slate-700 rounded-lg text-sm font-mono font-bold text-brand-600 dark:text-brand-400">
            {converted.toFixed(4)}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
          >
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
         
