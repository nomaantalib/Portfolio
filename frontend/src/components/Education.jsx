import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { api } from "../api";
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
    <section id="education" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95 text-white" : "bg-white text-black"
    }`}>
      {/* Background radial highlight */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold mb-4 border border-purple-500/20">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Education
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            My degrees, certificates, and academic achievements.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div ref={containerRef} className="relative pl-8 md:pl-10 space-y-12 max-w-3xl mx-auto">
          {/* Base dashed track line */}
          <div className="absolute left-0 top-1.5 w-[2px] h-[95%] border-l-2 border-dashed border-purple-500/20" />
          {/* Animated solid overlay track line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-0 top-1.5 w-[2px] h-[95%] bg-purple-500 origin-top"
          />
          {educationList.map((edu, i) => {
            const schoolLink = getWebsiteLink(edu);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-purple-500/20 border-purple-500 z-10">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                </div>

                {/* Card */}
                <div className={`p-8 rounded-3xl glow-card-purple transition-all duration-500 ${
                  darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                        {edu.degree}
                      </h3>
                      <p className="text-purple-400 font-semibold mt-1 text-base">
                        {schoolLink ? (
                          <a href={schoolLink} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            <span>{edu.institution}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        ) : (
                          edu.institution
                        )}
                      </p>
                    {edu.association && (
                      <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-black"}`}>
                        {edu.association}
                      </p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                    darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-black"
                  }`}>
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{edu.duration}</span>
                  </div>
                </div>

                <div className={`text-sm md:text-base leading-relaxed mb-6 font-bold flex items-center gap-1.5 ${
                  darkMode ? "text-gray-200" : "text-black"
                }`}>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                      className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold transition ${
                        darkMode 
                          ? "border-gray-700 bg-gray-800/40 text-gray-200 hover:bg-gray-800 hover:border-gray-600" 
                          : "border-gray-300 bg-white text-black hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>View Marksheet</span>
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