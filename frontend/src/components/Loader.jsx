import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";

export default function Loader({ onComplete }) {
  const { darkMode } = useTheme();

  useEffect(() => {
    // Graceful, calm entrance that resolves swiftly without artificial delay
    const timer = setTimeout(() => {
      onComplete();
    }, 450);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none ${
        darkMode ? "bg-[#131712] text-[#f5f2ea]" : "bg-[#f7f5f0] text-[#1f241a]"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Understated Minimal Monogram */}
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider mb-4 border transition-colors ${
            darkMode
              ? "bg-[#8ea86d]/15 text-[#8ea86d] border-[#8ea86d]/25"
              : "bg-[#4e6334] text-[#f7f5f0] border-[#3f5129]"
          }`}
        >
          NT
        </div>

        {/* Calm Typographic Mark */}
        <p className="text-xs font-medium tracking-widest uppercase opacity-75 mb-4">
          Mohd Nomaan Talib
        </p>

        {/* Smooth, Continuous Hairline Progress Bar (No hyper-ticking) */}
        <div
          className={`w-36 h-[1.5px] rounded-full overflow-hidden ${
            darkMode ? "bg-[#252e20]" : "bg-[#ded8cb]"
          }`}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
            className={`h-full rounded-full ${
              darkMode ? "bg-[#8ea86d]" : "bg-[#4e6334]"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
