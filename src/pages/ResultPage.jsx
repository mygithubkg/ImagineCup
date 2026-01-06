import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ShieldAlert, HeartPulse, Info, Store, History, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

// Component Imports
import LoadingScreen from '../components/result/LoadingScreen';
import DiagnosisHeader from '../components/result/DiagnosisHeader';
import DiagnosisCard from '../components/result/DiagnosisCard';
import TreatmentPlan from '../components/result/TreatmentPlan';
import WeatherBanner from '../components/result/WeatherBanner';
import ActionButtons from '../components/result/ActionButtons';

const ResultPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  const resultData = {
    disease: 'Tomato Early Blight',
    confidence: 94,
    severity: 'High',
    treatment: 'Mancozeb 75% WP',
    dosage: '2.5g per Liter',
    weatherSafe: true,
    weatherInfo: 'No rain for 48 hours. Safe to spray.',
    audioText: 'Early Blight detected. Mix 2.5 grams of Mancozeb in one liter of water.'
  };

  useEffect(() => {
    const image = localStorage.getItem('capturedImage');
    if (!image) {
      navigate('/scan', { replace: true });
      return;
    }
    setCapturedImage(image);

    // Simulate AI "Deep Thinking"
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleFindShop = () => {
    const searchQuery = encodeURIComponent(`${resultData.treatment} agricultural store near me`);
    window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank');
  };

  const handleSaveToHistory = () => {
    const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
    const newScan = { id: Date.now(), ...resultData, date: new Date().toISOString(), image: capturedImage };
    history.unshift(newScan);
    localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 20)));
    alert('Scan rooted in history!');
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#FFFBF0] pb-44 selection:bg-green-100">
      
      {/* --- TOP NAVIGATION (The "Safety Valve") --- */}
      <nav className="sticky top-0 z-50 bg-[#FFFBF0]/80 backdrop-blur-md border-b border-[#143d28]/5 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[#143d28] font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={18} />
            Back to Field
          </motion.button>
          <div className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-black">
             <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
             AI VERIFIED
          </div>
        </div>
      </nav>

      {/* --- DIAGNOSIS HEADER: The Focus --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DiagnosisHeader 
          capturedImage={capturedImage}
          severity={resultData.severity}
        />
      </motion.div>

      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
        
        {/* --- MAIN CARD: The Result --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <DiagnosisCard 
            disease={resultData.disease}
            confidence={resultData.confidence}
            severity={resultData.severity}
            audioText={resultData.audioText}
          />
        </motion.div>

        {/* --- TREATMENT & WEATHER: The Action --- */}
        <div className="grid md:grid-cols-1 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
          >
            <TreatmentPlan 
              treatment={resultData.treatment}
              dosage={resultData.dosage}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.5 }}
          >
            <WeatherBanner 
              isSafeToSpray={resultData.weatherSafe}
              weatherInfo={resultData.weatherInfo}
            />
          </motion.div>
        </div>

        {/* --- SAFETY PRECAUTIONS: The "Wise Counsel" --- */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-[#92400e]/5 border border-[#92400e]/10 rounded-[2rem] p-8 relative overflow-hidden"
        >
          {/* Subtle Warning Pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[#92400e]">
             <ShieldAlert size={80} strokeWidth={1} />
          </div>

          <h4 className="font-serif font-black text-xl text-[#92400e] mb-6 flex items-center gap-3">
            <ShieldAlert size={24} />
            Safety for You & The Soil
          </h4>
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              "Wear protective gloves & mask",
              "Keep children & pets away",
              "Wash hands after handling",
              "Avoid spraying in high wind"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#92400e]/80">
                <div className="w-1.5 h-1.5 bg-[#92400e] rounded-full" />
                {text}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* --- SUPPORT HUB --- */}
        <div className="bg-white rounded-[2rem] p-8 border border-[#143d28]/5 shadow-xl shadow-[#143d28]/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif font-black text-2xl text-[#143d28] mb-1">Need a second opinion?</h4>
            <p className="text-[#143d28]/60 text-sm font-medium">Our agricultural experts are standing by.</p>
          </div>
          <button className="bg-[#143d28] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-900/20 hover:scale-105 transition-transform">
             Call Expert Now
          </button>
        </div>

      </main>

      {/* --- PERSISTENT FOOTER ACTIONS --- */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-40">
        <div className="max-w-4xl mx-auto">
           <ActionButtons 
            onFindShop={handleFindShop}
            onSaveToHistory={handleSaveToHistory}
            onScanAgain={() => {
              localStorage.removeItem('capturedImage');
              navigate('/scan');
            }}
          />
        </div>
      </div>
      
    </div>
  );
};

export default ResultPage;