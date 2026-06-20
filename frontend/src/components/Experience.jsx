import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { api } from "../api";
import { useTheme } from "../ThemeContext";
import { Briefcase, Calendar, FileText, ExternalLink } from "lucide-react";

export default function Experience() {
  const { darkMode } = useTheme();
  const [experienceList, setExperienceList] = useState([]);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleYSprung = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });
  const scaleY = useTransform(scaleYSprung, [0, 1], [0, 1]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.experience) {
        setExperienceList(res.data.experience);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!experienceList || experienceList.length === 0) return null;

  return (
    <section id="experience" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-gray-50 text-black"
    }`}>
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Briefcase className="w-4 h-4" />
            <span>Employment History</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Work Experience
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            My internship experience applying ML and Generative AI to product pipelines.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative pl-8 md:pl-10 space-y-12 max-w-3xl mx-auto">
          {/* Base dashed track line */}
          <div className="absolute left-0 top-1.5 w-[2px] h-[95%] border-l-2 border-dashed border-blue-500/20" />
          {/* Animated solid overlay track line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-0 top-1.5 w-[2px] h-[95%] bg-blue-500 origin-top"
          />
          {experienceList.map((exp, i) => {
            const companyLink = exp.companyLink || (exp.company.toLowerCase().includes("sipher web") ? "https://www.sipherweb.com/" : null);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-blue-500/20 border-blue-500 z-10">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                </div>

                {/* Card */}
                <div className={`p-8 rounded-3xl glow-card transition-all duration-500 ${
                  darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-semibold mt-1 text-base">
                        {companyLink ? (
                          <a href={companyLink} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            <span>{exp.company}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </p>
                    </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-black"
                  }`}>
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <p className={`text-sm md:text-base leading-relaxed mb-6 ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}>
                  {exp.description}
                </p>

                {exp.certificateLink && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={exp.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition shadow-lg shadow-blue-600/20 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Internship Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
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