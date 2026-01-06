import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Info } from 'lucide-react';

// Component Imports
import CameraView from '../components/scanner/CameraView';
import ScannerOverlay from '../components/scanner/ScannerOverlay';
import ScannerControls from '../components/scanner/ScannerControls';
import CaptureButton from '../components/scanner/CaptureButton';
import CameraError from '../components/scanner/CameraError';

const Scanner = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [flashOn, setFlashOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const handleCapture = () => {
    if (!webcamRef.current) return;

    setIsCapturing(true);

    // Orchestrated Capture Sequence
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (imageSrc) {
        localStorage.setItem('capturedImage', imageSrc);
        // Visual "Blink" Effect before navigation
        setTimeout(() => navigate('/result'), 400);
      } else {
        alert('Failed to capture image. Please try again.');
        setIsCapturing(false);
      }
    }, 300);
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setIsCapturing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target?.result;
      if (imageSrc) {
        localStorage.setItem('capturedImage', imageSrc);
        navigate('/result');
      } else {
        alert('Failed to load image.');
        setIsCapturing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-screen bg-[#051109] overflow-hidden">
      
      {/* --- 1. THE BIOMETRIC FRAME (The "Cradle") --- */}
      <div className="absolute inset-0 z-0 pointer-events-none border-[16px] sm:border-[24px] border-[#051109]">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-full h-full border border-green-500/20 rounded-[2rem] sm:rounded-[3rem]"
        />
      </div>

      {/* --- 2. CAMERA VIEWPORT --- */}
      <div className="absolute inset-[16px] sm:inset-[24px] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-black">
        {!cameraError && (
          <CameraView 
            ref={webcamRef} 
            onError={() => setCameraError(true)}
          />
        )}

        {/* Camera Error Screen */}
        {cameraError && (
          <CameraError 
            onRequestPermission={() => window.location.reload()}
            onGoBack={handleBack}
          />
        )}

        {/* Target Box Overlay with Pulse */}
        {!cameraError && (
          <div className="relative h-full w-full">
            <ScannerOverlay />
            
            {/* "Breathing" Steady Guide */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-32 left-0 right-0 flex justify-center z-20"
            >
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-white text-xs font-bold tracking-widest uppercase">Focus on a single leaf</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* --- 3. UI CONTROLS --- */}
      <AnimatePresence>
        {!cameraError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-30 h-full flex flex-col justify-between p-8 sm:p-12 pointer-events-none"
          >
            {/* Top Bar: Navigation & Tools */}
            <div className="flex justify-between items-start pointer-events-auto">
              <ScannerControls 
                onBack={handleBack}
                flashOn={flashOn}
                onToggleFlash={handleToggleFlash}
              />
              
              {/* Pro Tip Bubble */}
              <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/10 max-w-[200px]">
                <div className="text-yellow-400"><Info size={20} /></div>
                <p className="text-[10px] text-white leading-tight font-medium">
                  Ensure the leaf is well lit for <span className="text-green-400 font-bold">99% accuracy</span>.
                </p>
              </div>
            </div>

            {/* Bottom Bar: Capture & Gallery */}
            <div className="flex flex-col items-center pointer-events-auto">
               <CaptureButton 
                onCapture={handleCapture}
                onGalleryClick={handleGalleryClick}
                isCapturing={isCapturing}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 4. THE SHUTTER EFFECT --- */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#FFFBF0] flex items-center justify-center"
          >
             <motion.div 
              animate={{ scale: [0.8, 1.2], opacity: [1, 0] }}
              className="flex flex-col items-center"
             >
                <div className="w-24 h-24 bg-[#143d28] rounded-full flex items-center justify-center mb-4">
                   <Sprout size={48} className="text-yellow-400" />
                </div>
                <h3 className="text-[#143d28] font-serif font-black text-2xl tracking-tight">Analyzing Life...</h3>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default Scanner;