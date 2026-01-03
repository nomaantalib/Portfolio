import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import profilePic from '../asset/profile.jpeg';
export default function Hero() {
  const { darkMode } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const fullText = "MERN • Generative AI • Agentic Systems";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className={`h-screen flex flex-col justify-center items-center ${
        darkMode
          ? "bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900"
          : "bg-linear-to-br from-blue-100 via-purple-100 to-indigo-100"
      }`}
    >
      <div className="text-center flex flex-col items-center">
        <motion.img
          initial={{ scale: 0}}
          animate={{ scale: 1}}
          transition={{ delay: 0.1 }}
          src={profilePic}
          alt="Display Picture"
          className={`w-40 h-60 rounded-lg  mb-4 border-4 ${
            darkMode ? "border-white" : "border-gray-800"
          } shadow-lg`}
        />
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-6xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Mohd Nomaan Talib
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-4 text-xl ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {displayText}<span className="animate-pulse">|</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <button onClick={scrollToAbout} className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition">
            Explore My Work
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
