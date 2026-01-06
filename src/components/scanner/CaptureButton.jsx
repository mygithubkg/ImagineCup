import { Camera, Image, Info } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CaptureButton = ({ onCapture, onGalleryClick, isCapturing }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 p-8 sm:p-12 pb-16">
      <div className="flex flex-col items-center gap-8">
        
        {/* Helper Text with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
        >
          <p className="text-[#FFFBF0] text-xs font-bold tracking-[0.2em] uppercase">
            {isCapturing ? "Sensing Biology..." : "Align leaf in center"}
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-10 sm:gap-16">
          
          {/* Gallery Button - Glassmorphism */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onGalleryClick}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all shadow-xl"
            disabled={isCapturing}
          >
            <Image size={24} strokeWidth={1.5} />
          </motion.button>

          {/* MAIN CAPTURE TRIGGER */}
          <div className="relative">
            {/* The Breathing Aura */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-15px] rounded-full border-2 border-white/30"
            />

            <motion.button
              onClick={onCapture}
              disabled={isCapturing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFFBF0] p-1 shadow-[0_0_50px_rgba(255,251,240,0.3)] isolate"
            >
              {/* Inner Interaction Ring */}
              <div className="w-full h-full rounded-full border-[6px] border-[#143d28]/10 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {isCapturing ? (
                    <motion.div 
                      key="capturing"
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      exit={{ y: -40 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div 
                        animate={{ height: [10, 30, 10] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 bg-green-600 rounded-full"
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Camera className="w-8 h-8 text-[#143d28]" strokeWidth={2} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Liquid Shutter Fill Effect (On Hover) */}
              <motion.div 
                className="absolute inset-0 bg-green-500/10 -z-10 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </motion.button>
          </div>

          {/* Info/Help Button - Symmetry & Utility */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all shadow-xl"
            disabled={isCapturing}
          >
            <Info size={24} strokeWidth={1.5} />
          </motion.button>

        </div>
      </div>
    </div>
  );
};

export default CaptureButton;