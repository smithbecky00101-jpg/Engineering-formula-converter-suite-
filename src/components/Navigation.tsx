import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calculator, ArrowLeftRight, Star } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/calculators', label: 'Calculators', icon: Calculator },
    { to: '/converters', label: 'Converters', icon: ArrowLeftRight },
    { to: '/favorites', label: 'Favorites', icon: Star },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:relative bg-white dark:bg-slate-800 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 z-20 md:w-64 md:min-h-[calc(100vh-61px)]">
      <div className="flex md:flex-col justify-around md:justify-start p-2 md:p-4 md:space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-3 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
