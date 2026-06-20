import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";
import { useTheme } from "../ThemeContext";
import { BookOpen, Award, ExternalLink, ShieldCheck } from "lucide-react";

export default function Research() {
  const { darkMode } = useTheme();
  const [researchList, setResearchList] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.research) {
        setResearchList(res.data.research);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!researchList || researchList.length === 0) return null;

  return (
    <section id="research" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]" : "bg-gray-50"
    }`}>
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 radial-glow-1 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 radial-glow-2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Award className="w-4 h-4" />
            <span>Research & Publications</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Scientific Contribution
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            Peer-reviewed research exploring the intersection of Cognitive Architectures and Affective AI.
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {researchList.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`p-8 rounded-3xl glow-card-purple transition-all duration-500 ${
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
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-semibold transition shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95 text-sm shrink-0"
                  >
                    <span>Read Paper</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className={`grid md:grid-cols-3 gap-4 mb-6 py-4 px-5 rounded-2xl ${
                darkMode ? "bg-white/5" : "bg-black/5"
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
                    <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-black"}`}>
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
