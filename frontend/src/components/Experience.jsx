import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { Briefcase, Calendar, FileText, ExternalLink, CheckCircle2, Terminal, ShieldAlert, Cpu } from "lucide-react";

import { localData } from "../localData";

export default function Experience({ experienceList: propExperienceList = localData.experience }) {
  const { darkMode } = useTheme();
  const [experienceList, setExperienceList] = useState(propExperienceList);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleYSprung = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });
  const scaleY = useTransform(scaleYSprung, [0, 1], [0, 1]);

  useEffect(() => {
    setExperienceList(propExperienceList);
  }, [propExperienceList]);

  return (
    <section id="experience" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-white/40 backdrop-blur-xs text-slate-900 border-y border-slate-200/80"
    }`}>
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 radial-glow-1 pointer-events-none ambient-orb-1" />

      <div className="max-w-5xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm ${
            darkMode 
              ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" 
              : "bg-white text-blue-950 border border-slate-300 font-bold shadow-sm"
          }`}>
            <Briefcase className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-700"}`} />
            <span>Employment & Industry Experience</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
            Work Experience
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
            Proven engineering track record in enterprise AI agent benchmarking, synthetic SaaS backend replication, and ML production pipelines.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative pl-8 md:pl-10 space-y-12 max-w-4xl mx-auto">
          {/* Base dashed track line */}
          <div className="absolute left-0 top-1.5 w-[2px] h-[95%] border-l-2 border-dashed border-blue-500/20" />
          {/* Animated solid overlay track line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-0 top-1.5 w-[2px] h-[95%] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 origin-top shadow-[0_0_12px_rgba(99,102,241,0.6)]"
          />

          {experienceList.map((exp, i) => {
            const companyLink = exp.companyLink || (
              exp.company.toLowerCase().includes("turing") ? "https://www.turing.com/" :
              exp.company.toLowerCase().includes("sipher web") ? "https://www.sipherweb.com/" : null
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline glowing dot with radar pulse */}
                <div className={`absolute -left-[41px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-2 z-10 shadow-lg ${
                  darkMode ? "bg-blue-500/20 border-blue-500 shadow-blue-500/30 text-blue-400" : "bg-white border-blue-600 text-blue-800 shadow-md shadow-slate-900/10"
                }`}>
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Card with cinematic sweep */}
                <div className={`p-8 md:p-10 rounded-3xl glow-card cinematic-sweep transition-all duration-300 ${
                  darkMode ? "glass-panel" : "bg-white border border-slate-300 shadow-xl shadow-slate-900/5 text-slate-900"
                }`}>
                  {/* Top Bar: Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900 font-extrabold"}`}>
                          {exp.title}
                        </h3>
                        {exp.isCurrent && (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            darkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${darkMode ? "bg-emerald-500" : "bg-emerald-600"}`}></span>
                            Current Role
                          </span>
                        )}
                      </div>

                      <p className={`font-semibold text-base ${darkMode ? "text-blue-400" : "text-blue-700 font-extrabold"}`}>
                        {companyLink ? (
                          <a href={companyLink} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1 group">
                            <span>{exp.company}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </p>
                    </div>

                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                      darkMode ? "bg-gray-800 text-gray-300" : "bg-slate-100 text-slate-800 border border-slate-200 font-bold shadow-xs"
                    }`}>
                      <Calendar className={`w-3.5 h-3.5 ${darkMode ? "text-blue-400" : "text-blue-700"}`} />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Summary phrase */}
                  {exp.description && (
                    <p className={`text-sm md:text-base font-medium mb-4 italic ${
                      darkMode ? "text-indigo-300/90" : "text-indigo-900 font-semibold"
                    }`}>
                      "{exp.description}"
                    </p>
                  )}

                  {/* Bullets */}
                  <ul className="space-y-3 mb-6">
                    {(exp.details || [exp.description]).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-1 ${darkMode ? "text-indigo-400" : "text-indigo-700"}`} />
                        <p className={`text-xs md:text-sm leading-relaxed ${
                          darkMode ? "text-gray-300" : "text-slate-800 font-medium"
                        }`}>
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Skills Pills */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                            darkMode 
                              ? "bg-gray-900/60 text-gray-300 border-gray-800" 
                              : "bg-slate-100 text-slate-800 border-slate-300 font-semibold shadow-xs"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Certificate Link if available */}
                  {exp.certificateLink && (
                    <div className="pt-4 border-t border-white/5">
                      <a
                        href={exp.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border shadow-sm transition ${
                          darkMode ? "text-blue-400 hover:text-blue-300 bg-blue-500/10 border-blue-500/20" : "text-blue-900 hover:text-blue-950 bg-blue-50 border-blue-300 shadow-sm font-bold hover:bg-blue-100"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Internship Certificate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
