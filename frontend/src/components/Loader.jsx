import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 180);
          return 100;
        }
        return prev + 25;
      });
    }, 55);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
      className="fixed inset-0 bg-[#131712] z-[99999] flex flex-col items-center justify-center select-none"
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Minimal Monogram Mark in Olive & Beige */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-xl bg-[#8ea86d]/10 border border-[#8ea86d]/25 flex items-center justify-center mb-5 text-[#8ea86d] font-semibold tracking-wider text-base"
        >
          NT
        </motion.div>

        {/* Name & Subtitle */}
        <div className="text-center mb-5">
          <h1 className="text-[#f5f2ea] font-semibold tracking-tight text-lg">
            Mohd Nomaan Talib
          </h1>
          <p className="text-[#a3a99a] text-xs tracking-wider uppercase mt-1">
            APM & Full-Stack AI Engineer
          </p>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-44 h-[2px] bg-[#242c20] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#8ea86d] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
