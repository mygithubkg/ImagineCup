import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ShieldAlert, HeartPulse, Info, Store, History, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { getAnalysisResult } from '../utils/blobStorage';

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
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [pollingStatus, setPollingStatus] = useState('Initializing analysis...');

  // Mock data for when Azure is not configured
  const mockResultData = {
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

    const filename = localStorage.getItem('analysisFilename');
    const isMockMode = localStorage.getItem('mockMode') === 'true';
    
    if (isMockMode || !filename) {
      // Use mock data when Azure is not configured
      console.log('👨 Using mock analysis data');
      setPollingStatus('Analyzing with AI (Demo Mode)...');
      const timer = setTimeout(() => {
        setResultData(mockResultData);
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    // Poll for Azure analysis results
    pollForResults(filename);
  }, [navigate]);

  const pollForResults = async (filename) => {
    const maxAttempts = 60; // 60 seconds max (adjust based on your Azure Function processing time)
    let attempts = 0;

    const poll = async () => {
      try {
        setPollingStatus(`Analyzing image... (${attempts + 1}s)`);
        
        const response = await getAnalysisResult(filename);
        
        if (response.status === 'complete' && response.data) {
          // Map Azure response to UI format
          const azureData = response.data;
          
          setResultData({
            disease: azureData.disease_name || azureData.disease || 'Unknown Disease',
            confidence: Math.round((azureData.confidence || 0) * 100),
            severity: azureData.severity || 'Medium',
            treatment: azureData.recommended_treatment || azureData.treatment || 'Consult expert',
            dosage: azureData.dosage || 'As recommended',
            weatherSafe: azureData.weather_safe !== false,
            weatherInfo: azureData.weather_info || 'Check local weather conditions',
            audioText: azureData.treatment_audio_text || azureData.audio_text || ''
          });
          
          setIsLoading(false);
          localStorage.removeItem('analysisFilename');
          
          console.log('✅ Analysis complete:', response.data);
        } else if (response.status === 'processing') {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 1000); // Poll every second
          } else {
            setError('Analysis is taking longer than expected. The system may be processing a large queue.');
            setIsLoading(false);
          }
        } else if (response.status === 'error') {
          setError(response.message || 'Analysis failed. Please try again.');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('❌ Polling error:', err);
        attempts++;
        
        if (attempts < maxAttempts) {
          // Retry on network errors
          setTimeout(poll, 2000);
        } else {
          setError('Unable to retrieve analysis results. Please check your connection and try again.');
          setIsLoading(false);
        }
      }
    };

    poll();
  };

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

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldAlert className="text-red-600" size={40} />
          </div>
          <h2 className="text-2xl font-serif font-black text-[#143d28] mb-4">Analysis Unavailable</h2>
          <p className="text-[#143d28]/60 text-sm mb-8">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                localStorage.removeItem('capturedImage');
                localStorage.removeItem('analysisFilename');
                navigate('/scan');
              }}
              className="px-6 py-3 bg-[#143d28] text-white rounded-xl font-bold hover:bg-[#143d28]/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-white text-[#143d28] border-2 border-[#143d28] rounded-xl font-bold hover:bg-[#143d28]/5 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingScreen status={pollingStatus} />;

  if (!resultData) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center">
        <p className="text-[#143d28]">Loading results...</p>
      </div>
    );
  }

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