import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { 
  User, Award, BookOpen, HeartHandshake, Compass, FileText, 
  CheckSquare, Layers, Activity, Smartphone, Users, BarChart3, 
  CheckCircle2, TrendingUp 
} from "lucide-react";

import { localData } from "../localData";

const competencyIcons = {
  "Product Strategy & Roadmapping": Compass,
  "PRDs & Functional Specifications": FileText,
  "Prioritization (RICE, MoSCoW)": CheckSquare,
  "MVP Scoping & 0-to-1 Delivery": Layers,
  "Agile / Scrum & OKRs / KPIs": Activity,
  "Progressive Web App (PWA) Strategy": Smartphone,
  "Cross-Functional Collaboration": Users,
  "User Research & A/B Experimentation": BarChart3,
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
      label: "Core Success Metric", 
      value: "90% Reduction", 
      subtext: "In Manual Reporting Time",
      icon: TrendingUp, 
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
    },
    { 
      label: "Production Deployments", 
      value: "12+ Live MVPs", 
      subtext: "AI Platforms & PWA Systems",
      icon: HeartHandshake, 
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20" 
    }
  ];

  const competencies = data?.coreCompetencies || localData.coreCompetencies || [];

  return (
    <section id="about" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95" : "bg-white"
    }`}>
      {/* Background radial highlights */}
      <div className="absolute top-1/3 left-1/10 w-96 h-96 radial-glow-1 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 radial-glow-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-1">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-4 border border-indigo-500/20">
            <User className="w-4 h-4" />
            <span>Profile Overview & Product Strategy</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            About Me
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            Bridging customer empathy, quantitative prioritization, and deep engineering execution to build scalable AI products and progressive web apps.
          </p>
        </motion.div>

        {/* Top Split: Professional Summary & Key Metrics */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Summary Text Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`lg:col-span-7 p-8 md:p-10 rounded-3xl glow-card flex flex-col justify-between transition-all duration-500 ${
              darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    Product Philosophy & Engineering Core
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400">Translating Ambiguity into Measurable Outcomes</p>
                </div>
              </div>
              <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-black"}`}>
                {data.summary}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs font-semibold">
              <span className={`inline-flex items-center gap-1.5 ${darkMode ? "text-gray-400" : "text-black"}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Full-Stack Technical Literacy (MERN, Cloud, Docker)
              </span>
              <span className={`inline-flex items-center gap-1.5 ${darkMode ? "text-gray-400" : "text-black"}`}>
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Proven User Metrics (90% Reporting Reduction)
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                    darkMode 
                      ? "border-gray-800 bg-gray-900/40 hover:bg-gray-900/70 hover:border-gray-700" 
                      : "border-gray-200 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className={`p-3 rounded-2xl border w-fit mb-4 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-2xl md:text-3xl font-black leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm font-bold mt-1 ${darkMode ? "text-gray-200" : "text-black"}`}>
                      {stat.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {stat.subtext}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Product Competencies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-3 border border-purple-500/20">
              <Compass className="w-3.5 h-3.5" />
              <span>Core Product Competencies</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-black ${darkMode ? "text-white" : "text-black"}`}>
              How I Drive Product Success
            </h3>
            <p className={`mt-3 text-sm md:text-base max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
              Frameworks, processes, and delivery methodologies applied across 0-to-1 launches.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((comp, idx) => {
              const IconComponent = competencyIcons[comp.title] || Layers;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: idx * 0.05, ease: "easeOut" }}
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
                    <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-black"}`}>
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
