import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { ArrowDown, Mail, Sparkles, FileText, AppWindow, ExternalLink, Award, Smartphone, Rocket, CheckCircle2 } from "lucide-react";

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

const titles = [
  "Aspiring Associate Product Manager",
  "AI & Full-Stack Product Builder",
  "Software Engineer @ Turing (Contract)",
  "IEEE-Accepted AI Researcher (CE2CT-2026)",
  "Progressive Web App (PWA) Strategist"
];

export default function Hero({ data: propData = localData }) {
  const { darkMode } = useTheme();
  const [data, setData] = useState(propData);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setData(propData);
  }, [propData]);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(
          currentTitle.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={`min-h-screen relative flex items-center justify-center overflow-hidden py-24 ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-gray-50 text-black"
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
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold">Associate Product Manager & Engineering Opportunities</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {data?.name || "Mohd Nomaan Talib"}
            </span>
          </motion.h1>

          {/* Dynamic Typing Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="min-h-[2.5rem] flex items-center justify-center md:justify-start"
          >
            <p className={`text-lg sm:text-2xl font-bold tracking-wide ${
              darkMode ? "text-indigo-300" : "text-indigo-600"
            }`}>
              {displayText}
              <span className="inline-block w-1 h-6 ml-1 bg-indigo-500 animate-pulse align-middle"></span>
            </p>
          </motion.div>

          {/* Brief High-Impact Hook */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0 ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          >
            Final-year Computer Science Engineer (<strong>CGPA 9.8/10</strong>, Rank 1). Shipping AI-powered and installable PWA MVPs end-to-end — delivering measurable impact including a <strong>90% manual reporting reduction</strong> and peer-reviewed <strong>IEEE CE2CT-2026</strong> research.
          </motion.p>

          {/* Quick Metrics Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1"
          >
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              darkMode ? "bg-gray-900/60 border-gray-800 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-700"
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Rank 1 (9.8 CGPA)</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              darkMode ? "bg-gray-900/60 border-gray-800 text-purple-400" : "bg-purple-50 border-purple-200 text-purple-700"
            }`}>
              <Rocket className="w-3.5 h-3.5" />
              <span>Turing AI Engineer</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              darkMode ? "bg-gray-900/60 border-gray-800 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}>
              <Smartphone className="w-3.5 h-3.5" />
              <span>3 Production PWAs</span>
            </div>
          </motion.div>

          {/* Socials & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full transition shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 cursor-pointer text-sm md:text-base"
            >
              <span>Explore Projects & Case Studies</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            {data?.contact?.resume && (
              <a
                href={data.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-3 rounded-full border font-bold text-sm transition hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "border-gray-700 bg-gray-800/60 text-white hover:bg-gray-800"
                    : "border-gray-300 bg-white text-black hover:bg-gray-100 shadow-sm"
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View ATS Resume</span>
              </a>
            )}

            {/* Quick Icon Links */}
            {data?.contact && (
              <div className="flex items-center gap-2.5">
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600 shadow-sm"
                  }`}
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600 shadow-sm"
                  }`}
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                {data.contact.apphub && (
                  <a
                    href={data.contact.apphub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                      darkMode
                        ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                        : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600 shadow-sm"
                    }`}
                    title="SmartKeyboard App Hub (Paid Application)"
                  >
                    <AppWindow className="w-4 h-4 text-rose-500" />
                  </a>
                )}
                <a
                  href={`mailto:${data.contact.email}`}
                  className={`p-3 rounded-full border transition hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600 shadow-sm"
                  }`}
                  title="Email Direct"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right column - DP with Floating Hologram Cards */}
        <div className="md:col-span-5 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              scale: { duration: 0.6, type: "spring", stiffness: 100 },
              y: { repeat: Infinity, duration: 5.5, ease: "easeInOut" }
            }}
            className="relative"
          >
            {/* Outline Glow Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 rounded-full blur-xl opacity-40 scale-105 animate-pulse" />
            <motion.img
              src={profilePic}
              alt="Mohd Nomaan Talib"
              className={`w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 shadow-2xl ${
                darkMode ? "border-indigo-500/30" : "border-white"
              }`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Floating Card Top-Right: Turing Role */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`absolute -top-3 -right-6 z-20 px-3.5 py-2 rounded-2xl border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 ${
                darkMode ? "bg-gray-900/90 border-indigo-500/40 text-white" : "bg-white/95 border-gray-200 text-black"
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Role</p>
                <p className="text-xs font-black">Turing Engineer</p>
              </div>
            </motion.div>

            {/* Floating Card Bottom-Left: IEEE Research */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`absolute -bottom-3 -left-6 z-20 px-3.5 py-2 rounded-2xl border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 ${
                darkMode ? "bg-gray-900/90 border-blue-500/40 text-white" : "bg-white/95 border-gray-200 text-black"
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Publication</p>
                <p className="text-xs font-black">IEEE CE2CT-2026</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
