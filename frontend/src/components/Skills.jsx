import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { 
  Code, Server, Brain, Wrench, Shield, Compass, Smartphone, 
  Globe, Award, ExternalLink, Search 
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
    productManagement: [
      "Product Strategy & Roadmapping", "PRDs & Functional Specs", "User Research & Journey Mapping",
      "Prioritization (RICE, MoSCoW)", "MVP Scoping & 0-to-1 Delivery", "Agile / Scrum & Sprint Planning",
      "OKRs & KPIs", "A/B Testing & Experimentation", "Progressive Web App (PWA) Strategy",
      "Cross-functional Collaboration", "Stakeholder Communication"
    ],
    aiAndAgents: [
      "Generative AI", "Agentic AI Systems", "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering", "LLM API Integration", "Model Context Protocol (MCP)",
      "Cognitive Architecture", "Affective Computing", "Chain-of-Thought (CoT) Reasoning",
      "Gemini API Reasoning", "Claude API", "IBM Certified: Cloud Computing & AI"
    ],
    fullStackEngineering: [
      "React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "Firebase",
      "RESTful APIs", "JavaScript (ES6+)", "Python", "Java", "SQL",
      "C (Data Structures & Algorithms)", "Tailwind CSS", "HTML5 / CSS3"
    ],
    pwaDevelopment: [
      "Web App Manifest", "Service Workers", "Offline Caching Strategies",
      "App-Shell Architecture", "Push Notifications", "Installable / App-like Web Experiences",
      "Mobile-First & Responsive Design", "Lighthouse PWA Auditing"
    ],
    webPlatformsAndCMS: [
      "WordPress Development", "Website Administration & Maintenance",
      "Admin CMS Architecture", "Cloudflare Pages & D1 Database", "Hono Workers Engine"
    ],
    toolsAndDevOps: [
      "Docker Testing", "Git & GitHub", "Postman", "VS Code", "Google Colab",
      "GitHub Copilot", "Google Agentspace", "Render Deployment", "Vite"
    ]
  };

  const categories = [
    { 
      key: "productManagement",
      name: "Product Strategy & Management", 
      icon: Compass, 
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      accent: "from-amber-500/20 to-orange-500/20 border-amber-500/30"
    },
    { 
      key: "aiAndAgents",
      name: "AI & Agentic Systems", 
      icon: Brain, 
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      accent: "from-purple-500/20 to-indigo-500/20 border-purple-500/30"
    },
    { 
      key: "fullStackEngineering",
      name: "Full-Stack Engineering", 
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
      key: "webPlatformsAndCMS",
      name: "Web Platforms & CMS", 
      icon: Globe, 
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      accent: "from-rose-500/20 to-pink-500/20 border-rose-500/30"
    },
    { 
      key: "toolsAndDevOps",
      name: "Tools, Testing & DevOps", 
      icon: Wrench, 
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      accent: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30"
    }
  ];

  return (
    <section id="skills" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-gray-50 text-black"
    }`}>
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 radial-glow-1 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-1">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Brain className="w-4 h-4" />
            <span>Technical Fluency & Product Tooling</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Skills & Competencies
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            Comprehensive technical foundation across product strategy frameworks, agentic AI architecture, PWA development, and full-stack engineering.
          </p>
        </motion.div>

        {/* Search & Certification Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Live Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skills (e.g., PWA, RICE, Docker)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
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
            className="w-full md:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 hover:border-indigo-500/60 transition shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400">Industry Credential</p>
                <p className={`text-xs font-bold ${darkMode ? "text-white" : "text-black"}`}>
                  IBM Certified: Cloud Computing & AI
                </p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-2" />
          </motion.a>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 ${
                  darkMode 
                    ? "border-gray-800 bg-gray-900/40 hover:bg-gray-900/70 hover:border-gray-700" 
                    : "border-gray-200 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div>
                  {/* Card Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                        {cat.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-gray-400">
                        {list.length} Core Competencies
                      </p>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {matchingSkills.map((skill, sIdx) => {
                      const isHighlight = searchTerm && skill.toLowerCase().includes(searchTerm.toLowerCase());
                      return (
                        <span
                          key={sIdx}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-colors ${
                            isHighlight
                              ? "bg-indigo-500 text-white border-indigo-400 shadow-md"
                              : darkMode
                                ? "bg-gray-800/60 text-gray-300 border-gray-700/80 hover:border-indigo-500/40 hover:text-white"
                                : "bg-gray-100 text-black border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Special Footer Tag for Category */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>Verified Experience</span>
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
