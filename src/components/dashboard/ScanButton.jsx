import { Camera, Scan, Sparkles } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const ScanButton = ({ onScan }) => {
  return (
    <div className="relative w-full group">
      <motion.button
        onClick={onScan}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.96, y: 2 }}
        className="relative w-full overflow-hidden rounded-[3rem] bg-[#143d28] text-[#FFFBF0] shadow-2xl shadow-green-900/30 p-8 sm:p-10 flex flex-col items-center justify-center text-center isolate"
      >
        {/* --- 1. ATMOSPHERE LAYERS --- */}
        
        {/* Noise Texture (Soil/Paper feel) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
        </div>

        {/* The "Breathing" Glow Background */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-t from-green-800 to-transparent opacity-40 -z-10"
        />

        {/* --- 2. THE LENS (Icon) --- */}
        <div className="relative mb-6">
          {/* Rotating Focus Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-12px] border-2 border-dashed border-green-400/30 rounded-full"
          />
          
          {/* Inner Glowing Ring */}
          <div className="absolute inset-[-4px] bg-green-500/20 rounded-full blur-md group-hover:bg-green-400/40 transition-colors duration-500"></div>

          {/* Main Icon Container */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-[#1f5e41] to-[#0f2e1e] rounded-full flex items-center justify-center border border-green-400/20 shadow-inner group-hover:scale-110 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)">
             <Camera className="w-10 h-10 text-[#FFFBF0]" strokeWidth={1.5} />
             
             {/* The "Scanner" Line Animation inside the lens */}
             <motion.div 
                animate={{ height: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-full bg-green-400/20 top-0 border-b border-green-400/50"
             />
          </div>

          {/* Floating Sparkles (AI Magic) */}
          <motion.div 
            animate={{ opacity: [0, 1, 0], y: -10 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-2 -right-2 text-yellow-300"
          >
            <Sparkles size={20} fill="currentColor" />
          </motion.div>
        </div>

        {/* --- 3. TYPOGRAPHY --- */}
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBF0] to-green-100">
            Scan New Plant
          </h2>
          <div className="flex items-center justify-center gap-2 text-green-200/70 text-sm sm:text-base font-medium">
             <Scan size={16} />
             <span>AI Diagnosis ready</span>
          </div>
        </div>

        {/* --- 4. SHINE EFFECT (On Hover) --- */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      </motion.button>
    </div>
  );
};

export default ScanButton;