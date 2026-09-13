import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { 
  User, Award, BookOpen, HeartHandshake, Compass, FileText, 
  CheckSquare, Layers, Activity, Smartphone, Users, BarChart3, 
  CheckCircle2, TrendingUp, Sparkles, Cpu, Brain
} from "lucide-react";

import { localData } from "../localData";

const competencyIcons = {
  "Agentic AI & LLM Systems": Brain,
  "Cognitive Architecture & RAG": Cpu,
  "Full Stack MERN Engineering": Layers,
  "Progressive Web App (PWA) Architecture": Smartphone,
  "Model Context Protocol (MCP) & Tooling": Activity,
  "MVP Scoping & Fast Delivery": Compass,
  "Cross-Functional Execution": Users,
  "Performance & Workflow Optimization": TrendingUp,
};

export default function About({ data: propData = localData }) {
  const { darkMode } = useTheme();
  const [data, setData] = useState(propData);

  useEffect(() => {
    setData(propData);
  }, [propData]);

  const stats = [
    { 
      label: "B.Tech Academic Standing", 
      value: "9.8 / 10", 
      subtext: "Integral University (Rank Holder)",
      icon: BookOpen, 
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20" 
    },
    { 
      label: "Scientific Research", 
      value: "IEEE CE2CT-2026", 
      subtext: "Accepted Paper ID: 208",
      icon: Award, 
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20" 
    },
    { 
      label: "Measurable Impact", 
      value: "90% Reduction", 
      subtext: "In Manual Reporting Time",
      icon: TrendingUp, 
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
    },
    { 
      label: "Production Deployments", 
      value: "10+ Live Apps", 
      subtext: "AI Platforms & PWA Systems",
      icon: HeartHandshake, 
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20" 
    }
  ];

  const competencies = data?.coreCompetencies || localData.coreCompetencies || [];

  return (
    <section id="about" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95 text-white" : "bg-transparent text-slate-900"
    }`}>
      {/* Background radial highlights */}
      <div className="absolute top-1/3 left-1/10 w-96 h-96 radial-glow-1 pointer-events-none ambient-orb-1" />
      <div className="absolute bottom-10 right-10 w-96 h-96 radial-glow-2 pointer-events-none ambient-orb-2" />

      <div className="max-w-7xl mx-auto relative z-1">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 text-indigo-400 text-sm font-semibold mb-4 border border-indigo-500/20">
            <User className="w-4 h-4" />
            <span>Profile Overview & Technical Engineering</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
            About Me
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
            Full Stack MERN Engineer & Generative AI Builder specializing in agentic workflows, cognitive architectures, and Progressive Web Apps.
          </p>
        </motion.div>

        {/* Top Split: Professional Summary & Key Metrics */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Summary Text Card with video-like sweep */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 p-8 md:p-10 rounded-3xl glow-card cinematic-sweep flex flex-col justify-between transition-all duration-300 ${
              darkMode ? "glass-panel" : "glass-panel-light shadow-xl border-indigo-100"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    Engineering Vision & AI Capabilities
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400">Full Stack MERN • Generative AI • Cognitive Architecture</p>
                </div>
              </div>
              <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-slate-800"}`}>
                {data.summary}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs font-semibold">
              <span className={`inline-flex items-center gap-1.5 ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Full-Stack Architecture (MERN, Cloud, Docker)
              </span>
              <span className={`inline-flex items-center gap-1.5 ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Proven User Metrics (90% Reporting Cut)
              </span>
            </div>
          </motion.div>

          {/* Key Stats Cards Grid */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 group ${
                    darkMode 
                      ? "border-gray-800 bg-gray-900/40 hover:bg-gray-900/70 hover:border-indigo-500/40" 
                      : "glass-panel-light hover:shadow-xl hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl border w-fit ${stat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <p className={`text-2xl md:text-3xl font-black leading-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm font-bold mt-1 ${darkMode ? "text-gray-200" : "text-slate-800"}`}>
                      {stat.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-slate-600"}`}>
                      {stat.subtext}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Technical Competencies Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-3 border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Technical & System Competencies</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-black ${darkMode ? "text-white" : "text-black"}`}>
              Full-Stack & AI Engineering Pillars
            </h3>
            <p className={`mt-3 text-sm md:text-base max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
              Architectural skills and methodologies applied across production-grade AI MVPs and progressive web applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((comp, idx) => {
              const IconComponent = competencyIcons[comp.title] || Layers;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                    darkMode 
                      ? "border-gray-800 bg-gray-900/30 hover:border-indigo-500/40 hover:bg-gray-900/60" 
                      : "border-gray-200 bg-gray-50/70 hover:bg-white hover:border-indigo-300 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className={`text-lg font-bold mb-1 leading-snug ${darkMode ? "text-white" : "text-black"}`}>
                      {comp.title}
                    </h4>
                    <p className="text-xs font-semibold text-indigo-400 mb-3">
                      {comp.tagline}
                    </p>
                    <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-slate-700"}`}>
                      {comp.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
