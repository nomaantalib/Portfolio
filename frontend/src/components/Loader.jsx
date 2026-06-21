import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Core System...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600); // Allow complete state to show shortly
          return 100;
        }
        // Step progress randomly
        const next = prev + Math.floor(Math.random() * 12) + 3;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) {
      setStatusText("Initializing Cognitive Architecture...");
    } else if (progress < 50) {
      setStatusText("Connecting Agentic Workspace Nodes...");
    } else if (progress < 75) {
      setStatusText("Compiling Interface Tokens...");
    } else if (progress < 95) {
      setStatusText("Hydrating Vector DB Fallbacks...");
    } else {
      setStatusText("System Ready. Booting Interface.");
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -30,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-[#030712] z-[9999] flex flex-col items-center justify-center select-none"
    >
      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative center orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-1 flex flex-col items-center max-w-sm w-full px-6">
        {/* Animated logo / sparkles */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 4, ease: "linear" }
          }}
          className="w-16 h-16 rounded-3xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-8 border border-white/10"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        {/* Text Logo */}
        <h1 className="text-white text-2xl font-black tracking-tighter mb-1">
          NOMAAN TALIB
        </h1>
        <p className="text-gray-500 text-xs tracking-widest font-bold uppercase mb-12">
          Portfolio OS v2.0
        </p>

        {/* Progress bar container */}
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden mb-4 border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full origin-left"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress & Diagnostics info */}
        <div className="flex justify-between items-center w-full text-xs font-mono mb-2">
          <span className="text-gray-400 font-bold">{statusText}</span>
          <span className="text-indigo-400 font-black">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
