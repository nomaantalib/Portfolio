import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { ArrowDown, Mail, FileText, AppWindow, ExternalLink, Award, Smartphone, Terminal, Sparkles, Activity } from "lucide-react";

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
  "Full Stack MERN & Generative AI Engineer",
  "AI Agent & RAG Systems Builder",
  "IEEE-Accepted AI Researcher (CE2CT-2026)",
  "Software Engineer @ Turing (Contract)",
  "Progressive Web App (PWA) Architect"
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
    let typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1600);
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
      darkMode ? "bg-[#0b0f19] text-white" : "bg-transparent text-slate-900"
    } bg-grid-pattern`}>
      {/* Video-like ambient light aura */}
      <motion.div 
        animate={{ 
          x: [0, 45, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.15, 0.95, 1]
        }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 md:w-[480px] md:h-[480px] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none radial-glow-1" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 35, 0],
          y: [0, 35, -30, 0],
          scale: [1, 0.95, 1.15, 1]
        }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-72 h-72 md:w-[480px] md:h-[480px] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none radial-glow-2" 
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-1">
        {/* Left column - Content */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          {/* Status pill with animated radar beacon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold tracking-wide">Available for Full-Stack, Generative AI & Agentic Roles</span>
          </motion.div>

          {/* Heading with video-like gradient reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {data?.name || "Mohd Nomaan Talib"}
            </span>
          </motion.h1>

          {/* Dynamic Typing Title with Futuristic Cursor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="min-h-[2.8rem] flex items-center justify-center md:justify-start"
          >
            <p className={`text-lg sm:text-2xl font-bold tracking-wide ${
              darkMode ? "text-indigo-300" : "text-indigo-600"
            }`}>
              {displayText}
              <span className="inline-block w-1.5 h-6 ml-1.5 bg-indigo-500 animate-pulse align-middle rounded-full"></span>
            </p>
          </motion.div>

          {/* High-Impact Hook matching ATS Resume */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 ${
              darkMode ? "text-gray-300" : "text-slate-800"
            }`}
          >
            Final-year B.Tech CSE student (<strong>CGPA 9.8/10</strong>, Rank Holder). Strong expertise in Full Stack MERN development, Generative AI agents, RAG, and MCP integrations. Delivered scalable live MVPs with <strong>90% manual reporting reduction</strong> and peer-reviewed <strong>IEEE CE2CT-2026</strong> research.
          </motion.p>

          {/* Video-like Metrics Badges with Waveform */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1"
          >
            <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${
              darkMode ? "bg-gray-900/60 border-gray-800 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-700"
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Rank Holder (9.8 CGPA)</span>
            </div>
            <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${
              darkMode ? "bg-gray-900/60 border-gray-800 text-purple-400" : "bg-purple-50 border-purple-200 text-purple-700"
            }`}>
              <Terminal className="w-3.5 h-3.5" />
              <span>Turing AI Engineer</span>
            </div>
            <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${
              darkMode ? "bg-gray-900/60 border-gray-800 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Installable PWAs</span>
            </div>

            {/* Micro AI Waveform Visualizer */}
            <div className={`px-3 py-1.5 rounded-full border hidden sm:flex items-center gap-1 ${
              darkMode ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <span className="w-1 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
              <span className="w-1 h-5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
              <span className="w-1 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-1 h-4 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
              <span className="text-[10px] font-mono text-gray-400 font-bold ml-1">AI ACTIVE</span>
            </div>
          </motion.div>

          {/* Socials & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full transition-transform shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 cursor-pointer text-sm md:text-base"
            >
              <span>Explore Projects & PWAs</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            {data?.contact?.resume && (
              <a
                href={data.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-3.5 rounded-full border font-bold text-sm transition hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "border-gray-700 bg-gray-800/60 text-white hover:bg-gray-800"
                    : "border-gray-300 bg-white text-black hover:bg-gray-100 shadow-sm"
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View ATS Resume</span>
              </a>
            )}

            {/* Quick Social Links */}
            {data?.contact && (
              <div className="flex items-center gap-2.5">
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3.5 rounded-full border transition-all hover:scale-110 active:scale-95 ${
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
                  className={`p-3.5 rounded-full border transition-all hover:scale-110 active:scale-95 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "border-gray-200 bg-white hover:bg-gray-100 text-black hover:text-blue-600 shadow-sm"
                  }`}
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${data.contact.email}`}
                  className={`p-3.5 rounded-full border transition-all hover:scale-110 active:scale-95 ${
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

        {/* Right column - DP with Video-like Concentric Glow Rings & Floating Cards */}
        <div className="md:col-span-5 flex justify-center relative">
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
            {/* Outer Rotating Video-Like Aura Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-dashed border-indigo-500/30 pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-dotted border-purple-500/20 pointer-events-none hidden sm:block"
            />

            {/* Glowing Backdrop Mesh */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 rounded-full blur-2xl opacity-40 scale-105 animate-pulse" />
            
            <motion.img
              src={profilePic}
              alt="Mohd Nomaan Talib"
              className={`w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 shadow-2xl ${
                darkMode ? "border-indigo-500/40" : "border-white"
              }`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Floating Card Top-Right: Turing Role */}
            <motion.a
              href="https://www.turing.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.35 }}
              className={`absolute -top-3 -right-6 z-20 px-3.5 py-2 rounded-2xl border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 transition cursor-pointer group ${
                darkMode ? "bg-gray-900/90 border-indigo-500/40 text-white hover:border-indigo-400" : "bg-white/90 border-indigo-200 text-black hover:shadow-indigo-500/20 shadow-md"
              }`}
              title="View Turing (Contract AI Engineer)"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Experience</p>
                <p className="text-xs font-black flex items-center gap-1">
                  <span>Turing Engineer</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                </p>
              </div>
            </motion.a>

            {/* Floating Card Bottom-Left: IEEE Research */}
            <motion.a
              href="https://drive.google.com/file/d/1KbcQjNyIhU7LoL4t7urN3HLJHR4oP_Wh/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.45 }}
              className={`absolute -bottom-3 -left-6 z-20 px-3.5 py-2 rounded-2xl border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 transition cursor-pointer group ${
                darkMode ? "bg-gray-900/90 border-blue-500/40 text-white hover:border-blue-400" : "bg-white/90 border-blue-200 text-black hover:shadow-blue-500/20 shadow-md"
              }`}
              title="Read Accepted IEEE CE2CT-2026 Research Paper"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Publication</p>
                <p className="text-xs font-black flex items-center gap-1">
                  <span>IEEE CE2CT-2026</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
