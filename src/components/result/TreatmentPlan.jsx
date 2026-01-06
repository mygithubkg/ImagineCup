import { Droplet, Pill, ArrowRight, Sprout, ClipboardCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const TreatmentPlan = ({ treatment, dosage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-br from-[#1A4D2E] to-[#082012] rounded-[2.5rem] p-8 text-white shadow-2xl"
    >
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 pointer-events-none">
        <Sprout size={120} strokeWidth={1} />
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
          <ClipboardCheck className="text-green-400" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-black tracking-tight">Treatment Plan</h3>
          <p className="text-xs font-bold text-green-400/70 uppercase tracking-widest">Expert Recommendation</p>
        </div>
      </div>

      {/* --- THE MIXING LAB VISUALIZATION --- */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Medicine Input */}
          <div className="text-center group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-orange-900/40"
            >
              <Pill className="w-10 h-10 text-[#143d28]" />
            </motion.div>
            <p className="text-[10px] font-black uppercase tracking-widest text-green-300 mb-1">Concentrate</p>
            <p className="text-3xl font-serif font-black text-white">{dosage}</p>
            <p className="text-xs font-medium text-white/50 mt-1 max-w-[120px] mx-auto leading-tight">{treatment}</p>
          </div>

          {/* Connection Symbol */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-serif font-light text-white/20">+</div>
          </div>

          {/* Water Input */}
          <div className="text-center group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/40"
            >
              <Droplet className="w-10 h-10 text-white" />
            </motion.div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">Diluent</p>
            <p className="text-3xl font-serif font-black text-white">1 Liter</p>
            <p className="text-xs font-medium text-white/50 mt-1">Clean Water</p>
          </div>

          {/* Result Arrow */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="text-green-400" />
            </motion.div>
          </div>

          {/* Final Solution */}
          <div className="text-center bg-green-400/10 border border-green-400/20 rounded-3xl p-6 px-10">
            <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-1">Final Mix</p>
            <p className="text-xl font-bold text-white">Ready Spray</p>
          </div>
        </div>
      </div>

      {/* --- STEP-BY-STEP GUIDE --- */}
      <div className="space-y-4">
        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-green-400/50 mb-4">Application Guide</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { step: 1, text: `Stir ${dosage} into the water thoroughly.` },
            { step: 2, text: "Spray both tops and bottoms of leaves." },
            { step: 3, text: "Best results in early morning dew." },
            { step: 4, text: "Monitor and repeat in 7 days." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl font-serif font-black text-green-500/40">{item.step}</span>
              <p className="text-sm font-medium text-green-50 leading-snug">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TreatmentPlan;