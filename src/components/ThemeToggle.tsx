import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg bg-white/5 dark:bg-white/5 border border-gray-200/20 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 group"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Sun size={20} className="group-hover:rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;