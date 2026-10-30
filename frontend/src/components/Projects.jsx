import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { 
  ExternalLink, Download, Smartphone, 
  ChevronLeft, ChevronRight, LayoutGrid, Sliders, 
  CheckCircle2, ArrowRight, Play, Pause, Cpu
} from "lucide-react";
import { localData } from "../localData";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects({ projects: propProjects = localData.projects }) {
  const [projects, setProjects] = useState(propProjects);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
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

  useEffect(() => {
    setPage([0, 0]);
  }, [activeTab]);

  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "carousel") return;
    const timer = setInterval(() => {
      setPage(([prevPage]) => [prevPage + 1, 1]);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, filteredProjects.length]);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const jumpToSlide = (idx) => {
    const dir = idx > currentIndex ? 1 : -1;
    setPage([idx, dir]);
  };

  return (
    <section id="projects" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#485b2e] dark:text-[#8ea86d] mb-2">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2214] dark:text-[#f5f2ea]">
            Featured Projects & PWAs
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#566049] dark:text-[#a3a99a] max-w-2xl">
            Installable Progressive Web Apps, Agentic AI systems, and production platforms delivering measurable business impact.
          </p>
        </div>

        {/* Filter Tabs & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#ded5c2] dark:border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08]">
            {[
              { id: "all", label: "All Projects", count: projects.length },
              { id: "pwa", label: "PWAs", count: projects.filter(p => p.category === "pwa").length },
              { id: "ai", label: "AI Systems", count: projects.filter(p => p.category === "ai").length },
              { id: "app", label: "Apps", count: projects.filter(p => p.category === "app").length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-[#364421] text-[#f7f3ea] dark:bg-[#8ea86d] dark:text-black"
                    : "text-[#5c684e] hover:text-[#1b2214] dark:text-[#a3a99a] dark:hover:text-[#f5f2ea]"
                }`}
              >
                {tab.id === "pwa" && <Smartphone className="w-3 h-3" />}
                {tab.id === "ai" && <Cpu className="w-3 h-3" />}
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id 
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-black" 
                    : "bg-[#eae1cf] dark:bg-[#1a2016] text-[#5c684e] dark:text-[#9ea695]"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "carousel" : "grid")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] text-[#2c361e] dark:text-[#f5f2ea] hover:border-[#485b2e] dark:hover:border-[#8ea86d] transition-colors cursor-pointer w-fit"
            title="Toggle View Mode"
          >
            {viewMode === "grid" ? (
              <>
                <Sliders className="w-3.5 h-3.5 text-[#485b2e] dark:text-[#8ea86d]" />
                <span>Carousel View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-[#485b2e] dark:text-[#8ea86d]" />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>

        {/* --- GRID SHOWCASE VIEW --- */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <div
                key={project.title + i}
                className="flex flex-col justify-between p-6 rounded-2xl border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] hover:border-[#b59e5f] dark:hover:border-[#8ea86d]/40 transition-colors shadow-xs"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-md font-medium border flex items-center gap-1 bg-[#eee7d7] text-[#3e5026] border-[#dcd1bc] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                      {project.category === "pwa" && <Smartphone className="w-3 h-3" />}
                      <span>{project.categoryLabel || "Project"}</span>
                    </span>

                    {project.live && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#3e5026] dark:text-[#8ea86d]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#465a2b] dark:bg-[#8ea86d]" />
                        <span>Live</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1b2214] dark:text-[#f5f2ea] leading-snug mb-2">
                    {project.live || project.github ? (
                      <a
                        href={project.live || project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#485b2e] dark:hover:text-[#8ea86d] transition-colors inline-flex items-center gap-1.5 group"
                      >
                        <span>{project.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  {/* Metric Pill */}
                  {project.metric && (
                    <div className="mb-3 px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-medium bg-[#f4efe3] dark:bg-black border-[#ded5c2] dark:border-white/[0.08] text-[#2c371d] dark:text-[#d0d8cb]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#485b2e] dark:text-[#8ea86d]" />
                      <span>{project.metric}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-[#566049] dark:text-[#a3a99a] mb-4">
                    {project.desc}
                  </p>
                </div>

                <div>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.techStack.slice(0, 4).map((tech, j) => (
                      <span
                        key={j}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium border bg-[#f3ede1] dark:bg-[#181e15] text-[#2c361e] dark:text-[#cbd4c3] border-[#ded5c2] dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium text-[#737c68] dark:text-[#9ea695]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#ede6d6] dark:border-white/[0.06]">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded-lg text-xs font-medium bg-[#364421] hover:bg-[#2b371a] text-[#f7f3ea] dark:bg-[#8ea86d] dark:text-black dark:hover:bg-[#9cb67a] transition-colors shadow-xs"
                      >
                        {project.category === "pwa" ? (
                          <Smartphone className="w-3.5 h-3.5" />
                        ) : project.liveText?.toLowerCase().includes("download") ? (
                          <Download className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        <span>{project.liveText || "Live Demo"}</span>
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-[#cfc3ab] dark:border-white/15 hover:border-[#485b2e] dark:hover:border-[#8ea86d] text-xs font-medium text-[#222b17] dark:text-[#f5f2ea] bg-[#fcfaf5] dark:bg-transparent transition-colors"
                        title="View Source Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- CAROUSEL VIEW --- */}
        {viewMode === "carousel" && filteredProjects.length > 0 && (
          <div className="space-y-6">
            <div className="p-6 sm:p-10 rounded-2xl border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] shadow-xs">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                
                {/* Left column */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-medium border bg-[#eee7d7] text-[#3e5026] border-[#dcd1bc] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                      {activeProject.categoryLabel || "Featured Project"}
                    </span>
                    {activeProject.metric && (
                      <span className="text-xs px-2.5 py-0.5 rounded-md font-medium border bg-[#f4efe3] dark:bg-black border-[#ded5c2] dark:border-white/[0.08] text-[#2c371d] dark:text-[#d0d8cb] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#485b2e] dark:text-[#8ea86d]" />
                        <span>{activeProject.metric}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1b2214] dark:text-[#f5f2ea]">
                    {activeProject.title}
                  </h3>

                  {activeProject.problem && (
                    <div className="p-3.5 rounded-xl border bg-[#f4efe3] dark:bg-black border-[#ded5c2] dark:border-white/[0.08]">
                      <p className="text-[10px] uppercase font-bold text-[#485b2e] dark:text-[#8ea86d] mb-1">
                        Problem Solved
                      </p>
                      <p className="text-xs sm:text-sm text-[#4f5844] dark:text-[#b4bbad] leading-relaxed">
                        {activeProject.problem}
                      </p>
                    </div>
                  )}

                  {activeProject.bullets && activeProject.bullets.length > 0 ? (
                    <ul className="space-y-2 pt-1">
                      {activeProject.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4f5844] dark:text-[#b4bbad] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4a5c30] dark:bg-[#8ea86d] shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#4f5844] dark:text-[#b4bbad] leading-relaxed">
                      {activeProject.desc}
                    </p>
                  )}
                </div>

                {/* Right column */}
                <div className="md:col-span-5 p-5 rounded-xl border bg-[#f4efe3] dark:bg-black border-[#ded5c2] dark:border-white/[0.08] space-y-4">
                  <div>
                    <p className="text-[11px] uppercase font-bold text-[#6a7260] dark:text-[#9ea695] mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs px-2.5 py-1 rounded-md font-medium border bg-[#fcfbf7] dark:bg-[#181e15] text-[#2c361e] dark:text-[#f5f2ea] border-[#ded5c2] dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#ded5c2] dark:border-white/[0.08] space-y-2">
                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium bg-[#364421] hover:bg-[#2b371a] text-[#f7f3ea] dark:bg-[#8ea86d] dark:text-black dark:hover:bg-[#9cb67a] transition-colors shadow-xs"
                      >
                        {activeProject.category === "pwa" ? (
                          <Smartphone className="w-4 h-4" />
                        ) : activeProject.liveText?.toLowerCase().includes("download") ? (
                          <Download className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                        <span>{activeProject.liveText || "Explore Live Application"}</span>
                      </a>
                    )}

                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-[#cfc3ab] dark:border-white/15 hover:border-[#485b2e] dark:hover:border-[#8ea86d] text-xs font-medium text-[#222b17] dark:text-[#f5f2ea] bg-[#fcfaf5] dark:bg-transparent transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Navigation Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#6c7661] dark:text-[#9ea695]">
                <span>Project</span>
                <span className="font-bold text-[#1b2214] dark:text-[#f5f2ea]">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(filteredProjects.length).padStart(2, '0')}</span>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {filteredProjects.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => jumpToSlide(dotIdx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === dotIdx
                        ? "w-6 bg-[#4a5c30] dark:bg-[#8ea86d]"
                        : "w-1.5 bg-[#dcd1bc] dark:bg-white/20"
                    }`}
                    title={`Slide to project ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-2.5 py-1.5 rounded-lg border text-xs font-medium bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] text-[#5c684e] dark:text-[#a3a99a] cursor-pointer flex items-center gap-1"
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoPlaying ? "Pause" : "Auto"}</span>
                </button>

                <button
                  onClick={() => paginate(-1)}
                  className="p-1.5 rounded-lg border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] text-[#1b2214] dark:text-[#f5f2ea] hover:border-[#485b2e] dark:hover:border-[#8ea86d] cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="p-1.5 rounded-lg border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] text-[#1b2214] dark:text-[#f5f2ea] hover:border-[#485b2e] dark:hover:border-[#8ea86d] cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
