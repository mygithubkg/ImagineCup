import { ArrowLeft, Zap, ZapOff, Sun } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScannerControls = ({ onBack, flashOn, onToggleFlash }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-10 pointer-events-none">
      <div className="flex items-center justify-between pointer-events-auto">
        
        {/* --- BACK BUTTON: The "Return to Roots" --- */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-14 h-14 rounded-2xl bg-[#143d28]/40 backdrop-blur-xl flex items-center justify-center text-[#FFFBF0] border border-white/10 shadow-2xl transition-colors hover:bg-[#143d28]/60"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
        </motion.button>

        {/* --- CENTER TITLE: Contextual Label --- */}
        <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden sm:flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
        >
            <Sun size={14} className="text-yellow-400 animate-pulse" />
            <span className="text-[10px] text-white font-bold tracking-[0.2em] uppercase">Biological Scanner</span>
        </motion.div>

        {/* --- FLASH TOGGLE: The "Artificial Sun" --- */}
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleFlash}
          className={`w-14 h-14 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-500 border shadow-2xl overflow-hidden relative
            ${flashOn 
              ? 'bg-yellow-400 text-[#143d28] border-yellow-300' 
              : 'bg-[#143d28]/40 text-[#FFFBF0] border-white/10 hover:bg-[#143d28]/60'
            }`}
        >
          {/* Internal Glow for Flash On */}
          <AnimatePresence>
            {flashOn && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-white opacity-50"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">
            {flashOn ? (
              <Zap className="w-6 h-6 fill-current" strokeWidth={2.5} />
            ) : (
              <ZapOff className="w-6 h-6 opacity-70" strokeWidth={2.5} />
            )}
          </div>
        </motion.button>
        
      </div>
    </div>
  );
};

export default ScannerControls;