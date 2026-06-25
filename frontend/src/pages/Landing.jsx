import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Menu, User, Compass, Home, Map, Key, Tent } from 'lucide-react';

const Landing = () => {
  // Mock categories for the Airbnb vibe
  const categories = [
    { icon: <Compass className="h-6 w-6" />, label: 'Trending' },
    { icon: <Home className="h-6 w-6" />, label: 'Cabins' },
    { icon: <Map className="h-6 w-6" />, label: 'Iconic cities' },
    { icon: <Tent className="h-6 w-6" />, label: 'Camping' },
    { icon: <Key className="h-6 w-6" />, label: 'New' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white px-6 py-4 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-rose-500 font-bold text-2xl tracking-tight">
          <span className="p-1.5 bg-rose-500 text-white rounded-xl">WN</span>
          <span>WanderNest</span>
        </Link>

        {/* Middle Navigation (Mock Search Text) */}
        <div className="hidden md:flex items-center border border-gray-200 shadow-sm hover:shadow-md transition rounded-full py-2 px-4 cursor-pointer gap-4 text-sm font-medium">
          <button className="px-2">Anywhere</button>
          <div className="w-px h-4 bg-gray-200"></div>
          <button className="px-2">Any week</button>
          <div className="w-px h-4 bg-gray-200"></div>
          <button className="text-gray-400 font-normal px-2">Add guests</button>
          <div className="bg-rose-500 text-white p-2 rounded-full">
            <Search className="h-4 w-4" />
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:inline text-sm font-semibold text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full cursor-pointer transition">
            WanderNest your home
          </span>
          <button className="text-gray-700 hover:bg-gray-50 p-2 rounded-full transition">
            <Globe className="h-5 w-5" />
          </button>
          
          {/* Auth Action Actions Menu */}
          <div className="flex items-center gap-3 border border-gray-200 p-2 rounded-full shadow-sm hover:shadow-md transition">
            <Menu className="h-5 w-5 text-gray-500 ml-1 cursor-pointer" />
            <div className="flex items-center gap-2">
              <Link 
                to="/login" className="text-sm font-semibold text-gray-700 hover:text-rose-500 transition px-1">
                Log In
              </Link>
              <Link 
                to="/register" 
                className="bg-rose-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-rose-600 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Category Selector Bar */}
      <div className="flex items-center justify-center gap-8 md:gap-12 border-b border-gray-100 py-4 px-6 overflow-x-auto scrollbar-none">
        {categories.map((cat, index) => (
          <button 
            key={index} 
            className={`flex flex-col items-center gap-2 pb-2 text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 transition min-w-[56px] ${index === 0 ? 'text-gray-900 border-gray-900' : ''}`}
          >
            {cat.icon}
            <span className="text-xs font-medium tracking-wide">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-[500px] flex items-center justify-start p-8 md:p-16 shadow-xl">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          
          {/* Hero Text */}
          <div className="relative z-10 max-w-md text-white">
            <span className="inline-block bg-rose-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Introducing WanderNest
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Find clarity, peace, and your next escape.
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
              Discover unique cabins, luxury stays, and unforgettable spaces tailored to your travel story.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/register" 
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-rose-500/30 text-center w-full sm:w-auto"
              >
                Start Exploring Now
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Mini Features Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Verified Host Networks</h3>
            <p className="text-gray-500 text-sm">Every property undergoes safety and standard audits before becoming listable.</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Flexible Stay Windows</h3>
            <p className="text-gray-500 text-sm">Easily break down bookings into custom sub-leases or nomadic monthly stays.</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Secure tokenized workflows</h3>
            <p className="text-gray-500 text-sm">Seamless checkout flows ensuring automated back-end validation on every cycle.</p>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Landing;