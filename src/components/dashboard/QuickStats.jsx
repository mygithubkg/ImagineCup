import React from 'react';
import { ScanLine, Sprout, Activity, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, colorClass, bgClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`relative overflow-hidden rounded-[2rem] p-6 shadow-xl shadow-green-900/5 group border border-white/20 ${bgClass}`}
  >
    {/* --- Noise Texture (The tactile feel) --- */}
    <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-soft-light" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
    </div>

    {/* Background Blob Animation */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${colorClass.replace('text-', 'bg-')}`}></div>

    <div className="relative z-10 flex flex-col h-full justify-between">
      {/* Header: Icon & Trend */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-white/40 backdrop-blur-md ${colorClass}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {/* Decorative arrow showing 'Growth' */}
        <ArrowUpRight className="w-5 h-5 text-gray-400/50 group-hover:text-gray-600 transition-colors" />
      </div>

      {/* Data */}
      <div>
        <h3 className={`text-4xl font-serif font-black tracking-tight mb-1 ${colorClass}`}>
            {value}
        </h3>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500/80 group-hover:text-gray-700 transition-colors">
            {label}
        </p>
      </div>
    </div>
  </motion.div>
);

const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* 1. TOTAL SCANS (The Effort) - Earthy/Neutral */}
      <StatCard 
        label="Total Scans" 
        value={stats.totalScans} 
        icon={ScanLine} 
        colorClass="text-[#143d28]" 
        bgClass="bg-white"
        delay={0.1}
      />

      {/* 2. HEALTHY (The Goal) - Vibrant Green/Gold */}
      <StatCard 
        label="Healthy Crops" 
        value={stats.healthy} 
        icon={Sprout} 
        colorClass="text-green-700" 
        bgClass="bg-gradient-to-br from-green-50 to-emerald-100/50"
        delay={0.2}
      />

      {/* 3. TREATED (The Cure) - Healing Blue/Clay */}
      <StatCard 
        label="Issues Resolved" 
        value={stats.treated} 
        icon={Activity} 
        colorClass="text-blue-700" 
        bgClass="bg-gradient-to-br from-blue-50 to-indigo-100/50"
        delay={0.3}
      />
      
    </div>
  );
};

export default QuickStats;