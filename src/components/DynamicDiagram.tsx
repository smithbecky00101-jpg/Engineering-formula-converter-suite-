import React from 'react';

interface DiagramProps {
  type: 'ohms' | 'stress' | 'projectile' | 'fluid';
}

export const DynamicDiagram: React.FC<DiagramProps> = ({ type }) => {
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 flex justify-center items-center border border-slate-200 dark:border-slate-700 my-4">
      {type === 'ohms' && (
        <svg viewBox="0 0 200 120" className="w-48 h-28 stroke-brand-500 fill-none stroke-2">
          <rect x="20" y="20" width="160" height="80" rx="4" />
          <line x1="20" y1="60" x2="180" y2="60" />
          <text x="100" y="45" textAnchor="middle" fill="currentColor" className="text-xs font-bold stroke-none fill-slate-700 dark:fill-slate-200">V (Voltage)</text>
          <text x="60" y="85" textAnchor="middle" fill="currentColor" className="text-xs font-bold stroke-none fill-slate-700 dark:fill-slate-200">I</text>
          <text x="140" y="85" textAnchor="middle" fill="currentColor" className="text-xs font-bold stroke-none fill-slate-700 dark:fill-slate-200">R</text>
        </svg>
      )}

      {type === 'stress' && (
        <svg viewBox="0 0 200 100" className="w-48 h-24 stroke-brand-500 fill-none stroke-2">
          <rect x="60" y="30" width="80" height="40" fill="currentColor" className="fill-slate-200 dark:fill-slate-800" />
          <path d="M20 50 L60 50 M40 45 L60 50 L40 55" />
          <path d="M180 50 L140 50 M160 45 L140 50 L160 55" />
          <text x="30" y="40" className="text-xs stroke-none fill-slate-700 dark:fill-slate-200 font-mono">F</text>
          <text x="170" y="40" className="text-xs stroke-none fill-slate-700 dark:fill-slate-200 font-mono">F</text>
        </svg>
      )}

      {type === 'projectile' && (
        <svg viewBox="0 0 200 100" className="w-48 h-24 stroke-brand-500 fill-none stroke-2">
          <path d="M 20 80 Q 100 0 180 80" strokeDasharray="4 4" />
          <circle cx="20" cy="80" r="4" className="fill-brand-500" />
          <line x1="10" y1="80" x2="190" y2="80" className="stroke-slate-400" />
        </svg>
      )}

      {type === 'fluid' && (
        <svg viewBox="0 0 200 100" className="w-48 h-24 stroke-brand-500 fill-none stroke-2">
          <rect x="20" y="30" width="160" height="40" rx="5" />
          <path d="M 30 50 L 170 50" strokeDasharray="6 3" className="stroke-slate-400" />
        </svg>
      )}
    </div>
  );
};
            
