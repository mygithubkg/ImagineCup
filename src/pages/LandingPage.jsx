import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Leaf, Wifi, Globe, ShieldCheck, Activity, 
  BarChart3, CloudSun, Sprout, ArrowRight, Heart 
} from 'lucide-react';
import { 
  motion, useScroll, useTransform, useMotionValue, 
  useMotionTemplate, useSpring, AnimatePresence 
} from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
// --- COMPONENTS ---

// 1. HEADER (Simplified for context)


// 2. FOOTER (The "Root System")


// 3. SPOTLIGHT CARD (Enhanced with "Squish" Physics)
const SpotlightCard = ({ children, className = "", delay = 0 }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className={`relative border border-green-900/5 bg-white overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }} // The tactile "squish"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(250, 204, 21, 0.1), // Warm Yellow Glow
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
};

// 4. FLOATING ELEMENT (Unchanged - it was good)
const FloatingElement = ({ icon: Icon, delay, x, y, size }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.2, 0.1], 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 10, 
      delay: delay, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`absolute ${x} ${y} pointer-events-none z-0 text-green-900`}
  >
    <Icon size={size} />
  </motion.div>
);

// --- MAIN PAGE ---

const LandingPage = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Parallax Logic
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={targetRef} className="min-h-screen bg-[#FFFBF0] text-gray-800 overflow-x-hidden font-sans selection:bg-yellow-200 selection:text-green-900">
      <Header />

      {/* --- BACKGROUND LAYER: The "Breathing" Field --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Grain Texture for "Paper/Soil" feel */}
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }}></div>
        
        {/* Topographic Lines - Slowly drifting */}
        <motion.div 
          animate={{ x: [-20, 0, -20], y: [-20, 0, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.04]" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143d28' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        
        {/* Soft Radial Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-3xl filter mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-3xl filter mix-blend-multiply"></div>
      </div>

      {/* Floating Decor */}
      <FloatingElement icon={Leaf} size={64} x="left-10" y="top-40" delay={0} />
      <FloatingElement icon={Activity} size={48} x="right-20" y="top-20" delay={2} />
      <FloatingElement icon={CloudSun} size={80} x="left-1/4" y="bottom-1/4" delay={1} />
      <FloatingElement icon={ShieldCheck} size={56} x="right-10" y="top-1/2" delay={3} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 lg:pt-48 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Trust Badge - "Heartbeat" Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-[#1A4D2E]/5 border border-[#1A4D2E]/10 rounded-full px-5 py-2 mb-10 backdrop-blur-sm"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-green-600"
              ></motion.div>
              <span className="text-sm font-bold text-[#1A4D2E] tracking-widest uppercase">Trusted by 50,000+ Farmers</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              style={{ y: textY }}
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-[#143d28] tracking-tighter leading-[0.9] mb-8"
            >
              <motion.span 
                initial={{ opacity: 0, y: 100 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                Listen to
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 100 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="block text-transparent bg-clip-text bg-gradient-to-b from-[#143d28] to-[#4F772D]"
              >
                your harvest.
              </motion.span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-[#143d28]/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium font-serif"
            >
              Identify crop diseases in <span className="text-[#143d28] font-bold decoration-yellow-400 decoration-2 underline underline-offset-4">0.5 seconds</span>. 
              Advanced AI that feels as natural as sunlight.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link to="/scan" className="w-full sm:w-auto group">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-3 bg-[#143d28] text-[#FFFBF0] px-8 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-green-900/20 group-hover:bg-[#0f2e1e] transition-all"
                >
                  <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Start Diagnosis
                </motion.button>
              </Link>
              
              <Link to="/demo" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-3 bg-[#FFFBF0] text-[#143d28] border-2 border-[#143d28]/10 px-8 py-5 rounded-2xl text-lg font-bold hover:bg-white transition-colors"
                >
                  <BarChart3 className="w-6 h-6" />
                  See Market Data
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* PARALLAX HERO IMAGE - "The Window" */}
          <motion.div 
            style={{ scale: heroScale, opacity: opacityFade }} 
            className="mt-24 relative mx-auto max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-[10px] border-white/50 backdrop-blur-sm"
          >
             <div className="aspect-[16/9] bg-gray-900 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#143d28]/80 via-transparent to-transparent"></div>
                
                {/* Overlay Dashboard UI */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                       <span className="text-white/80 font-mono text-sm">ALERT DETECTED</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Early Blight (Tomato)</h3>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- LIVE TICKER (The Pulse of the Market) --- */}
      <div className="bg-[#143d28] py-5 overflow-hidden relative z-20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap text-[#FFFBF0]/80 font-mono text-sm tracking-widest gap-20"
        >
          {[1,2,3,4].map(i => (
             <React.Fragment key={i}>
                <span className="flex items-center gap-3"><span className="text-yellow-400 font-bold">WHEAT ₹2,125</span> <span className="text-green-400">▲ 2.4%</span></span>
                <span className="flex items-center gap-3"><span className="text-yellow-400 font-bold">RICE ₹3,400</span> <span className="text-red-400">▼ 0.5%</span></span>
                <span className="flex items-center gap-3"><span className="text-yellow-400 font-bold">COTTON ₹6,200</span> <span className="text-green-400">▲ 1.1%</span></span>
                <span className="flex items-center gap-3">RAIN ALERT: PUNJAB (HEAVY)</span>
             </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* --- BENTO GRID (Features) --- */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-black text-[#143d28] mb-6">Grounded in Science.<br/>Built for You.</h2>
            <div className="h-2 w-32 bg-yellow-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Feature */}
            <SpotlightCard className="md:col-span-2 rounded-[2.5rem] p-12 bg-gradient-to-br from-white to-[#143d28]/5" delay={0.1}>
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-800 mb-8">
                  <Wifi className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-4xl font-serif font-bold text-green-900 mb-4">Works Offline. Always.</h3>
                  <p className="text-xl text-green-800/60 leading-relaxed max-w-lg">
                    Nature doesn't need WiFi, and neither do we. Our AI runs directly on your phone's chip. 
                    Diagnose crops in the middle of your field with zero signal.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Vertical Dark Card */}
            <SpotlightCard className="md:row-span-2 rounded-[2.5rem] p-12 bg-[#143d28] text-white border-none" delay={0.2}>
               <div className="h-full flex flex-col">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 backdrop-blur-sm">
                    <ShieldCheck className="w-8 h-8" />
                 </div>
                 <h3 className="text-3xl font-serif font-bold mb-4">Bank-Grade Security</h3>
                 <p className="text-green-100/70 mb-12 text-lg">
                   Your land, your data. We adhere to the strictest privacy protocols. We never sell your location.
                 </p>
                 
                 {/* Visual Encryption Animation */}
                 <div className="mt-auto bg-black/20 rounded-2xl p-6 border border-white/5">
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-xs font-mono text-green-400">ENCRYPTION: AES-256</span>
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   </div>
                   <div className="space-y-2">
                     <motion.div 
                        animate={{ width: ["10%", "70%", "40%", "90%"] }} 
                        transition={{ duration: 3, repeat: Infinity }} 
                        className="h-1 bg-green-500/50 rounded-full" 
                     />
                     <motion.div 
                        animate={{ width: ["50%", "20%", "80%", "30%"] }} 
                        transition={{ duration: 4, repeat: Infinity }} 
                        className="h-1 bg-green-500/30 rounded-full" 
                     />
                   </div>
                 </div>
               </div>
            </SpotlightCard>

            {/* Square Card 1 */}
            <SpotlightCard className="rounded-[2.5rem] p-10" delay={0.3}>
               <Globe className="w-10 h-10 text-green-700 mb-6" />
               <h3 className="text-2xl font-serif font-bold text-green-900 mb-3">12 Languages</h3>
               <p className="text-green-800/60 font-medium">From Punjabi to Tamil. Technology that speaks your mother tongue.</p>
            </SpotlightCard>

            {/* Square Card 2 */}
            <SpotlightCard className="rounded-[2.5rem] p-10" delay={0.4}>
               <Leaf className="w-10 h-10 text-green-700 mb-6" />
               <h3 className="text-2xl font-serif font-bold text-green-900 mb-3">Organic Cures</h3>
               <p className="text-green-800/60 font-medium">Chemical-free alternatives to heal your crops without hurting the soil.</p>
            </SpotlightCard>

          </div>
        </div>
      </section>

      {/* --- STATS (Trust) --- */}
      <section className="bg-yellow-500/10 py-24 border-y border-yellow-500/20">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { num: "10M+", label: "Leaves Scanned" },
              { num: "98.5%", label: "AI Accuracy" },
              { num: "50k+", label: "Happy Farmers" },
              { num: "₹0", label: "Cost to Start" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-5xl md:text-6xl font-black text-[#143d28] mb-2 font-serif">{stat.num}</h4>
                <p className="text-green-800 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-black text-[#143d28] mb-8">Ready to plant the future?</h2>
          <p className="text-xl text-green-800/70 mb-10 max-w-2xl mx-auto">
            Join the community that is rewriting the history of agriculture. One scan at a time.
          </p>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-[#143d28] text-white px-10 py-6 rounded-full text-xl font-bold inline-flex items-center gap-3 hover:bg-[#0f2e1e] transition-colors shadow-2xl shadow-green-900/30"
          >
             Download App <ArrowRight />
          </motion.button>
        </div>
        
        {/* Background blobs for CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;