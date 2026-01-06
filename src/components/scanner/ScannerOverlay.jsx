import React from 'react';
import { motion } from 'framer-motion';

const ScannerOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      
      {/* --- 1. THE RADIAL FOCUS (The Eye) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_30%,_rgba(5,17,9,0.8)_100%)]" />
      
      {/* --- 2. THE BIOMETRIC TARGET --- */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96">
        
        {/* Breathing Outer Border */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border border-white/10 rounded-[3rem]"
        />

        {/* --- 3. MAGNETIC CORNERS (Fixed Animation) --- */}
        <div className="absolute inset-0">
          {[
            "top-0 left-0 border-t-4 border-l-4 rounded-tl-[2.5rem]",
            "top-0 right-0 border-t-4 border-r-4 rounded-tr-[2.5rem]",
            "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-[2.5rem]",
            "bottom-0 right-0 border-b-4 border-r-4 rounded-br-[2.5rem]"
          ].map((style, i) => (
            <motion.div
              key={i}
              animate={{ 
                borderColor: ["#4ade80", "#facc15", "#4ade80"], // Green to Sun-Yellow
                width: ["40px", "60px", "40px"],  // Changed from 'length' to 'width'
                height: ["40px", "60px", "40px"]  // Changed from 'length' to 'height'
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              className={`absolute border-green-400 ${style} shadow-[0_0_15px_rgba(74,222,128,0.3)]`}
            />
          ))}
        </div>
        
        {/* --- 4. THE FILAMENT SCAN (Biological Laser) --- */}
        <div className="absolute inset-4 overflow-hidden rounded-[2rem]">
          <motion.div 
            animate={{ 
              top: ["-10%", "110%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "circInOut" 
            }}
            className="absolute w-full h-[15%] bg-gradient-to-b from-transparent via-green-400/40 to-transparent"
          >
            {/* The bright leading edge */}
            <div className="absolute bottom-0 w-full h-[2px] bg-green-300 shadow-[0_0_20px_#4ade80]" />
          </motion.div>
        </div>

        {/* --- 5. TACTILE INSTRUCTIONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full flex justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full scale-150" />
            <div className="relative bg-[#FFFBF0]/10 backdrop-blur-xl px-8 py-3 rounded-2xl border border-white/20 flex flex-col items-center">
              <span className="text-[#FFFBF0] font-serif font-bold text-sm sm:text-lg tracking-wide">
                Center the Leaf
              </span>
              <span className="text-green-300/60 text-[10px] uppercase tracking-[0.2em] font-black mt-1">
                AI Alignment Active
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- 6. ENVIRONMENTAL DEPTH --- */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScannerOverlay;