import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";
import { useTheme } from "../ThemeContext";
import { Code, Server, Brain, Wrench, Shield } from "lucide-react";

export default function Skills() {
  const { darkMode } = useTheme();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.skills) {
        setSkills(res.data.skills);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!skills || skills.length === 0) return null;

  // Let's filter the skills into categories dynamically based on keywords
  const getCategorySkills = (category) => {
    switch (category) {
      case "Languages":
        return skills.filter(s => ["javascript", "python", "java", "c ("].some(kw => s.toLowerCase().includes(kw)));
      case "Frontend":
        return skills.filter(s => ["react", "vite", "html", "css", "tailwind"].some(kw => s.toLowerCase().includes(kw)));
      case "Backend & Database":
        return skills.filter(s => ["node", "express", "mongo", "mongoose", "mysql", "firebase", "restful"].some(kw => s.toLowerCase().includes(kw)));
      case "AI & Machine Learning":
        return skills.filter(s => ["generative", "gemini", "prompt", "retrieval", "agent", "mcp", "cognitive", "affective", "machine"].some(kw => s.toLowerCase().includes(kw)));
      case "Tools & Deployment":
        return skills.filter(s => ["git", "github", "postman", "vs code", "colab", "copilot", "agentspace", "claude", "api", "cloud", "render"].some(kw => s.toLowerCase().includes(kw)));
      default:
        return [];
    }
  };

  const categories = [
    { name: "Languages", icon: Code, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { name: "Frontend", icon: Shield, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Backend & Database", icon: Server, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { name: "AI & Machine Learning", icon: Brain, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { name: "Tools & Deployment", icon: Wrench, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 radial-glow-1 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Brain className="w-4 h-4" />
            <span>Tech Stack</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}>
            Skills & Expertise
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            My core programming capabilities, frameworks, database systems, and AI engineering stack.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const catSkills = getCategorySkills(cat.name);
            if (catSkills.length === 0) return null;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`p-8 rounded-3xl glow-card transition-all duration-500 ${
                  darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl border ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-950"}`}>
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {catSkills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition cursor-default ${
                        darkMode 
                          ? "bg-gray-800/60 hover:bg-blue-900/40 text-gray-200 border border-gray-700/60 hover:border-blue-500/40" 
                          : "bg-gray-100 hover:bg-blue-50 text-gray-700 border border-gray-200 hover:border-blue-200"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
