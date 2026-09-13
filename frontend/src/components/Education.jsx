import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { GraduationCap, Calendar, FileText, ExternalLink, Award } from "lucide-react";

import { localData } from "../localData";

export default function Education({ educationList: propEducationList = localData.education }) {
  const { darkMode } = useTheme();
  const [educationList, setEducationList] = useState(propEducationList);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleYSprung = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });
  const scaleY = useTransform(scaleYSprung, [0, 1], [0, 1]);

  useEffect(() => {
    setEducationList(propEducationList);
  }, [propEducationList]);

  const getWebsiteLink = (edu) => {
    if (edu.websiteLink) return edu.websiteLink;
    const name = edu.institution.toLowerCase();
    if (name.includes("integral university")) return "https://www.iul.ac.in/";
    if (name.includes("sumitra modern school")) return "https://www.sumitraschools.com/sumitra-modern-school/";
    return null;
  };

  return (
    <section id="education" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95 text-white" : "bg-white/40 backdrop-blur-xs text-slate-900 border-y border-slate-200/80"
    }`}>
      {/* Background radial highlight */}
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 radial-glow-2 pointer-events-none ambient-orb-2" />

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
              ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" 
              : "bg-white text-purple-950 border border-slate-300 font-bold shadow-sm"
          }`}>
            <GraduationCap className={`w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-700"}`} />
            <span>Academic Credentials & Certifications</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
            Education
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
            Verified university degree, rank holder standing, and IBM industry credentials.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div ref={containerRef} className="relative pl-8 md:pl-10 space-y-12 max-w-3xl mx-auto">
          {/* Base dashed track line */}
          <div className="absolute left-0 top-1.5 w-[2px] h-[95%] border-l-2 border-dashed border-purple-500/20" />
          {/* Animated solid overlay track line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-0 top-1.5 w-[2px] h-[95%] bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500 origin-top shadow-[0_0_12px_rgba(168,85,247,0.6)]"
          />
          {educationList.map((edu, i) => {
            const schoolLink = getWebsiteLink(edu);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[41px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-2 z-10 shadow-lg ${
                  darkMode ? "bg-purple-500/20 border-purple-500 shadow-purple-500/30 text-purple-400" : "bg-white border-purple-600 text-purple-800 shadow-md shadow-slate-900/10"
                }`}>
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>

                {/* Card with cinematic sweep */}
                <div className={`p-8 rounded-3xl glow-card-purple cinematic-sweep transition-all duration-300 ${
                  darkMode ? "glass-panel" : "bg-white border border-slate-300 shadow-xl shadow-slate-900/5 text-slate-900"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900 font-extrabold"}`}>
                        {edu.degree}
                      </h3>
                      <p className={`font-semibold mt-1 text-base ${darkMode ? "text-purple-400" : "text-purple-700 font-extrabold"}`}>
                        {schoolLink ? (
                          <a href={schoolLink} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1 group">
                            <span>{edu.institution}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
                          </a>
                        ) : (
                          edu.institution
                        )}
                      </p>
                      {edu.association && (
                        <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-slate-600 font-medium"}`}>
                          {edu.association}
                        </p>
                      )}
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                      darkMode ? "bg-gray-800 text-gray-300" : "bg-slate-100 text-slate-800 border border-slate-200 font-bold shadow-xs"
                    }`}>
                      <Calendar className={`w-3.5 h-3.5 ${darkMode ? "text-purple-400" : "text-purple-700"}`} />
                      <span>{edu.duration}</span>
                    </div>
                  </div>

                  <div className={`text-sm md:text-base leading-relaxed mb-6 font-bold flex items-center gap-1.5 ${
                    darkMode ? "text-gray-200" : "text-slate-900"
                  }`}>
                    <span className={`px-3 py-1 rounded-lg border ${
                      darkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs font-bold"
                    }`}>
                      {edu.details}
                    </span>
                  </div>

                  {/* Hyperlinks */}
                  <div className="flex flex-wrap gap-4">
                    {edu.marksheetLink && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={edu.marksheetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold transition shadow-sm ${
                          darkMode 
                            ? "border-gray-700 bg-gray-800/40 text-gray-200 hover:bg-gray-800 hover:border-gray-600" 
                            : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50 shadow-md font-bold"
                        }`}
                      >
                        <FileText className={`w-3.5 h-3.5 ${darkMode ? "text-purple-400" : "text-purple-700"}`} />
                        <span>View Verified Marksheet</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    )}

                    {edu.ibmCertificateLink && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={edu.ibmCertificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-bold transition shadow-lg shadow-purple-600/20"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>IBM Cloud & AI Credentials</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}