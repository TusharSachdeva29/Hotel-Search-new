// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import { Mic, Camera, MessageSquare, Search, Hotel, Calendar, Users, DollarSign, Moon, Sun } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage for dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update dark mode preference and store it in localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Dark Mode Toggle */}
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Experience a smarter way to search for hotels with voice commands, 
            chat assistance, and visual discovery
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2">
            <div className="flex items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Where would you like to stay?"
                  className="w-full px-4 py-3 text-gray-800 dark:text-white bg-transparent rounded-l-lg focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 px-2">
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Smart Search Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Mic className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
            title="Voice Search"
            description="Simply speak your preferences and let our system find the perfect match"
          />
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
            title="Chat Assistant"
            description="Get personalized recommendations through our intelligent chat interface"
          />
          <FeatureCard
            icon={<Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
            title="Visual Discovery"
            description="Find hotels that match your style using image-based search"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Quick Filters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickFilter icon={<Hotel />} label="Property Type" />
            <QuickFilter icon={<Calendar />} label="Dates" />
            <QuickFilter icon={<Users />} label="Guests" />
            <QuickFilter icon={<DollarSign />} label="Price Range" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function QuickFilter({ icon, label }) {
  return (
    <button className="flex items-center gap-3 p-4 border dark:border-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors dark:text-white">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
