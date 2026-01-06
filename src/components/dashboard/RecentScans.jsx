import React from 'react';
import { History, Camera, ChevronRight, Sprout, AlertOctagon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ScanItem = ({ scan, index }) => {
  const isHealthy = scan.status === 'Healthy';
  
  // Dynamic Styles based on health
  const statusConfig = isHealthy 
    ? {
        bg: 'bg-green-50 hover:bg-green-100',
        border: 'border-green-100 hover:border-green-200',
        iconBg: 'bg-green-500',
        iconColor: 'text-white',
        Icon: Sprout,
        text: 'text-green-800'
      }
    : {
        bg: 'bg-orange-50 hover:bg-orange-100',
        border: 'border-orange-100 hover:border-orange-200',
        iconBg: 'bg-orange-500',
        iconColor: 'text-white',
        Icon: AlertOctagon,
        text: 'text-orange-800'
      };

  const StatusIcon = statusConfig.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${statusConfig.bg} ${statusConfig.border}`}
    >
      {/* Icon Container */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${statusConfig.iconBg} ${statusConfig.iconColor}`}>
        <StatusIcon size={22} strokeWidth={2.5} />
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif font-bold text-gray-900 text-lg leading-tight">
          {scan.crop}
        </h4>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className={`font-bold uppercase tracking-wider text-xs px-2 py-0.5 rounded-full bg-white/60 ${statusConfig.text}`}>
            {scan.status}
          </span>
          <span className="text-gray-400 text-[10px]">•</span>
          <div className="flex items-center text-gray-500 font-medium">
            <Clock size={12} className="mr-1" />
            {scan.time}
          </div>
        </div>
      </div>

      {/* Action Arrow */}
      <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-gray-400 group-hover:text-[#143d28] group-hover:bg-white transition-all">
        <ChevronRight size={18} />
      </div>
    </motion.div>
  );
};

const RecentScans = ({ recentScans, onViewAll }) => {
  return (
    <div className="relative bg-white rounded-[2.5rem] shadow-xl shadow-green-900/5 p-8 border border-gray-100 overflow-hidden h-full flex flex-col">
       
       {/* Noise Texture */}
       <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-multiply" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }}>
       </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#143d28]/5 p-2.5 rounded-xl text-[#143d28]">
            <History className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-black text-[#143d28]">Field Journal</h2>
        </div>
        
        <motion.button
          onClick={onViewAll}
          whileHover={{ x: 3 }}
          className="group flex items-center gap-1 text-sm font-bold text-[#143d28] hover:text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* List Container */}
      <div className="relative z-10 space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {recentScans.length > 0 ? (
          recentScans.map((scan, index) => (
            <ScanItem key={scan.id || index} scan={scan} index={index} />
          ))
        ) : (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-60">
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gray-100 p-6 rounded-full mb-4"
            >
                <Camera className="w-10 h-10 text-gray-400" />
            </motion.div>
            <p className="font-serif text-lg text-gray-600 mb-1">Your journal is empty.</p>
            <p className="text-sm text-gray-400">Scan your first crop to start tracking.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentScans;