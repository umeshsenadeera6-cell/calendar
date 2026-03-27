import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Layout/Header';
import FilterBar from './components/Calendar/FilterBar';
import Calendar from './components/Calendar/Calendar';
import EventModal from './components/Calendar/EventModal';
import { initialEvents } from './data/eventsData';
import { formatDateKey } from './utils/dateUtils';
import './index.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('dark_mode') === 'true' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Sync dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark_mode', darkMode);
  }, [darkMode]);

  // Sync events to local storage
  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(events));
  }, [events]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleGoToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day) => {
    const date = formatDateKey(new Date(currentYear, currentMonth, day));
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // Filter and Search logic
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  // Events for the selected date in modal
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter(e => e.date === selectedDate);
  }, [events, selectedDate]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors">
      <Header 
        currentYear={currentYear}
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onGoToday={handleGoToday}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <FilterBar 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <main className="flex-1 relative">
        <Calendar 
          year={currentYear}
          month={currentMonth}
          events={filteredEvents}
          onDayClick={handleDayClick}
        />
      </main>

      {selectedDate && (
        <EventModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
          events={selectedDateEvents}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}

      {/* Simple Footer/Info */}
      <footer className="p-2 text-[10px] text-center text-zinc-400 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
        Click on any date to view details or add your own events. Data is stored in your browser's local storage.
      </footer>
    </div>
  );
}

export default App;
