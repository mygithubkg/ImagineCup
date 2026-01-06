import { MapPin, LogOut, Sprout, Globe } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeader = ({ user, language, onToggleLanguage, onLogout }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-40 border-b border-[#143d28]/5 bg-[#FFFBF0]/80 backdrop-blur-md"
    >
      {/* Noise Texture Overlay for Consistency */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="flex items-center justify-between">
          
          {/* --- LEFT: Identity & Roots --- */}
          <div className="flex items-center space-x-4">
            {/* Organic Avatar */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-14 h-14"
            >
              {/* "Breathing" Ring */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-green-400/30 rounded-[20px] blur-sm"
              />
              {/* The Actual Avatar Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#143d28] to-[#4F772D] rounded-[18px] flex items-center justify-center text-[#FFFBF0] font-serif font-bold text-xl shadow-lg shadow-green-900/20 border-2 border-white/20">
                {user.type === 'guest' ? <Sprout size={24} /> : 'RK'}
              </div>
              {/* Online Status Dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFFBF0] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-serif font-black text-[#143d28] leading-tight"
              >
                Namaste, {user.type === 'guest' ? 'Guest' : 'Ramesh'}
              </motion.h1>
              
              <div className="flex items-center space-x-1.5 text-sm text-[#143d28]/60 font-medium">
                <MapPin className="w-3.5 h-3.5 text-yellow-600" />
                <span>Ghaziabad, UP</span>
                <span className="w-1 h-1 bg-[#143d28]/20 rounded-full mx-1"></span>
                <span className="text-xs uppercase tracking-wider">Sunny, 32°C</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Tools (Language & Exit) --- */}
          <div className="flex items-center gap-4">
            
            {/* Sliding Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="relative flex items-center bg-[#143d28]/5 rounded-full p-1 cursor-pointer hover:bg-[#143d28]/10 transition-colors border border-[#143d28]/5"
            >
              {/* The Sliding Background */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute h-8 w-[3.5rem] bg-[#143d28] rounded-full shadow-md z-0 ${language === 'ENG' ? 'left-1' : 'left-[calc(100%-3.75rem)]'}`}
              />

              {/* Option: ENG */}
              <div className={`relative z-10 px-4 py-1.5 text-xs font-bold transition-colors duration-300 ${language === 'ENG' ? 'text-white' : 'text-[#143d28]/60'}`}>
                ENG
              </div>

              {/* Option: HINDI */}
              <div className={`relative z-10 px-4 py-1.5 text-xs font-bold transition-colors duration-300 ${language !== 'ENG' ? 'text-white' : 'text-[#143d28]/60'}`}>
                हिंदी
              </div>
            </button>

            <div className="h-8 w-px bg-[#143d28]/10 mx-1"></div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogout}
              className="p-3 bg-white rounded-xl text-red-800/70 hover:text-red-600 hover:bg-red-50 border border-red-100 shadow-sm transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;