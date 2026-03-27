import React from 'react';
import { isToday } from '../../utils/dateUtils';

const DayCell = ({ day, month, year, events, onClick }) => {
  if (!day) {
    return <div className="p-2 border-b border-r dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50" />;
  }

  const today = isToday(year, month, day);
  const truncatedEvents = events.slice(0, 2);
  const remainingCount = events.length - 2;

  return (
    <div 
      onClick={() => onClick(day)}
      className={`
        min-h-[100px] md:min-h-[120px] p-2 border-b border-r dark:border-zinc-800 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50 relative group
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <span 
          className={`
            text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-all
            ${today ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500'}
          `}
        >
          {day}
        </span>
      </div>

      <div className="space-y-1">
        {truncatedEvents.map((event) => (
          <div 
            key={event.id}
            className={`
              text-[10px] md:text-xs px-2 py-1 rounded border-l-2 truncate transition-all
              ${getCategoryStyles(event.category)}
            `}
          >
            {event.title}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="text-[10px] font-medium text-zinc-500 pl-1">
            + {remainingCount} more
          </div>
        )}
      </div>
      
      {/* Visual indicator for events on mobile if grid is too small */}
      <div className="md:hidden flex space-x-0.5 mt-auto">
        {events.map((e, idx) => (idx < 4 && 
          <div key={e.id} className={`w-1 h-1 rounded-full ${getCategoryDot(e.category)}`} />
        ))}
      </div>
    </div>
  );
};

const getCategoryStyles = (category) => {
  switch (category) {
    case 'International': return 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Sri Lanka': return 'bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
    case 'Religious': return 'bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Business': return 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    default: return 'bg-zinc-50 border-zinc-500 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300';
  }
};

const getCategoryDot = (category) => {
  switch (category) {
    case 'International': return 'bg-blue-500';
    case 'Sri Lanka': return 'bg-amber-500';
    case 'Religious': return 'bg-purple-500';
    case 'Business': return 'bg-emerald-500';
    default: return 'bg-zinc-500';
  }
};

export default DayCell;
