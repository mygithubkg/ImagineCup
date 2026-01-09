import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Camera, Calendar, Sprout } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import React from 'react';
import { motion } from 'framer-motion';
const HistoryPage = () => {
  const navigate = useNavigate();
  const [scanHistory, setScanHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('ENG');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Load scan history
    const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
    setScanHistory(history);

    // Load language
    const savedLanguage = localStorage.getItem('appLanguage') || 'ENG';
    setLanguage(savedLanguage);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ENG' ? 'हिंदी' : 'ENG';
    setLanguage(newLanguage);
    localStorage.setItem('appLanguage', newLanguage);
  };

  const handleDeleteAll = () => {
    if (window.confirm(language === 'ENG' 
      ? 'Are you sure you want to delete all history?' 
      : 'क्या आप वाकई सभी इतिहास को हटाना चाहते हैं?')) {
      localStorage.removeItem('scanHistory');
      setScanHistory([]);
    }
  };

  const handleDeleteItem = (id) => {
    const updatedHistory = scanHistory.filter(scan => scan.id !== id);
    localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
    setScanHistory(updatedHistory);
  };

  const handleViewDetails = (scan) => {
    // Store the scan data and navigate to result page
    localStorage.setItem('capturedImage', scan.image);
    navigate('/result');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays === 0) {
      if (diffHours === 0) {
        return language === 'ENG' ? 'Just now' : 'अभी';
      }
      return language === 'ENG' ? `${diffHours} hrs ago` : `${diffHours} घंटे पहले`;
    } else if (diffDays === 1) {
      return language === 'ENG' ? 'Yesterday' : 'कल';
    } else if (diffDays < 7) {
      return language === 'ENG' ? `${diffDays} days ago` : `${diffDays} दिन पहले`;
    } else {
      return date.toLocaleDateString(language === 'ENG' ? 'en-IN' : 'hi-IN');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-orange-600 bg-orange-50';
      case 'Low':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
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
                    {language === 'ENG' ? 'Demo Mode - History Not Saved' : 'डेमो मोड - इतिहास सहेजा नहीं गया'}
                  </h3>
                  <p className="text-sm text-yellow-800">
                    {language === 'ENG' 
                      ? 'Sign up to save your scan history permanently!' 
                      : 'अपने स्कैन इतिहास को स्थायी रूप से सहेजने के लिए साइन अप करें!'}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {language === 'ENG' ? 'Scan History' : 'स्कैन इतिहास'}
            </h1>
          </div>

          {scanHistory.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ENG' ? 'Delete All' : 'सभी हटाएं'}
              </span>
            </button>
          )}
        </div>

        {/* History List */}
        {scanHistory.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Camera className="w-20 h-20 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'ENG' ? 'No scans yet' : 'अभी तक कोई स्कैन नहीं'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'ENG' 
                ? 'Start by scanning your first plant!' 
                : 'अपने पहले पौधे को स्कैन करके शुरू करें!'}
            </p>
            <button
              onClick={() => navigate('/scan')}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
            >
              {language === 'ENG' ? 'Scan Now' : 'अभी स्कैन करें'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                onClick={() => handleViewDetails(scan)}
              >
                <div className="flex">
                  {/* Image Thumbnail */}
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-200">
                    <img 
                      src={scan.image} 
                      alt={scan.disease}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {scan.disease}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(scan.date)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(scan.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Severity Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(scan.severity)}`}>
                      {language === 'ENG' ? 'Severity' : 'गंभीरता'}: {scan.severity}
                    </div>

                    {/* Treatment Info */}
                    <div className="mt-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {language === 'ENG' ? 'Treatment' : 'उपचार'}:
                        </span>
                        <span>{scan.treatment}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold">
                          {language === 'ENG' ? 'Dosage' : 'खुराक'}:
                        </span>
                        <span>{scan.dosage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
