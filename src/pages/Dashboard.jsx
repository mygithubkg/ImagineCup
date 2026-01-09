import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout } from 'lucide-react';

// Component Imports
import DashboardHeader from '../components/dashboard/DashboardHeader';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import CommunityAlert from '../components/dashboard/CommunityAlert';
import ScanButton from '../components/dashboard/ScanButton';
import RecentScans from '../components/dashboard/RecentScans';
import QuickStats from '../components/dashboard/QuickStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('ENG');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    const savedLanguage = localStorage.getItem('appLanguage') || 'ENG';
    setLanguage(savedLanguage);
  }, [navigate]);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ENG' ? 'हिंदी' : 'ENG';
    setLanguage(newLanguage);
    localStorage.setItem('appLanguage', newLanguage);
  };

  // --- MOCK DATA ---
  const weatherData = {
    temperature: 28,
    condition: language === 'ENG' ? 'Humid' : 'आर्द्र',
    alert: language === 'ENG' 
      ? 'Rain expected in 2 hours. Do NOT spray medicine now.'
      : '2 घंटे में बारिश की उम्मीद है। अभी दवा का छिड़काव न करें।'
  };

  const communityAlert = {
    disease: language === 'ENG' ? 'Early Blight' : 'अर्ली ब्लाइट',
    distance: '2km',
    farms: 5
  };

  const recentScans = [
    { 
      id: 1, 
      crop: language === 'ENG' ? 'Tomato Leaf' : 'टमाटर की पत्ती', 
      status: language === 'ENG' ? 'Healthy' : 'स्वस्वस्थ', 
      time: language === 'ENG' ? '2 hrs ago' : '2 घंटे पहले', 
      color: 'text-green-600' 
    },
    { 
      id: 2, 
      crop: language === 'ENG' ? 'Potato Leaf' : 'आलू की पत्ती', 
      status: language === 'ENG' ? 'Late Blight' : 'लेट ब्लाइट', 
      time: language === 'ENG' ? 'Yesterday' : 'कल', 
      color: 'text-orange-600' 
    }
  ];

  const stats = {
    totalScans: 24,
    healthy: 18,
    treated: 6
  };

  if (!user) return null;

  // Animation Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden pb-12">
      {/* Background Living Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' fill='%23143d28' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      </div>

      <DashboardHeader 
        user={user}
        language={language}
        onToggleLanguage={toggleLanguage}
        onLogout={handleLogout}
      />

      {/* Demo Mode Banner */}
      {user.type === 'guest' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-4 shadow-lg border-2 border-yellow-600/20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-600 text-white p-2 rounded-lg">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-900">
                    {language === 'ENG' ? 'Demo Mode Active' : 'डेमो मोड सक्रिय'}
                  </h3>
                  <p className="text-sm text-yellow-800">
                    {language === 'ENG' 
                      ? 'You\'re exploring LivingHarvest without authentication. Create an account to save your scans!' 
                      : 'आप बिना प्रमाणीकरण के LivingHarvest का उपयोग कर रहे हैं। अपने स्कैन सहेजने के लिए खाता बनाएं!'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:flex items-center gap-2 bg-yellow-900 text-yellow-50 px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-800 transition-colors whitespace-nowrap"
              >
                {language === 'ENG' ? 'Sign Up' : 'साइन अप करें'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"
      >
        
        {/* TOP ROW: Vital Signs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Weather Widget (Spans 7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 h-full">
            <WeatherWidget weatherData={weatherData} />
          </motion.div>

          {/* Community Alert (Spans 5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 h-full">
            <CommunityAlert 
              communityAlert={communityAlert}
              onCheckFarm={() => navigate('/scan')}
            />
          </motion.div>
        </div>

        {/* MIDDLE ROW: Primary Action */}
        <motion.div variants={itemVariants} className="mb-8">
          <ScanButton onScan={() => navigate('/scan')} />
        </motion.div>

        {/* BOTTOM SECTION: Journal & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recent Scans (Spans 8 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <RecentScans 
              recentScans={recentScans}
              onViewAll={() => navigate('/history')}
            />
          </motion.div>

          {/* Quick Stats (Spans 4 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#143d28] rounded-[2.5rem] p-8 text-white flex-1 relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-xl font-serif font-bold mb-2">Farm Productivity</h3>
                    <p className="text-green-200/60 text-sm mb-6">Your seasonal health overview</p>
                    <QuickStats stats={stats} />
                </div>
                {/* Decorative Sprout Background Icon */}
                <div className="absolute -right-8 -bottom-8 text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-700">
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m7 2 10 20"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4Z"/></svg>
                </div>
            </div>
          </motion.div>
          
        </div>

        {/* Dynamic Disconnect Message (The "Human" Touch) */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center border-t border-[#143d28]/10 pt-12"
        >
            <p className="text-[#143d28]/40 font-serif italic text-lg">
                "The farmer is the only person in our economy who buys everything at retail, <br className="hidden md:block"/>
                sells everything at wholesale, and pays the freight both ways."
            </p>
            <div className="flex justify-center mt-6">
                <div className="w-1 h-1 rounded-full bg-yellow-500 mx-1"></div>
                <div className="w-1 h-1 rounded-full bg-yellow-500 mx-1"></div>
                <div className="w-1 h-1 rounded-full bg-yellow-500 mx-1"></div>
            </div>
        </motion.div>

      </motion.main>
    </div>
  );
};

export default Dashboard;