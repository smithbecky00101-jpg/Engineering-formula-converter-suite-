import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CALCULATORS } from '../utils/calculators';
import type { CalculatorDefinition } from '../types';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { DynamicDiagram } from '../components/DynamicDiagram';
import { Star, Copy, Check } from 'lucide-react';

export const CalculatorView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const { favorites, toggleFavorite, addHistory } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCalc, setSelectedCalc] = useState<CalculatorDefinition>(CALCULATORS[0]);
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const initialInputs: Record<string, number> = {};
    selectedCalc.inputs.forEach((inp) => {
      initialInputs[inp.id] = inp.defaultValue;
    });
    setInputValues(initialInputs);
  }, [selectedCalc]);

  const filtered = CALCULATORS.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory ? c.category === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  const handleInputChange = (id: string, val: string) => {
    const parsed = Number.parseFloat(val);
    setInputValues((prev) => ({
      ...prev,
      [id]: Number.isNaN(parsed) ? 0 : parsed,
    }));
  };

  const calculationResult = selectedCalc.calculate(inputValues);

  const handleSaveToHistory = () => {
    addHistory({
      calculatorTitle: selectedCalc.title,
      inputs: inputValues,
      result: calculationResult.result,
      unit: selectedCalc.outputSymbol,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${calculationResult.result} ${selectedCalc.outputSymbol}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search formulas..." />
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setSelectedCalc(calc)}
              className={`w-full text-left p-3 rounded-xl border transition ${
                selectedCalc.id === calc.id
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">{calc.title}</span>
                <span className="text-xs opacity-75">{calc.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCalc.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCalc.description}</p>
          </div>
          <button
            onClick={() => toggleFavorite(selectedCalc.id)}
            className={`p-2 rounded-lg border transition ${
              favorites.includes(selectedCalc.id)
                ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 text-amber-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl font-mono text-center text-brand-600 dark:text-brand-400 font-bold">
          Formula: {selectedCalc.formula}
        </div>

        {selectedCalc.diagramType && <DynamicDiagram type={selectedCalc.diagramType} />}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Inputs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedCalc.inputs.map((inp) => (
              <div key={inp.id}>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {inp.label} ({inp.symbol}) - [{inp.unit}]
                </label>
                <input
                  type="number"
                  value={inputValues[inp.id] ?? ''}
                  onChange={(e) => handleInputChange(inp.id, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-500 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-brand-50 dark:bg-slate-900/80 border border-brand-100 dark:border-slate-700 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Calculated Output</span>
            <button
              onClick={handleCopy}
              className="text-xs text-brand-600 dark:text-brand-400 flex items-center space-x-1 hover:underline"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Result'}</span>
            </button>
          </div>
          <div className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">
            {calculationResult.result.toFixed(4)} <span className="text-sm">{selectedCalc.outputSymbol}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Step-by-Step Breakdown</h3>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl space-y-1 font-mono text-xs text-slate-600 dark:text-slate-400">
            {calculationResult.steps.map((step, idx) => (
              <p key={`${selectedCalc.id}-${idx}`}>{step}</p>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveToHistory}
          className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition"
        >
          Save to History
        </button>
      </div>
    </div>
  );
};
