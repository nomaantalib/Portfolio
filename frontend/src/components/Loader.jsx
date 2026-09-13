import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Sparkles, Smartphone, CheckCircle2 } from "lucide-react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing System Kernel...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 20) {
      setStatusText("BOOTING COGNITIVE ARCHITECTURE RUNTIME...");
    } else if (progress < 45) {
      setStatusText("HYDRATING PROGRESSIVE WEB APP (PWA) CACHES...");
    } else if (progress < 70) {
      setStatusText("CONNECTING AGENTIC WORKSPACE NODES...");
    } else if (progress < 90) {
      setStatusText("CALIBRATING 3D PERSPECTIVE INTERFACE TOKENS...");
    } else {
      setStatusText("SYSTEM ARMED & VERIFIED. LAUNCHING VIEWPORT.");
    }
  }, [progress]);

  // Progressive camera zoom based on load percentage
  const cameraZoom = 0.92 + (progress / 100) * 0.12;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.35,
        filter: "blur(24px)",
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-[#040711] z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Dynamic Cyber Grid Floor with Perspective */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f612_1px,transparent_1px),linear-gradient(to_bottom,#3b82f612_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" 
      />

      {/* Pulsating Center Nebula Flare */}
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/25 to-blue-600/25 rounded-full blur-[100px] pointer-events-none" 
      />

      {/* Main Zooming Content Container */}
      <motion.div 
        style={{ scale: cameraZoom }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative z-10 flex flex-col items-center max-w-md w-full px-6"
      >
        {/* Holographic Spinning Reactor Ring Core */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          {/* Outer Counter-Rotating Dashed Orbit Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          />

          {/* Middle Clockwise Rotating Gradient Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-t-purple-500 border-r-blue-500 border-b-cyan-500 border-l-transparent shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          />

          {/* Inner Glowing Terminal Node */}
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 20px rgba(99,102,241,0.4)",
                "0 0 40px rgba(99,102,241,0.7)",
                "0 0 20px rgba(99,102,241,0.4)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center border border-white/20"
          >
            <Cpu className="w-8 h-8 text-white animate-pulse" />
          </motion.div>
        </div>

        {/* Brand Identity & Version Tag */}
        <div className="text-center space-y-1 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "5s" }} />
            <span>PROGRESSIVE WEB APP • AI PORTFOLIO OS</span>
          </div>
          <h1 className="text-white text-3xl font-black tracking-tighter sm:text-4xl bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
            MOHD NOMAAN TALIB
          </h1>
          <p className="text-gray-400 text-xs tracking-wider font-mono">
            FULL STACK MERN • AGENTIC AI • PWA SYSTEMS
          </p>
        </div>

        {/* Audio / Neural Waveform Equalizer */}
        <div className="flex items-center justify-center gap-1.5 h-8 mb-6">
          <div className="w-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full wave-bar-1" />
          <div className="w-1 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-full wave-bar-2" />
          <div className="w-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-full wave-bar-3" />
          <div className="w-1 bg-gradient-to-t from-pink-600 to-purple-400 rounded-full wave-bar-4" />
          <div className="w-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-full wave-bar-3" />
          <div className="w-1 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-full wave-bar-2" />
          <div className="w-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full wave-bar-1" />
        </div>

        {/* Progress Bar with Video Neon Glow */}
        <div className="w-full h-2 bg-gray-900/80 rounded-full overflow-hidden p-[1px] border border-white/10 mb-4 shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full origin-left shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Diagnostics & Percentage readout */}
        <div className="flex justify-between items-center w-full text-xs font-mono">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-gray-300 font-bold truncate tracking-tight">{statusText}</span>
          </div>
          <span className="text-cyan-400 font-black text-sm shrink-0">
            {progress}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
