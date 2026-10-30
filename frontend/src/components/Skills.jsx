import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { Server, Brain, Smartphone, Wrench, Award, ExternalLink, Search } from "lucide-react";
import { localData } from "../localData";

export default function Skills({ skills: propSkills = localData.skills }) {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

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
    },
    { 
      key: "fullStackEngineering",
      name: "Full-Stack MERN Engineering", 
      icon: Server,
    },
    { 
      key: "pwaDevelopment",
      name: "Progressive Web Apps (PWA)", 
      icon: Smartphone,
    },
    { 
      key: "toolsAndDevOps",
      name: "Tools, Testing & Cloud DevOps", 
      icon: Wrench,
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 border-t border-[#384c28] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-[#182212] dark:bg-[#8ea86d]/15 text-[#ffd875] dark:text-[#8ea86d] border-[#384c28] dark:border-[#8ea86d]/30 shadow-xs">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-[#f5f2ea]">
            Skills & Technical Stack
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/85 dark:text-[#a3a99a] max-w-2xl font-normal">
            Full-stack engineering, agentic AI architectures, and progressive web application development verified on live systems.
          </p>
        </div>

        {/* Filter Bar & IBM Certificate Link */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ffd875] dark:text-[#9ea695] pointer-events-none" />
            <input
              type="text"
              placeholder="Filter skills (e.g., MERN, PWA, Gemini)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] text-white dark:text-[#f5f2ea] placeholder-white/50 dark:placeholder-[#76806e] focus:outline-none focus:border-[#ffd875] dark:focus:border-[#8ea86d] shadow-sm"
            />
          </div>

          {/* IBM Credential Link */}
          <a
            href="https://drive.google.com/file/d/16dzCcULMzphcaM6OiF0FUFN4WHfnV322/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] hover:border-[#ffd875] dark:hover:border-[#8ea86d] transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#24331b] text-[#ffd875] border border-[#384c28] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-[#ffd875] dark:text-[#9ea695]">Credential</p>
                <p className="text-xs font-bold text-white dark:text-[#f5f2ea]">IBM Certified: Cloud & AI</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#ffd875] dark:text-[#9ea695] ml-2" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const list = categorized[cat.key] || [];
            const matchingSkills = list.filter((s) =>
              searchTerm ? s.toLowerCase().includes(searchTerm.toLowerCase()) : true
            );

            if (searchTerm && matchingSkills.length === 0) return null;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] hover:border-[#ffd875] dark:hover:border-[#8ea86d]/40 transition-colors shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#24331b] text-[#ffd875] border border-[#384c28] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white dark:text-[#f5f2ea]">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-white/75 dark:text-[#9ea695]">
                        {list.length} Verified Proficiencies
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
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
                            isHighlight
                              ? "bg-[#d4a838] text-[#162010] border-[#d4a838] font-bold"
                              : "bg-[#24331b] dark:bg-[#181e15] text-white/90 dark:text-[#d3dccd] border-[#384c28] dark:border-white/10"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#384c28] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-white/75 dark:text-[#9ea695]">
                  <span className="font-medium">Production-Grade</span>
                  <span className="font-bold text-[#ffd875] dark:text-[#8ea86d]">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
