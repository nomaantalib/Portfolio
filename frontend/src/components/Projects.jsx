import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { ExternalLink, Code2, Sparkles, Download } from "lucide-react";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


import { localData } from "../localData";

export default function Projects({ projects: propProjects = localData.projects }) {
  const [projects, setProjects] = useState(propProjects);
  const { darkMode } = useTheme();

  useEffect(() => {
    setProjects(propProjects);
  }, [propProjects]);

  return (
    <section id="projects" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95" : "bg-white"
    }`}>
      {/* Background decorations */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 radial-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 radial-glow-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Code2 className="w-4 h-4" />
            <span>My Works</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Featured Projects
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            A showcase of production-ready AI agents, collaborative platforms, and workflow automations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`flex flex-col p-6 rounded-3xl glow-card transition-all duration-500 ${
                darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
              }`}
            >
              <div className="flex-1">
                {/* Heading / Info */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className={`text-xl md:text-2xl font-bold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                    {project.title}
                  </h3>
                  <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                </div>

                <p className={`text-sm md:text-base leading-relaxed mb-6 ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}>
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="mb-6">
                  <p className={`text-xs uppercase tracking-wider font-semibold mb-2.5 ${darkMode ? "text-gray-400" : "text-black"}`}>
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, j) => (
                      <span
                        key={j}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          darkMode
                            ? "bg-indigo-950/20 text-indigo-300 border-indigo-500/20"
                            : "bg-indigo-50 text-indigo-600 border-indigo-200"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hyperlinks */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 flex-1 py-2.5 border rounded-full font-bold text-sm transition ${
                        darkMode
                          ? "border-gray-700 bg-gray-800/40 text-gray-200 hover:bg-gray-800"
                          : "border-gray-300 bg-white text-black hover:bg-gray-100"
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Codebase</span>
                    </motion.a>
                  )}

                  {project.live && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-sm transition shadow-lg shadow-indigo-600/20"
                    >
                      {project.liveText && project.liveText.toLowerCase().includes("download") ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      <span>{project.liveText || "Live Demo"}</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
