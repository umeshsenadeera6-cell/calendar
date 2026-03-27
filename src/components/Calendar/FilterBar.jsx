import React from 'react';

const categories = ["All", "International", "Sri Lanka", "Religious", "Business"];

const FilterBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex items-center space-x-2 p-4 overflow-x-auto no-scrollbar bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mr-2 whitespace-nowrap">
        Filters:
      </span>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap shadow-sm border ${
            selectedCategory === cat
              ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-500/10'
              : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
