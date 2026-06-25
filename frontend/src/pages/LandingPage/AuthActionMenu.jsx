import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, Check } from 'lucide-react';

const AuthActionMenu = () => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const menuRef = useRef(null);

  // 1. Defined languages array
  const rawLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'fr', name: 'French' },
    { code: 'it', name: 'Italian' },
    { code: 'es', name: 'Spanish' }
  ];

  // 2. Programmatically sort languages alphabetically by name
  const sortedLanguages = [...rawLanguages].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // 3. Handle closing the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langName) => {
    setSelectedLanguage(langName);
    setIsLangDropdownOpen(false);
    // Optional: Integrate with an i18n translation framework provider here later
    console.log(`Language switched to: ${langName}`);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Auth Action Menu Outer Pill Bar */}
      <div className="flex items-center gap-3 border border-gray-200 p-1 rounded-full shadow-sm hover:shadow-md transition bg-white">
        
        {/* Clickable Menu Button for Language Triggers */}
        <button 
          onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          className={`p-1.5 rounded-full transition flex items-center gap-1 hover:bg-gray-100 ${
            isLangDropdownOpen ? 'bg-gray-100 text-rose-500' : 'text-gray-500'
          }`}
          title="Select Language"
        >
          <Menu className="h-5 w-5 cursor-pointer" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-0.5">
            {sortedLanguages.find(l => l.name === selectedLanguage)?.code}
          </span>
        </button>

        {/* Auth Navigation Links */}
        <div className="flex items-center gap-2 pr-1">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-700 hover:text-rose-500 transition px-1 whitespace-nowrap"
          >
            Log In
          </Link>
          <Link 
            to="/register" 
            className="bg-rose-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-rose-600 transition whitespace-nowrap"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Floating Worldwide Language Dropdown Menu */}
      {isLangDropdownOpen && (
        <div className="absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Globe className="h-3.5 w-3.5 text-gray-400" />
            <span>Select Language</span>
          </div>
          
          <ul className="max-h-60 overflow-y-auto mt-1 scrollbar-none">
            {sortedLanguages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageSelect(lang.name)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between ${
                    selectedLanguage === lang.name 
                      ? 'bg-rose-50/60 text-rose-600 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{lang.name}</span>
                  {selectedLanguage === lang.name && (
                    <Check className="h-4 w-4 text-rose-500 stroke-[3]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthActionMenu;