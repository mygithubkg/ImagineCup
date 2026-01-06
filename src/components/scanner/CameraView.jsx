import Webcam from 'react-webcam';
import React from 'react';
import { motion } from 'framer-motion';

const CameraView = React.forwardRef((props, ref) => {
  // We prioritize high resolution for accurate disease detection
  const videoConstraints = {
    facingMode: 'environment', // Essential for farmers in the field
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
    aspectRatio: 1.777777778
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 1. THE ACTUAL FEED */}
      <Webcam
        ref={ref}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="absolute inset-0 w-full h-full object-cover"
        onUserMediaError={props.onError}
        mirrored={false}
      />

      {/* 2. ATMOSPHERIC OVERLAYS (The "Human" Touch) */}
      
      {/* Subtle Vignette - Draws the eye to the center where the leaf should be */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />

      {/* Dynamic Light Leak - Makes the tech feel like it's reacting to the sun */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* 3. THE "AI VISION" FILAMENT */}
      {/* This very faint scanline confirms the system is "observing" */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))` }}>
      </div>

      {/* 4. PROTECTIVE GLASS SHINE */}
      <div className="absolute inset-0 border-[1px] border-white/10 rounded-[inherit] pointer-events-none" />
    </div>
  );
});

CameraView.displayName = 'CameraView';

export default CameraView;