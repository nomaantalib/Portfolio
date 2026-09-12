import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { 
  ExternalLink, Code2, Download, Smartphone, 
  ChevronLeft, ChevronRight, LayoutGrid, Sliders, 
  CheckCircle2, ArrowRight, Play, Pause, Layers
} from "lucide-react";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import { localData } from "../localData";

// Dynamic Carousel animation variants with directional slide + depth scale + blur fade
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.95,
    filter: "blur(6px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 260, damping: 26 },
      opacity: { duration: 0.35, ease: "easeOut" },
      scale: { duration: 0.35, ease: "easeOut" },
      filter: { duration: 0.3 },
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.95,
    filter: "blur(6px)",
    transition: {
      duration: 0.28,
      ease: "easeInOut",
    },
  }),
};

export default function Projects({ projects: propProjects = localData.projects }) {
  const [projects, setProjects] = useState(propProjects);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("carousel"); // "carousel" | "grid"
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    setProjects(propProjects);
  }, [propProjects]);

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "pwa") return p.category === "pwa";
    if (activeTab === "ai") return p.category === "ai";
    if (activeTab === "app") return p.category === "app";
    return true;
  });

  const currentIndex = ((page % filteredProjects.length) + filteredProjects.length) % filteredProjects.length;
  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  // Reset page index when active tab changes
  useEffect(() => {
    setPage([0, 0]);
  }, [activeTab]);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "carousel") return;
    const timer = setInterval(() => {
      setPage(([prevPage]) => [prevPage + 1, 1]);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, filteredProjects.length]);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const jumpToSlide = (idx) => {
    const dir = idx > currentIndex ? 1 : -1;
    setPage([idx, dir]);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 || offset.x < -60) {
      paginate(1);
    } else if (swipe > 100 || offset.x > 60) {
      paginate(-1);
    }
  };

  return (
    <section id="projects" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95" : "bg-transparent text-slate-900"
    }`}>
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 radial-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 radial-glow-2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-1">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <Code2 className="w-4 h-4" />
            <span>Product Portfolio & Engineering Case Studies</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Featured Projects & PWAs
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            Production-grade AI agentic workflows, installable progressive web apps, and data-driven products delivered with measurable metrics.
          </p>
        </motion.div>

        {/* Filter Tabs & View Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md bg-gray-900/20">
            {[
              { id: "all", label: "All Projects", count: projects.length },
              { id: "pwa", label: "PWA Deployments", count: projects.filter(p => p.category === "pwa").length },
              { id: "ai", label: "AI Case Studies", count: projects.filter(p => p.category === "ai").length },
              { id: "app", label: "Mobile Apps", count: projects.filter(p => p.category === "app").length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : darkMode 
                      ? "text-gray-400 hover:text-white hover:bg-gray-800/50" 
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-500/10 text-gray-400"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode & Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                darkMode ? "border-gray-800 bg-gray-900/60 text-gray-200 hover:bg-gray-800" : "border-gray-200 bg-white text-black hover:bg-gray-50 shadow-sm"
              }`}
              title="Toggle Layout Mode"
            >
              {viewMode === "carousel" ? (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Switch to Grid View</span>
                </>
              ) : (
                <>
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Switch to Carousel View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- DYNAMIC CAROUSEL VIEW --- */}
        {viewMode === "carousel" && filteredProjects.length > 0 && (
          <div className="relative">
            <div className="relative min-h-[490px] flex items-center overflow-hidden py-2">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                  className={`w-full p-8 md:p-12 rounded-3xl glow-card border transition-all duration-500 cursor-grab active:cursor-grabbing ${
                    darkMode ? "glass-panel border-gray-800/80" : "glass-panel-light shadow-2xl border-gray-200"
                  }`}
                >
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Metrics & Problem Statement */}
                    <div className="md:col-span-7 space-y-5">
                      {/* Category & Metric Pills */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                          activeProject.category === "pwa"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                        }`}>
                          {activeProject.categoryLabel || "Featured Project"}
                        </span>

                        {activeProject.metric && (
                          <span className={`text-xs px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
                            darkMode ? "bg-purple-950/30 text-purple-300 border-purple-500/30" : "bg-purple-50 text-purple-700 border-purple-200"
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                            <span>{activeProject.metric}</span>
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight ${
                        darkMode ? "text-white" : "text-black"
                      }`}>
                        {activeProject.title}
                      </h3>

                      {/* Problem Statement Box */}
                      {activeProject.problem && (
                        <div className={`p-4 rounded-2xl border ${
                          darkMode 
                            ? "bg-indigo-950/20 border-indigo-500/20 text-indigo-200" 
                            : "bg-indigo-50/60 border-indigo-200 text-indigo-900"
                        }`}>
                          <p className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400 mb-1">
                            The Problem Solved
                          </p>
                          <p className="text-sm font-medium leading-relaxed">
                            {activeProject.problem}
                          </p>
                        </div>
                      )}

                      {/* Main Description */}
                      <p className={`text-sm md:text-base leading-relaxed ${
                        darkMode ? "text-gray-300" : "text-black"
                      }`}>
                        {activeProject.desc}
                      </p>
                    </div>

                    {/* Right Column: Tech Stack & Action Links */}
                    <div className="md:col-span-5 space-y-6 md:pl-4 md:border-l border-white/10">
                      {/* Tech Stack Group */}
                      <div>
                        <p className={`text-xs uppercase tracking-wider font-bold mb-3 ${
                          darkMode ? "text-gray-400" : "text-black"
                        }`}>
                          Technologies & Frameworks
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.techStack.map((tech, j) => (
                            <span
                              key={j}
                              className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                                darkMode
                                  ? "bg-gray-800/60 text-gray-200 border-gray-700 hover:border-indigo-500/40"
                                  : "bg-gray-100 text-black border-gray-200"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-4 border-t border-white/5 space-y-3">
                        {activeProject.live && (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={activeProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-indigo-600/30 cursor-pointer"
                          >
                            {activeProject.category === "pwa" ? (
                              <Smartphone className="w-4 h-4" />
                            ) : activeProject.liveText?.toLowerCase().includes("download") ? (
                              <Download className="w-4 h-4" />
                            ) : (
                              <ExternalLink className="w-4 h-4" />
                            )}
                            <span>{activeProject.liveText || "Explore Live Application"}</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </motion.a>
                        )}

                        {activeProject.github && (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 w-full py-3 border rounded-2xl font-bold text-sm transition ${
                              darkMode
                                ? "border-gray-700 bg-gray-800/40 text-gray-200 hover:bg-gray-800"
                                : "border-gray-300 bg-white text-black hover:bg-gray-100 shadow-sm"
                            }`}
                          >
                            <Github className="w-4 h-4" />
                            <span>View Source Codebase</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Slide Navigation Pill Strip */}
            <div className="flex items-center gap-2 overflow-x-auto py-3 px-1 scrollbar-none mt-4">
              {filteredProjects.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToSlide(idx)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer border ${
                    currentIndex === idx
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 scale-105"
                      : darkMode
                        ? "bg-gray-900/60 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
                        : "bg-white text-gray-600 border-gray-200 hover:text-black hover:border-gray-300 shadow-sm"
                  }`}
                >
                  <span>{p.title.split("—")[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Carousel Navigation Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
              {/* Slide Counter */}
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <span>PROJECT</span>
                <span className={`text-base font-black ${darkMode ? "text-white" : "text-black"}`}>
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(filteredProjects.length).padStart(2, '0')}</span>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {filteredProjects.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => jumpToSlide(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === dotIdx
                        ? "w-8 bg-indigo-500"
                        : "w-2 bg-gray-700/50 hover:bg-gray-500"
                    }`}
                    title={`Slide to project ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next & Auto-Play Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isAutoPlaying 
                      ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" 
                      : darkMode ? "border-gray-800 text-gray-400 hover:text-white" : "border-gray-200 text-gray-600 hover:text-black"
                  }`}
                  title={isAutoPlaying ? "Pause Auto Slide" : "Start Auto Slide"}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="text-[11px] hidden sm:inline">{isAutoPlaying ? "Playing" : "Auto"}</span>
                </button>

                <button
                  onClick={() => paginate(-1)}
                  className={`p-2.5 rounded-xl border transition hover:scale-105 active:scale-95 cursor-pointer ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/60 text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "border-gray-200 bg-white text-black hover:bg-gray-100 shadow-sm"
                  }`}
                  title="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => paginate(1)}
                  className={`p-2.5 rounded-xl border transition hover:scale-105 active:scale-95 cursor-pointer ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/60 text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "border-gray-200 bg-white text-black hover:bg-gray-100 shadow-sm"
                  }`}
                  title="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- GRID SHOWCASE VIEW --- */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (i % 6) * 0.05, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`flex flex-col p-7 rounded-3xl glow-card transition-all duration-500 justify-between ${
                  darkMode ? "glass-panel" : "glass-panel-light shadow-xl"
                }`}
              >
                <div>
                  {/* Category & Metric Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                      project.category === "pwa"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                    }`}>
                      {project.categoryLabel || "Project"}
                    </span>

                    {project.metric && (
                      <span className="text-[10px] font-bold text-purple-400 truncate max-w-[170px]" title={project.metric}>
                        {project.metric}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold leading-tight mb-2.5 ${darkMode ? "text-white" : "text-black"}`}>
                    {project.title}
                  </h3>

                  {/* Problem snippet */}
                  {project.problem && (
                    <p className={`text-xs mb-3 font-semibold p-2.5 rounded-xl border ${
                      darkMode ? "bg-gray-900/50 border-gray-800 text-indigo-300" : "bg-indigo-50 border-indigo-100 text-indigo-900"
                    }`}>
                      {project.problem}
                    </p>
                  )}

                  {/* Description */}
                  <p className={`text-xs md:text-sm leading-relaxed mb-5 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}>
                    {project.desc}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((tech, j) => (
                        <span
                          key={j}
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${
                            darkMode
                              ? "bg-indigo-950/20 text-indigo-300 border-indigo-500/20"
                              : "bg-indigo-50 text-indigo-600 border-indigo-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full text-gray-400 font-bold">
                          +{project.techStack.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hyperlinks */}
                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/5">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 border rounded-xl font-bold text-xs transition ${
                          darkMode
                            ? "border-gray-700 bg-gray-800/40 text-gray-200 hover:bg-gray-800"
                            : "border-gray-300 bg-white text-black hover:bg-gray-100"
                        }`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Codebase</span>
                      </motion.a>
                    )}

                    {project.live && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition shadow-md shadow-indigo-600/25"
                      >
                        {project.category === "pwa" ? (
                          <Smartphone className="w-3.5 h-3.5" />
                        ) : project.liveText?.toLowerCase().includes("download") ? (
                          <Download className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        <span>{project.liveText || "Live Demo"}</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
