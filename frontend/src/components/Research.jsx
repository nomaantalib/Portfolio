import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { BookOpen, Award, ExternalLink, ShieldCheck, Sparkles, Mic2 } from "lucide-react";

import { localData } from "../localData";

export default function Research({ researchList: propResearchList = localData.research }) {
  const { darkMode } = useTheme();
  const [researchList, setResearchList] = useState(propResearchList);

  useEffect(() => {
    setResearchList(propResearchList);
  }, [propResearchList]);

  return (
    <section id="research" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-transparent text-slate-900"
    }`}>
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 radial-glow-1 -translate-y-1/2 pointer-events-none ambient-orb-1" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 radial-glow-2 -translate-y-1/2 pointer-events-none ambient-orb-2" />

      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold mb-4 border border-purple-500/20">
            <Award className="w-4 h-4" />
            <span>Peer-Reviewed Academic Publication</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
            Scientific Contribution
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
            Peer-reviewed research exploring the intersection of Cognitive Architectures, Affective AI, and Dual-Memory RAG.
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {researchList.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`p-8 md:p-10 rounded-3xl glow-card-purple cinematic-sweep transition-all duration-300 ${
                darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {paper.conference}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-bold mt-3 leading-snug ${
                    darkMode ? "text-white hover:text-purple-300" : "text-black hover:text-purple-600"
                  } transition-colors`}>
                    {paper.title}
                  </h3>
                </div>
                {paper.link && (
                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full font-bold transition shadow-lg shadow-purple-600/25 hover:scale-105 active:scale-95 text-sm shrink-0"
                  >
                    <span>Read IEEE Paper</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className={`grid md:grid-cols-3 gap-4 mb-6 py-4 px-5 rounded-2xl border ${
                darkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              }`}>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">IEEE Record</p>
                  <p className={`font-semibold ${darkMode ? "text-gray-200" : "text-black"}`}>{paper.record}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Paper ID</p>
                  <p className={`font-semibold ${darkMode ? "text-gray-200" : "text-black"}`}>{paper.paperId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Status</p>
                  <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{paper.status}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {paper.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-slate-700"}`}>
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
