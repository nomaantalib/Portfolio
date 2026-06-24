import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { api } from "../api";
import { ArrowDown, Mail, Sparkles, FileText, AppWindow } from "lucide-react";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import profilePic from '../asset/profile.jpeg';

import { localData } from "../localData";

export default function Hero({ data: propData = localData }) {
  const { darkMode } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [data, setData] = useState(propData);
  const fullText = "Full Stack MERN Developer • Generative AI • Agentic Systems";

  useEffect(() => {
    setData(propData);
  }, [propData]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`min-h-screen relative flex items-center justify-center overflow-hidden py-24 ${
      darkMode 
        ? "bg-[#0b0f19] text-white" 
        : "bg-gray-50 text-black"
    } bg-grid-pattern`}>
      {/* Background blobs */}
      <motion.div 
        animate={{ 
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0]
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none radial-glow-1" 
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0]
        }}
        transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none radial-glow-2" 
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-1">
        {/* Left column - Info */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for Job Opportunities & Collaborations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none"
          >
            Hi, I'm{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {data?.name || "Mohd Nomaan Talib"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className={`text-lg sm:text-xl font-medium tracking-wide h-8 md:h-auto ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          >
            {displayText}
            <span className="inline-block w-1.5 h-5 ml-1 bg-blue-500 animate-pulse"></span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0 ${
              darkMode ? "text-gray-400" : "text-black"
            }`}
          >
            Specialized in MERN Full-stack, Generative AI agent frameworks, RAG architectures, and Model Context Protocol (MCP). B.Tech CSE student (CGPA: 9.8).
          </motion.p>

          {/* Socials & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4"
          >
            <button
              onClick={scrollToAbout}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-full transition shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            {data?.contact && (
              <div className="flex items-center gap-3">
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600"
                  }`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600"
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                {data.contact.apphub && (
                  <a
                    href={data.contact.apphub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                      darkMode
                        ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                        : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600"
                    }`}
                    title="SmartKeyboard App Hub (Paid Application)"
                  >
                    <AppWindow className="w-5 h-5 text-rose-500" />
                  </a>
                )}
                <a
                  href={`mailto:${data.contact.email}`}
                  className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </a>
                {data.contact.resume && (
                  <a
                    href={data.contact.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 flex items-center justify-center ${
                      darkMode
                        ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                        : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600"
                    }`}
                    title="View Resume"
                  >
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right column - DP */}
        <div className="md:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -12, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              scale: { duration: 0.6, type: "spring", stiffness: 100 },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            className="relative"
          >
            {/* Outline Glow Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 rounded-full blur-md opacity-40 scale-105 animate-pulse" />
            <motion.img
              src={profilePic}
              alt="Mohd Nomaan Talib"
              className={`w-64 h-64 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 shadow-2xl ${
                darkMode ? "border-gray-800" : "border-white"
              }`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
