import { useEffect, useState, useRef } from "react";
import { useTheme } from "../ThemeContext";
import { 
  ExternalLink, Download, Smartphone, 
  ChevronLeft, ChevronRight, 
  CheckCircle2, Play, Pause, Cpu
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const { darkMode } = useTheme();

  useEffect(() => {
    setProjects(propProjects);
  }, [propProjects]);

  // Dynamically track visible tiles (3 on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "pwa") return p.category === "pwa";
    if (activeTab === "ai") return p.category === "ai";
    if (activeTab === "app") return p.category === "app";
    return true;
  });

  const maxIndex = Math.max(0, filteredProjects.length - visibleCount);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Automatic slideshow
  useEffect(() => {
    if (isPaused || filteredProjects.length <= visibleCount) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, filteredProjects.length, visibleCount, maxIndex]);

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const slideNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 border-t border-[#ded5c2] dark:border-white/[0.08] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-[#24331b] dark:bg-[#8ea86d]/15 text-[#eed07b] dark:text-[#8ea86d] border-[#3e522b] dark:border-[#8ea86d]/30">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#12180d] dark:text-[#f5f2ea]">
            Featured Projects & PWAs
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#2f3923] dark:text-[#a3a99a] max-w-2xl font-normal">
            Installable Progressive Web Apps, Agentic AI systems, and production platforms delivering measurable business impact.
          </p>
        </div>

        {/* Filter Tabs & Auto Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#ded5c2] dark:border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08]">
            {[
              { id: "all", label: "All Projects", count: projects.length },
              { id: "pwa", label: "PWAs", count: projects.filter(p => p.category === "pwa").length },
              { id: "ai", label: "AI Systems", count: projects.filter(p => p.category === "ai").length },
              { id: "app", label: "Apps", count: projects.filter(p => p.category === "app").length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-[#d4a838] text-[#162010] shadow-xs"
                    : "text-[#eed07b]/80 hover:text-[#eed07b] dark:text-[#a3a99a] dark:hover:text-[#f5f2ea]"
                }`}
              >
                {tab.id === "pwa" && <Smartphone className="w-3 h-3" />}
                {tab.id === "ai" && <Cpu className="w-3 h-3" />}
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === tab.id 
                    ? "bg-black/20 text-[#162010]" 
                    : "bg-[#2f4021] text-[#eed07b] dark:bg-[#1a2016] dark:text-[#9ea695]"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Slideshow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1.5 rounded-lg border text-xs font-semibold bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] text-[#eed07b] dark:text-[#a3a99a] hover:border-[#d4a838] dark:hover:border-[#8ea86d] cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
              title={isPaused ? "Resume Auto Slideshow" : "Pause Auto Slideshow"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#e5be53]" /> : <Pause className="w-3.5 h-3.5 text-[#e5be53]" />}
              <span>{isPaused ? "Resume Auto" : "Auto Playing"}</span>
            </button>

            <button
              onClick={slidePrev}
              className="p-2 rounded-lg border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] text-[#eed07b] dark:text-[#f5f2ea] hover:border-[#d4a838] dark:hover:border-[#8ea86d] cursor-pointer transition-colors shadow-xs active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-[#e5be53]" />
            </button>

            <button
              onClick={slideNext}
              className="p-2 rounded-lg border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] text-[#eed07b] dark:text-[#f5f2ea] hover:border-[#d4a838] dark:hover:border-[#8ea86d] cursor-pointer transition-colors shadow-xs active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-[#e5be53]" />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL CAROUSEL WITH 3-TILE VIEW & FADING CORNERS ONLY --- */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fading Corner: Left */}
          <div 
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-28 z-20 transition-colors"
            style={{
              background: darkMode 
                ? "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" 
                : "linear-gradient(to right, rgba(247,243,234,1) 0%, rgba(247,243,234,0) 100%)"
            }}
          />

          {/* Fading Corner: Right */}
          <div 
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-28 z-20 transition-colors"
            style={{
              background: darkMode 
                ? "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" 
                : "linear-gradient(to left, rgba(247,243,234,1) 0%, rgba(247,243,234,0) 100%)"
            }}
          />

          {/* Carousel Track Container */}
          <div className="overflow-hidden py-3">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
              }}
            >
              {filteredProjects.map((project, i) => (
                <div
                  key={project.title + i}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-none px-3"
                >
                  <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] hover:border-[#d4a838] dark:hover:border-[#8ea86d]/40 transition-all shadow-md group">
                    <div>
                      {/* Category & Status */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-md font-bold border flex items-center gap-1 bg-[#2e3e22] text-[#eed07b] border-[#465e34] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                          {project.category === "pwa" && <Smartphone className="w-3 h-3 text-[#e5be53]" />}
                          <span>{project.categoryLabel || "Project"}</span>
                        </span>

                        {project.live && (
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#ffd875] dark:text-[#8ea86d]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd875] dark:bg-[#8ea86d] animate-pulse" />
                            <span>Live</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#eed07b] dark:text-[#f5f2ea] leading-snug mb-2.5">
                        {project.live || project.github ? (
                          <a
                            href={project.live || project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#ffd875] dark:hover:text-[#8ea86d] transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>{project.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity shrink-0" />
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>

                      {/* Metric Pill */}
                      {project.metric && (
                        <div className="mb-3.5 px-3 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold bg-[#2f4021] dark:bg-black border-[#465e34] dark:border-white/[0.08] text-[#ffd875] dark:text-[#d0d8cb]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#e5be53] dark:text-[#8ea86d]" />
                          <span>{project.metric}</span>
                        </div>
                      )}

                      {/* High-Contrast Golden Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-[#f6ecd5] dark:text-[#a3a99a] mb-5 font-normal">
                        {project.desc}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.slice(0, 4).map((tech, j) => (
                          <span
                            key={j}
                            className="text-[11px] px-2 py-0.5 rounded-md font-semibold border bg-[#2d3d20] dark:bg-[#181e15] text-[#eed07b] dark:text-[#cbd4c3] border-[#3e552d] dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold text-[#e5be53]/80 dark:text-[#9ea695]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-2 pt-3.5 border-t border-[#3e522b] dark:border-white/[0.06]">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-xs font-bold bg-[#d4a838] hover:bg-[#c4982a] text-[#162010] dark:bg-[#8ea86d] dark:text-black dark:hover:bg-[#9cb67a] transition-all shadow-xs"
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
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg border border-[#3e522b] dark:border-white/15 hover:border-[#d4a838] dark:hover:border-[#8ea86d] text-xs font-bold text-[#eed07b] dark:text-[#f5f2ea] bg-[#28381e] dark:bg-transparent transition-colors shadow-xs"
                            title="View Source Code"
                          >
                            <Github className="w-3.5 h-3.5 text-[#e5be53]" />
                            <span className="hidden sm:inline">Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === dotIdx
                    ? "w-7 bg-[#d4a838] dark:bg-[#8ea86d]"
                    : "w-1.5 bg-[#24331b]/40 dark:bg-white/20 hover:bg-[#d4a838]/60"
                }`}
                title={`Jump to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
