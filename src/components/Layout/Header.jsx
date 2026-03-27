import React from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon, Search } from 'lucide-react';
import { getMonthName } from '../../utils/dateUtils';

const Header = ({ 
  currentYear, 
  currentMonth, 
  onPrevMonth, 
  onNextMonth, 
  onGoToday, 
  darkMode, 
  toggleDarkMode,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4 border-b bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-colors sticky top-0 z-10">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-2">📅</span>
          Special Dates Calendar
        </h1>
        
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
          <button 
            onClick={onPrevMonth}
            className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-all text-zinc-600 dark:text-zinc-400"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNextMonth}
            className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-all text-zinc-600 dark:text-zinc-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <button 
          onClick={onGoToday}
          className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 font-medium transition-all"
        >
          Today
        </button>
        
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 min-w-[140px]">
          {getMonthName(currentMonth)} {currentYear}
        </span>
      </div>

      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-transparent focus:bg-white dark:focus:bg-zinc-700 focus:ring-2 focus:ring-blue-500 rounded-xl outline-none transition-all w-full md:w-64 text-zinc-900 dark:text-zinc-100"
          />
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-600 dark:text-zinc-400"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
