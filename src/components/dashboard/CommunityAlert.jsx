import React from 'react';
import { AlertTriangle, ArrowRight, MapPin, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const CommunityAlert = ({ communityAlert, onCheckFarm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-700 via-red-800 to-red-900 text-[#FFFBF0] shadow-2xl shadow-red-900/20 group"
    >
      {/* --- 1. ORGANIC TEXTURE & BACKGROUND FX --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* The "Radar" Pulse Animation (Visualizing proximity) */}
      <div className="absolute -right-10 -top-10">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "easeOut" 
            }}
            className="absolute inset-0 w-32 h-32 rounded-full border border-orange-400/30"
          />
        ))}
      </div>

      {/* --- 2. CONTENT LAYER --- */}
      <div className="relative z-10 p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3 bg-red-950/30 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <AlertTriangle className="w-5 h-5 text-orange-400 fill-orange-400/20" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-200">Community Alert</span>
          </div>
          
          {/* Distance Indicator */}
          <div className="flex flex-col items-end">
            <span className="text-3xl font-black font-serif leading-none">{communityAlert.distance}</span>
            <span className="text-xs text-orange-200/60 uppercase tracking-wide">Distance</span>
          </div>
        </div>
        
        {/* Main Message */}
        <div className="mb-8">
          <h3 className="text-3xl font-serif font-bold leading-tight mb-2">
            {communityAlert.disease}
          </h3>
          <div className="flex items-center gap-2 text-orange-100/80 text-sm font-medium">
             <MapPin size={16} />
             <span>Detected in <strong>{communityAlert.farms} neighboring farms</strong></span>
          </div>
          <div className="flex items-center gap-2 text-orange-100/60 text-xs mt-1 ml-6">
             <Wind size={14} />
             <span>Wind direction puts your crop at risk</span>
          </div>
        </div>
        
        {/* --- 3. MAGNETIC ACTION BUTTON --- */}
        <motion.button
          onClick={onCheckFarm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative overflow-hidden group/btn bg-[#FFFBF0] text-red-900 rounded-xl px-6 py-4 font-bold text-lg shadow-lg flex items-center justify-between"
        >
          <span className="relative z-10 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            Scan My Farm Now
          </span>
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={20} className="relative z-10 text-red-900" />
          </motion.div>

          {/* Hover Fill Effect */}
          <div className="absolute inset-0 bg-orange-100 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>

    </motion.div>
  );
};

export default CommunityAlert;