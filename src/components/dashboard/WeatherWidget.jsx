import { CloudRain, AlertTriangle, Wind, Droplets, MapPin } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const WeatherWidget = ({ weatherData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white shadow-2xl shadow-teal-900/20 group h-full"
    >
      {/* --- 1. ATMOSPHERIC BACKGROUND --- */}
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Drifting Clouds/Fog Animation */}
      <motion.div 
        animate={{ x: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-[50px]"
      />
      <motion.div 
        animate={{ x: [20, -20, 20], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-[60px]"
      />

      {/* --- 2. MAIN CONTENT --- */}
      <div className="relative z-10 p-8 flex flex-col h-full justify-between">
        
        {/* Header: Location & Icon */}
        <div className="flex justify-between items-start">
           <div>
              <div className="flex items-center space-x-2 text-teal-100/80 mb-1">
                 <MapPin size={14} />
                 <span className="text-xs font-bold uppercase tracking-widest">Ghaziabad</span>
              </div>
              <div className="flex items-center gap-3">
                 <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <CloudRain className="w-10 h-10 text-teal-200" />
                 </motion.div>
                 <span className="text-lg font-medium text-teal-50">{weatherData.condition}</span>
              </div>
           </div>
           
           {/* Vertical "Pill" for Date or Time could go here */}
           <div className="text-right">
             <div className="text-5xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-teal-200">
               {weatherData.temperature}°
             </div>
           </div>
        </div>

        {/* Secondary Metrics (Humidity/Wind) - Visual Filler */}
        <div className="flex gap-4 my-6 text-teal-200/60 text-xs font-medium">
           <div className="flex items-center gap-1">
              <Droplets size={14} />
              <span>84% Humidity</span>
           </div>
           <div className="flex items-center gap-1">
              <Wind size={14} />
              <span>12km/h NW</span>
           </div>
        </div>

        {/* --- 3. INTELLIGENT ALERT (The "Field Note") --- */}
        <div className="relative mt-auto">
          {/* The "Glass" Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg text-yellow-300 animate-pulse">
                 <AlertTriangle size={18} />
              </div>
              <div>
                 <div className="text-xs font-bold text-yellow-300 uppercase tracking-wide mb-1">
                    Farming Advisory
                 </div>
                 <p className="text-sm font-medium leading-relaxed text-teal-50">
                    {weatherData.alert}
                 </p>
              </div>
            </div>
            
            {/* Decoration: Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/20 rotate-1 backdrop-blur-sm"></div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default WeatherWidget;