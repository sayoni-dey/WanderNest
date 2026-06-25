import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { format } from 'date-fns';

const MiddleNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const dropdownRef = useRef(null);

  // Close the date dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format dates for display
  const formatDateDisplay = (dateString, fallback) => {
    if (!dateString) return fallback;
    try {
      return format(new Date(dateString), 'MMM dd');
    } catch (e) {
      return fallback;
    }
  };

  // Quick reset handler
  const clearDates = (e) => {
    e.stopPropagation();
    setCheckIn('');
    setCheckOut('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Bar Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden md:flex items-center border border-gray-200 rounded-full py-0.5 pl-2 pr-0.5 cursor-pointer gap-2 text-sm font-medium transition duration-200 select-none ${
          isOpen ? 'shadow-lg bg-gray-50 border-gray-300' : 'shadow-sm hover:shadow-md bg-white'
        }`}
      >
        <button className="px-2 text-left hover:text-rose-500 transition">
          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Where</span>
          <span className="text-gray-800">Anywhere</span>
        </button>
        
        <div className="w-px h-6 bg-gray-200 self-center"></div>
        
        <button className="px-2 text-left min-w-[80px]">
          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Check in</span>
          <span className={checkIn ? 'text-gray-900 font-semibold' : 'text-gray-400 font-normal'}>
            {formatDateDisplay(checkIn, 'Add date')}
          </span>
        </button>
        
        <div className="w-px h-6 bg-gray-200 self-center"></div>
        
        <button className="px-2 text-left min-w-[80px]">
          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Check out</span>
          <span className={checkOut ? 'text-gray-900 font-semibold' : 'text-gray-400 font-normal'}>
            {formatDateDisplay(checkOut, 'Add date')}
          </span>
        </button>
        
        <div className="w-px h-6 bg-gray-200 self-center"></div>
        
        <div className="flex items-center gap-2 pl-2">
          <button className="text-gray-400 font-normal hover:text-gray-900 transition">Add guests</button>
          
          {(checkIn || checkOut) && (
            <button 
              onClick={clearDates}
              className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition mr-1"
              title="Clear dates"
            >
              <X className="h-3 w-3" />
            </button>
          )}

          <div className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition shadow-sm">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Floating Interactive Calendar Panel */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[360px] bg-white border border-gray-150 rounded-3xl shadow-xl p-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <h4 className="font-bold text-gray-900 text-sm mb-4 tracking-tight">Select your stay timeline</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Check-In input block */}
            <div className="flex flex-col gap-1 border border-gray-200 rounded-xl p-2 focus-within:border-rose-500 transition">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider pl-1">Check-In</label>
              <input 
                type="date" 
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent outline-none cursor-pointer w-full"
              />
            </div>

            {/* Check-Out input block */}
            <div className="flex flex-col gap-1 border border-gray-200 rounded-xl p-2 focus-within:border-rose-500 transition">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider pl-1">Check-Out</label>
              <input 
                type="date" 
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent outline-none cursor-pointer w-full"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-400 italic">
              {checkIn && checkOut ? 'Timeline targeted!' : 'Pick calendar markers'}
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-1.5 px-4 rounded-lg transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiddleNavigation;