import { Volume2, VolumeX, AlertTriangle, Activity, BrainCircuit } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const DiagnosisCard = ({ disease, confidence, severity, audioText }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getSeverityStyle = () => {
    switch (severity) {
      case 'High':
        return {
          color: 'text-red-700',
          bg: 'bg-red-50',
          border: 'border-red-200',
          gauge: 'w-full bg-red-600',
          glow: 'shadow-red-900/10'
        };
      case 'Medium':
        return {
          color: 'text-orange-700',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          gauge: 'w-2/3 bg-orange-500',
          glow: 'shadow-orange-900/10'
        };
      default:
        return {
          color: 'text-yellow-700',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          gauge: 'w-1/3 bg-yellow-500',
          glow: 'shadow-yellow-900/10'
        };
    }
  };

  const style = getSeverityStyle();

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(audioText);
      utterance.lang = 'en-IN';
      utterance.rate = 0.85; // Slower for authoritative clarity
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden bg-white rounded-[2.5rem] p-8 border-2 ${style.border} ${style.glow} shadow-2xl`}
    >
      {/* Background Brain Circuit Icon (Subtle AI Branding) */}
      <div className="absolute -right-8 -top-8 text-gray-100 opacity-50 rotate-12">
        <BrainCircuit size={160} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-lg ${style.bg} ${style.color}`}>
              <AlertTriangle size={20} />
            </div>
            <span className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase">AI Diagnosis</span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-serif font-black mb-4 tracking-tight ${style.color}`}>
            {disease}
          </h2>

          {/* Analysis Metrics */}
          <div className="flex flex-wrap gap-4 items-center">
             {/* Confidence Meter */}
             <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <Activity size={16} className="text-green-600" />
                <span className="text-sm font-bold text-gray-600">{confidence}% Accuracy</span>
             </div>

             {/* Severity Gauge */}
             <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase">Severity</span>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: style.gauge.split(' ')[0] }}
                    className={`h-full ${style.gauge.split(' ')[1]}`}
                  />
                </div>
                <span className={`text-sm font-black ${style.color}`}>{severity}</span>
             </div>
          </div>
        </div>

        {/* --- DYNAMIC AUDIO BUTTON --- */}
        <div className="relative">
          <AnimatePresence>
            {isSpeaking && (
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-green-500 rounded-full"
              />
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isSpeaking ? stopSpeaking : handleSpeak}
            className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all shadow-xl z-10 ${
              isSpeaking ? 'bg-red-500 text-white' : 'bg-[#143d28] text-white hover:bg-green-800'
            }`}
          >
            {isSpeaking ? <VolumeX size={32} /> : <Volume2 size={32} />}
            <span className="text-[8px] font-black mt-1 tracking-tighter uppercase">
              {isSpeaking ? 'Stop' : 'Listen'}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Instructional Hint */}
      <div className="mt-8 flex items-center gap-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
        <div className="text-xl">💡</div>
        <p className="text-sm font-medium text-blue-900 leading-tight">
          Tap the <span className="font-bold">Listen</span> button to hear a detailed treatment guide in your regional language.
        </p>
      </div>
    </motion.div>
  );
};

export default DiagnosisCard;