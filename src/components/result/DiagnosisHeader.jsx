import { AlertOctagon, CheckCircle, Target, Sparkles, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const DiagnosisHeader = ({ capturedImage, severity }) => {
  const isHealthy = severity === 'Low' || severity === 'Healthy';

  return (
    <div className="relative w-full px-4 sm:px-6">
      {/* Container with Organic Shadow */}
      <div className="relative w-full h-[300px] sm:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#143d28]/20 border-4 border-white">
        
        {/* --- 1. THE CAPTURED IMAGE --- */}
        {capturedImage ? (
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={capturedImage} 
            alt="Scanned specimen" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#051109] flex flex-col items-center justify-center text-green-800/40">
            <Sprout size={48} className="mb-2 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">No Specimen Data</span>
          </div>
        )}

        {/* --- 2. THE AI "LENS" OVERLAY --- */}
        {/* Subtle grid to show the AI's "thought process" */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Vignette to focus on center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />

        {/* --- 3. STATUS BADGE (Floating Jade/Terracotta) --- */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 right-6"
        >
          <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl border ${
            isHealthy 
              ? 'bg-green-600/80 text-white border-green-400/30' 
              : 'bg-red-700/80 text-white border-red-400/30'
          }`}>
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {isHealthy ? <CheckCircle className="w-5 h-5" /> : <AlertOctagon className="w-5 h-5" />}
            </motion.div>
            <span className="font-black text-xs uppercase tracking-[0.15em]">
                {isHealthy ? 'Specimen Healthy' : 'Action Required'}
            </span>
          </div>
        </motion.div>

        {/* --- 4. DATA FILAMENT (Bottom Confidence Bar) --- */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-green-400">
                <Target size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Scan Precision</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                   />
                </div>
                <span className="text-white font-serif font-bold text-xl leading-none">94%</span>
              </div>
            </div>

            {/* AI Sparkle Icon */}
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-yellow-400">
                <Sparkles size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Label below the image */}
      <div className="mt-4 flex justify-between items-center px-2">
         <span className="text-[10px] font-bold text-[#143d28]/30 uppercase tracking-[0.3em]">Specimen Ref: LH-8829</span>
         <div className="flex gap-1">
            <div className="w-1 h-1 bg-yellow-500 rounded-full" />
            <div className="w-1 h-1 bg-yellow-500 rounded-full opacity-40" />
            <div className="w-1 h-1 bg-yellow-500 rounded-full opacity-10" />
         </div>
      </div>
    </div>
  );
};

export default DiagnosisHeader;