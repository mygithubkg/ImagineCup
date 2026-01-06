import { CloudRain, Sun, CheckCircle, AlertTriangle, Wind, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const WeatherBanner = ({ isSafeToSpray, weatherInfo }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative overflow-hidden rounded-[2.5rem] p-8 border-2 transition-all duration-700 ${
        isSafeToSpray 
          ? 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-200 text-white shadow-xl shadow-blue-900/10' 
          : 'bg-gradient-to-br from-[#2D3436] to-[#000000] border-gray-700 text-white shadow-xl shadow-black/30'
      }`}
    >
      {/* --- BACKGROUND ATMOSPHERE --- */}
      {isSafeToSpray ? (
        /* Clear Sky Glow */
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/30 rounded-full blur-3xl"
        />
      ) : (
        /* Storm Clouds Texture */
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        
        {/* ICON CIRCLE */}
        <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center flex-shrink-0 backdrop-blur-xl border-2 ${
          isSafeToSpray ? 'bg-white/20 border-white/30' : 'bg-orange-500/20 border-orange-500/30'
        }`}>
          {isSafeToSpray ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Sun className="w-10 h-10 text-yellow-300" strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <CloudRain className="w-10 h-10 text-orange-400" strokeWidth={1.5} />
            </motion.div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            {isSafeToSpray ? (
              <CheckCircle size={16} className="text-blue-200" />
            ) : (
              <AlertTriangle size={16} className="text-orange-400" />
            )}
            <h4 className="text-xs font-black uppercase tracking-[0.3em] opacity-80">
                Weather Sentry
            </h4>
          </div>
          
          <h3 className="text-2xl font-serif font-black mb-1 leading-tight">
            {isSafeToSpray ? 'Optimal Spray Window' : 'Risk of Wash-off'}
          </h3>
          
          <p className="text-sm font-medium opacity-70 mb-4 max-w-sm">
            {weatherInfo}
          </p>

          {/* DYNAMIC ADVISORY */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-widest ${
            isSafeToSpray ? 'bg-white/10 border-white/20 text-blue-100' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
          }`}>
             {isSafeToSpray ? <Timer size={14} /> : <Wind size={14} />}
             {isSafeToSpray ? 'Spray safe for next 12h' : 'Save medicine - delay spray'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherBanner;