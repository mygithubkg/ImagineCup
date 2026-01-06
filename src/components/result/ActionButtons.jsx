import { MapPin, Save, Camera, Store, Heart, RotateCcw } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const ActionButtons = ({ onFindShop, onSaveToHistory, onScanAgain }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="max-w-xl mx-auto bg-[#143d28]/90 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(20,61,40,0.3)] border border-white/10 pointer-events-auto"
      >
        <div className="flex flex-col gap-3">
          
          {/* --- PRIMARY ACTION: The Solution Path --- */}
          <motion.button
            onClick={onFindShop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full overflow-hidden bg-yellow-400 hover:bg-yellow-300 text-[#143d28] font-black py-5 rounded-[1.8rem] flex items-center justify-center gap-3 transition-colors shadow-xl"
          >
            {/* Animated Shine Effect */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 -skew-x-12"
            />
            
            <Store className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span className="text-lg tracking-tight">Find Cure at Nearby Shop</span>
          </motion.button>

          {/* --- SECONDARY ACTIONS: The Tools --- */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={onSaveToHistory}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all"
            >
              <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
              <span>Save Record</span>
            </motion.button>
            
            <motion.button
              onClick={onScanAgain}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Scan Another</span>
            </motion.button>
          </div>
          
        </div>

        {/* Floating Indicator */}
        <div className="flex justify-center mt-3">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default ActionButtons;