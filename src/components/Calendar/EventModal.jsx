import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Tag, AlignLeft, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventModal = ({ isOpen, onClose, date, events, onAddEvent, onDeleteEvent }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('International');

  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    onAddEvent({
      id: Date.now(),
      date,
      title: newTitle,
      description: newDesc,
      category: newCategory,
      color: getCategoryColor(newCategory)
    });
    
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 italic">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center">
                <CalendarIcon size={14} className="mr-1" /> Events for this day
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {events.length > 0 ? (
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="relative group">
                    <div className="flex items-start space-x-4">
                      <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 bg-${event.color || 'blue'}-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-tight">{event.title}</h3>
                          <button 
                            onClick={() => onDeleteEvent(event.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="inline-flex items-center px-2 py-0.5 mt-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tighter">
                          <Tag size={10} className="mr-1" /> {event.category}
                        </div>
                        {event.description && (
                          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50 flex items-start">
                            <AlignLeft size={14} className="mr-2 mt-1 opacity-50 flex-shrink-0" />
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon size={32} className="text-zinc-400" />
                </div>
                <p className="text-zinc-500 dark:text-zinc-400">No events scheduled for this day.</p>
              </div>
            )}
          </div>

          {/* Add Event Form */}
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800">
            {isAdding ? (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleAdd} 
                className="space-y-4"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Event Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100"
                />
                <textarea
                  placeholder="Description (Optional)"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 min-h-[80px]"
                />
                <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                  {['International', 'Sri Lanka', 'Religious', 'Business'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-tighter whitespace-nowrap transition-all border ${
                        newCategory === cat 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    Save Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full py-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
              >
                <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" /> 
                Add Custom Event
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'International': return 'blue';
    case 'Sri Lanka': return 'amber';
    case 'Religious': return 'purple';
    case 'Business': return 'emerald';
    default: return 'zinc';
  }
};

export default EventModal;
