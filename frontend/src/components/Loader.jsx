import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";

export default function Loader({ onComplete }) {
  const { darkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.99,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none transition-colors duration-300 ${
        darkMode ? "bg-black text-[#f5f2ea]" : "bg-[#f7f3ea] text-[#1b2214]"
      }`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        {/* Monogram in Olive */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider mb-4 border transition-colors shadow-sm ${
            darkMode
              ? "bg-[#8ea86d]/15 text-[#8ea86d] border-[#8ea86d]/30"
              : "bg-[#24331b] text-[#eed07b] border-[#3e522b]"
          }`}
        >
          NT
        </div>

        {/* Minimalist Name */}
        <p className={`text-xs font-semibold tracking-widest uppercase mb-4 transition-colors ${
          darkMode ? "text-[#a3a99a]" : "text-[#24331b]"
        }`}>
          Mohd Nomaan Talib
        </p>

        {/* Smooth Hairline Progress Bar */}
        <div
          className={`w-40 h-[2px] rounded-full overflow-hidden ${
            darkMode ? "bg-[#1c2219]" : "bg-[#ded6c3]"
          }`}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full ${
              darkMode ? "bg-[#8ea86d]" : "bg-[#d4a838]"
            }`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
