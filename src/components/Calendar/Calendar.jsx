import React from 'react';
import DayCell from './DayCell';
import { getDaysInMonth, getFirstDayOfMonth, formatDateKey } from '../../utils/dateUtils';
import { motion } from 'framer-motion';

const Calendar = ({ year, month, events, onDayClick }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create grid cells
  const cells = [];
  // Empty cells for padding
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  // Group events by date for the current month
  const eventsByDay = {};
  events.forEach(event => {
    const dateKey = event.date; // Expecting YYYY-MM-DD
    if (!eventsByDay[dateKey]) eventsByDay[dateKey] = [];
    eventsByDay[dateKey].push(event);
  });

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col">
      {/* Weekday headers */}
      <div className="calendar-grid border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <motion.div 
        key={`${year}-${month}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        <div className="calendar-grid bg-zinc-200 dark:bg-zinc-800 gap-[1px]">
          {cells.map((day, idx) => {
            const dateKey = day ? formatDateKey(new Date(year, month, day)) : null;
            const dayEvents = day ? (eventsByDay[dateKey] || []) : [];
            
            return (
              <DayCell
                key={idx}
                day={day}
                month={month}
                year={year}
                events={dayEvents}
                onClick={onDayClick}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;
