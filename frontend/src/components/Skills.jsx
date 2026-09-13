import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { 
  Code, Server, Brain, Wrench, Shield, Compass, Smartphone, 
  Globe, Award, ExternalLink, Search, Sparkles
} from "lucide-react";

import { localData } from "../localData";

export default function Skills({ skills: propSkills = localData.skills }) {
  const { darkMode } = useTheme();
  const [skills, setSkills] = useState(propSkills);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSkills(propSkills);
  }, [propSkills]);

  const categorized = localData.skillsCategorized || {
    aiAndAgents: [
      "Generative AI", "Agentic AI", "Model Context Protocol (MCP)", "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering", "LLM API Integration", "Cognitive Architecture", "Affective Computing",
      "AI Agent Orchestration", "Chain-of-Thought (CoT)", "Gemini API", "Claude API"
    ],
    fullStackEngineering: [
      "JavaScript", "Python", "Java", "C (Data Structures & Algorithms)", "React.js", "Node.js",
      "Express.js", "MongoDB", "MySQL", "Firebase", "RESTful APIs", "Tailwind CSS", "HTML5 / CSS3"
    ],
    pwaDevelopment: [
      "Web App Manifest", "Service Workers", "Offline Caching Strategies", "App-Shell Architecture",
      "Installable PWA", "Push Notifications", "Responsive & Mobile-First Design", "Lighthouse PWA Auditing"
    ],
    toolsAndDevOps: [
      "Git", "GitHub", "Postman", "VS Code", "Google Colab", "GitHub Copilot",
      "Google Agentspace", "Claude", "Docker Testing", "Vite", "Render Deployment", "Cloudflare Pages & D1"
    ]
  };

  const categories = [
    { 
      key: "aiAndAgents",
      name: "Generative AI & Agentic Systems", 
      icon: Brain, 
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      accent: "from-purple-500/20 to-indigo-500/20 border-purple-500/30"
    },
    { 
      key: "fullStackEngineering",
      name: "Full-Stack MERN Engineering", 
      icon: Server, 
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      accent: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
    },
    { 
      key: "pwaDevelopment",
      name: "Progressive Web Apps (PWA)", 
      icon: Smartphone, 
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
    },
    { 
      key: "toolsAndDevOps",
      name: "Tools, Testing & Cloud DevOps", 
      icon: Wrench, 
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      accent: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30"
    }
  ];

  return (
    <section id="skills" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-transparent text-slate-900"
    }`}>
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 radial-glow-1 pointer-events-none ambient-orb-1" />

      <div className="max-w-7xl mx-auto relative z-1">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Brain className="w-4 h-4" />
            <span>Technical Fluency & Tooling</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
            Skills & Competencies
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
            Full-stack engineering, agentic AI architectures, and progressive web application development verified on live systems.
          </p>
        </motion.div>

        {/* Search & Certification Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Live Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skills (e.g., MERN, PWA, Gemini)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                darkMode 
                  ? "bg-gray-900/60 border-gray-800 text-white placeholder-gray-500" 
                  : "bg-white border-gray-200 text-black placeholder-gray-400 shadow-sm"
              }`}
            />
          </div>

          {/* IBM Certificate Callout Banner */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://drive.google.com/file/d/16dzCcULMzphcaM6OiF0FUFN4WHfnV322/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-between sm:justify-start gap-3 px-5 py-3 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 hover:border-indigo-500/60 transition shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Industry Credential</p>
                <p className={`text-xs sm:text-sm font-bold ${darkMode ? "text-white" : "text-black"}`}>
                  IBM Certified: Cloud Computing & AI
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-indigo-400 shrink-0 ml-2" />
          </motion.a>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const list = categorized[cat.key] || [];
            const matchingSkills = list.filter((s) =>
              searchTerm ? s.toLowerCase().includes(searchTerm.toLowerCase()) : true
            );

            if (searchTerm && matchingSkills.length === 0) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`flex flex-col justify-between p-7 rounded-3xl border glow-card cinematic-sweep transition-all duration-300 ${
                  darkMode 
                    ? "border-gray-800 bg-gray-900/40 hover:bg-gray-900/70 hover:border-gray-700" 
                    : "border-gray-200 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div>
                  {/* Card Title */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`p-3 rounded-2xl border shrink-0 ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-bold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                        {cat.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-gray-400">
                        {list.length} Verified Skills
                      </p>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {matchingSkills.map((skill, sIdx) => {
                      const isHighlight = searchTerm && skill.toLowerCase().includes(searchTerm.toLowerCase());
                      return (
                        <span
                          key={sIdx}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                            isHighlight
                              ? "bg-indigo-500 text-white border-indigo-400 shadow-md"
                              : darkMode
                                ? "bg-gray-800/60 text-gray-200 border-gray-700/80 hover:border-indigo-500/40 hover:text-white"
                                : "bg-gray-100 text-black border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>ATS Verified</span>
                  <span className="text-indigo-400 font-bold">Production-Tested</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
