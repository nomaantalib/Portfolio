import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";
import { useTheme } from "../ThemeContext";
import { User, Award, BookOpen, HeartHandshake } from "lucide-react";

import { localData } from "../localData";

export default function About() {
  const { darkMode } = useTheme();
  const [data, setData] = useState(localData);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data) {
        setData(res.data);
      }
    }).catch(err => console.error(err));
  }, []);

  const stats = [
    { label: "B.Tech CGPA", value: "9.8 / 10", icon: BookOpen, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "IEEE Publications", value: "1 Paper Accepted", icon: Award, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Key Projects", value: "7 AI & Full-Stack", icon: HeartHandshake, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" }
  ];

  return (
    <section id="about" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95" : "bg-white"
    }`}>
      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-4 border border-indigo-500/20">
            <User className="w-4 h-4" />
            <span>Profile Overview</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            About Me
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            My background, core values, and scientific research in agentic workflows and cognitive AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Summary Text Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className={`md:col-span-7 p-8 rounded-3xl glow-card transition-all duration-500 ${
              darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
              Professional Profile
            </h3>
            <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-black"}`}>
              {data.summary}
            </p>
          </motion.div>

          {/* Key Stats Cards */}
          <div className="md:col-span-5 space-y-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`flex items-center gap-6 p-6 rounded-3xl border transition-all duration-300 ${
                    darkMode 
                      ? "border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 hover:border-gray-700" 
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className={`p-4 rounded-2xl border shrink-0 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-2xl font-extrabold leading-none ${darkMode ? "text-white" : "text-black"}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm mt-1.5 font-medium ${darkMode ? "text-gray-400" : "text-black"}`}>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
