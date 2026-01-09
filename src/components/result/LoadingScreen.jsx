import { Sprout, BrainCircuit, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import React from 'react';

const LoadingScreen = ({ status }) => {
  const [loadingText, setLoadingText] = useState(status || "Observing leaf patterns...");
  
  const messages = [
    "Reading leaf veins...",
    "Analyzing cellular health...",
    "Consulting Earth's intelligence...",
    "Identifying natural cures...",
    "Checking weather compatibility..."
  ];

  useEffect(() => {
    if (status) {
      setLoadingText(status);
      return;
    }
    
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingText(messages[i]);
    }, 800);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="fixed inset-0 bg-[#051109] flex flex-col items-center justify-center z-[100] overflow-hidden">
      
      {/* --- 1. BIOLOGICAL ATMOSPHERE --- */}
      {/* Floating particles mimicking pollen or spores */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-100, 100], 
              x: [Math.random() * 50, Math.random() * -50],
              opacity: [0, 1, 0] 
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* --- 2. THE CENTRAL "LIFE" LOADER --- */}
      <div className="relative flex items-center justify-center">
        {/* Expanding Aura */}
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [0.1, 0.05, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-40 h-40 bg-green-500 rounded-full blur-3xl"
        />
        
        {/* Rotating Geometric Grid (The "AI" part) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 border border-green-500/20 rounded-[2.5rem] rotate-45"
        />

        {/* The Sprout (The "Life" part) */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-green-600 to-green-900 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden">
          <motion.div
            animate={{ y: [20, -5, 0], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-yellow-400"
          >
            <Sprout size={48} strokeWidth={1.5} />
          </motion.div>
          
          {/* Liquid Scanning Bar */}
          <motion.div 
            animate={{ top: ["100%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-0 right-0 h-1/2 bg-white/10 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* --- 3. THE ANALYTICAL FEEDBACK --- */}
      <div className="mt-16 text-center space-y-6 relative z-10 px-6">
        <div className="flex flex-col items-center">
            <motion.div 
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-green-100/80 font-serif text-2xl font-bold tracking-tight"
            >
              <BrainCircuit size={24} className="text-yellow-400" />
              {loadingText}
            </motion.div>
            
            <p className="mt-4 text-[10px] text-green-500 font-black uppercase tracking-[0.4em] opacity-50">
                Neural Analysis in Progress
            </p>
        </div>

        {/* Progress Filament */}
        <div className="w-48 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
          <motion.div 
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-1/2 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          />
        </div>
      </div>

      {/* Footer Connectivity Note */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 flex items-center gap-2"
      >
        <Zap size={14} className="text-yellow-500 fill-yellow-500" />
        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
            Edge Intelligence Active • No Internet Required
        </span>
      </motion.div>

    </div>
  );
};

export default LoadingScreen;