import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, User, CheckCircle2, Sprout, Leaf, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import React from 'react';

// --- Sub-component: Animated Number Counter ---
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      alert('Please enter a valid OTP');
      return;
    }
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ phone: phoneNumber, type: 'farmer' }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleGuestMode = () => {
    localStorage.setItem('user', JSON.stringify({ type: 'guest', name: 'Demo User' }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] selection:bg-yellow-200 selection:text-green-900 font-sans overflow-hidden">
      <Header />
      
      <div className="flex min-h-[calc(100vh-80px)] mt-[80px]"> {/* Offset for fixed header */}
        
        {/* --- LEFT SIDE: The Ecosystem (Desktop Only) --- */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#143d28]">
          
          {/* 1. Organic Pattern Background */}
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>
          
          {/* 2. Floating Leaf Animation (Biophilic Touch) */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0], 
              rotate: [0, 5, 0],
              scale: [1, 1.02, 1] 
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[15%] text-white/5 pointer-events-none"
          >
            <Leaf size={400} />
          </motion.div>

          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 text-white w-full h-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-fit">
                <Sprout className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold text-green-100 tracking-wide uppercase">Farmer First Technology</span>
              </div>

              <h2 className="text-5xl xl:text-6xl font-serif font-bold mb-6 leading-[1.1]">
                Access your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                  Intelligence Hub.
                </span>
              </h2>
              
              <p className="text-lg text-green-100/70 mb-12 max-w-md leading-relaxed">
                Join a community of modern farmers using AI to detect diseases early, reduce costs, and maximize yield.
              </p>

              {/* Live Stats Grid */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="group">
                  <div className="text-3xl font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors"><CountUp end={50000} />+</div>
                  <div className="text-xs text-green-400 font-bold uppercase tracking-widest">Farmers</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors">98.5%</div>
                  <div className="text-xs text-green-400 font-bold uppercase tracking-widest">Accuracy</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors">12</div>
                  <div className="text-xs text-green-400 font-bold uppercase tracking-widest">Languages</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT SIDE: The Gateway (Form) --- */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
          
          {/* Subtle Grain Background Texture */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }}></div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[440px] relative z-10"
          >
            {/* Card Container */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#143d28]/10 p-8 sm:p-12 border border-[#143d28]/5 relative overflow-hidden">
              
              {/* Decorative Top Line */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#143d28] to-yellow-500"></div>

              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex justify-center items-center w-12 h-12 bg-green-50 rounded-2xl mb-4 text-[#143d28]">
                    <Lock size={24} />
                </div>
                <h1 className="text-3xl font-serif font-black text-[#143d28] mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-500 font-medium">
                  Enter your mobile number to login securely.
                </p>
              </div>

              {/* Form Area */}
              <div className="relative min-h-[300px]">
                <AnimatePresence mode='wait' custom={step === 'otp' ? 1 : -1}>
                  
                  {/* STEP 1: PHONE NUMBER */}
                  {step === 'phone' ? (
                    <motion.form 
                      key="phone-form"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onSubmit={handleSendOTP} 
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-bold text-[#143d28] mb-2 ml-1">
                          Mobile Number
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#143d28] transition-colors" />
                          </div>
                          <span className="absolute inset-y-0 left-12 flex items-center text-gray-500 font-bold pointer-events-none pt-1">
                             +91
                          </span>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="98765 43210"
                            className="block w-full pl-20 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#143d28] focus:border-transparent transition-all outline-none font-bold text-gray-900 placeholder:font-normal"
                            required
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold text-white bg-[#143d28] rounded-xl hover:bg-[#0f2e1e] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-green-900/20"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                             <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                             Sending OTP...
                          </span>
                        ) : (
                          <>
                            <span>Continue</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  ) : (
                    
                    /* STEP 2: OTP VERIFICATION */
                    <motion.form 
                      key="otp-form"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onSubmit={handleVerifyOTP} 
                      className="space-y-6"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="block text-sm font-bold text-[#143d28]">
                            Enter Verification Code
                            </label>
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                SMS Sent
                            </span>
                        </div>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <ShieldCheck className="h-5 w-5 text-gray-400 group-focus-within:text-[#143d28] transition-colors" />
                          </div>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="• • • •"
                            maxLength="4"
                            className="block w-full pl-12 pr-4 py-4 text-2xl tracking-[0.8em] font-black text-center bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#143d28] focus:border-transparent transition-all outline-none text-gray-900"
                            required
                          />
                        </div>
                        <p className="mt-3 text-sm text-center text-gray-500">
                          Code sent to <span className="font-bold text-gray-900">+91 {phoneNumber}</span>
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold text-white bg-[#143d28] rounded-xl hover:bg-[#0f2e1e] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-green-900/20"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Verifying...
                          </span>
                        ) : (
                          <>
                            <span>Verify & Login</span>
                            <CheckCircle2 className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => setStep('phone')}
                        className="w-full text-sm font-bold text-gray-400 hover:text-[#143d28] transition-colors flex items-center justify-center gap-1"
                      >
                        ← Change Phone Number
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Guest / Demo Mode */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGuestMode}
                    className="relative w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-yellow-900 bg-yellow-400/20 border border-yellow-400/50 rounded-xl hover:bg-yellow-400 hover:text-[#143d28] transition-all group overflow-hidden"
                  >
                     <User className="w-4 h-4" />
                     <span>Try Demo Version (Guest)</span>
                  </motion.button>
                  
                  {/* Microsoft Login Styling */}
                  <button className="w-full text-sm text-gray-500 font-medium hover:text-gray-800 transition-colors flex items-center justify-center gap-2 opacity-70 hover:opacity-100">
                      <svg className="w-4 h-4" viewBox="0 0 23 23"><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#00a4ef" d="M12 1h10v10H12z"/><path fill="#7fba00" d="M1 12h10v10H1z"/><path fill="#ffb900" d="M12 12h10v10H12z"/></svg>
                      Sign in with Microsoft
                  </button>
                </div>
              </div>

            </div>
            
            {/* Footer Links */}
            <div className="mt-8 text-center space-x-6 text-xs text-gray-400 font-medium uppercase tracking-widest">
              <a href="#" className="hover:text-[#143d28] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#143d28] transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;