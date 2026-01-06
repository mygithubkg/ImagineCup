import { AlertTriangle, CameraOff, ArrowLeft, RefreshCw, Settings } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const CameraError = ({ onRequestPermission, onGoBack }) => {
  return (
    <div className="absolute inset-0 bg-[#051109]/95 backdrop-blur-xl flex items-center justify-center z-50 p-6">
      
      {/* Organic Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Animated Icon Header */}
        <div className="relative mb-8">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl"
          />
          <div className="relative w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br from-amber-600 to-red-800 flex items-center justify-center shadow-2xl border border-white/10">
            <CameraOff className="w-10 h-10 text-[#FFFBF0]" />
          </div>
        </div>
        
        {/* Typography */}
        <div className="space-y-3 mb-10">
          <h2 className="text-3xl font-serif font-black text-[#FFFBF0] tracking-tight">
            We can't see the leaf yet.
          </h2>
          <p className="text-amber-100/60 leading-relaxed font-medium">
            Your camera is currently locked. To help your plants, we need your permission to use the lens.
          </p>
        </div>

        {/* Action Stack */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestPermission}
            className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-green-600 text-white font-bold rounded-2xl shadow-xl shadow-green-900/40 hover:bg-green-500 transition-all border border-green-400/20"
          >
            <RefreshCw className="w-5 h-5" />
            Try Granting Access
          </motion.button>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGoBack}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/5 backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </motion.button>

            <a 
              href="chrome://settings/content/camera" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-amber-500/10 text-amber-200 font-bold rounded-2xl hover:bg-amber-500/20 transition-all border border-amber-500/20"
            >
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </div>
        </div>

        {/* Footer Hint */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-2 text-xs text-amber-200/40 font-bold uppercase tracking-widest"
        >
            <div className="w-4 h-[1px] bg-amber-200/20" />
            <span>Browser Blocked the Request</span>
            <div className="w-4 h-[1px] bg-amber-200/20" />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default CameraError;