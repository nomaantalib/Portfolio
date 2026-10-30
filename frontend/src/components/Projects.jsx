import { useEffect, useState, useRef, useMemo } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const { darkMode } = useTheme();

  useEffect(() => {
    setProjects(propProjects);
  }, [propProjects]);

  // Dynamically calculate visible tiles: 3 on desktop, 2 on tablet, 1 on mobile
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

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (activeTab === "all") return true;
      if (activeTab === "pwa") return p.category === "pwa";
      if (activeTab === "ai") return p.category === "ai";
      if (activeTab === "app") return p.category === "app";
      return true;
    });
  }, [projects, activeTab]);

  // Build seamless infinite scrolling track
  // We ensure there are enough cloned tiles so the carousel can loop infinitely without awkward jump cuts
  const { trackProjects, loopLength } = useMemo(() => {
    if (!filteredProjects || filteredProjects.length === 0) {
      return { trackProjects: [], loopLength: 0 };
    }

    let baseSet = [...filteredProjects];
    while (baseSet.length < 6) {
      baseSet = [...baseSet, ...filteredProjects];
    }

    const loopLength = baseSet.length;
    // Append the first few visible tiles at the end to allow uninterrupted forward sliding
    const trackProjects = [...baseSet, ...baseSet.slice(0, 4)];

    return { trackProjects, loopLength };
  }, [filteredProjects]);

  // Reset smoothly on category switch
  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(0);
  }, [activeTab]);

  const slideNext = () => {
    if (trackProjects.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const slidePrev = () => {
    if (trackProjects.length === 0) return;
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(loopLength);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(loopLength - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // When transition ends at loop boundary, reset seamlessly without animation
  const handleTransitionEnd = () => {
    if (loopLength > 0 && currentIndex >= loopLength) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex % loopLength);
    }
  };

  // Robust Auto Slideshow
  useEffect(() => {
    if (isPaused || isHovered || trackProjects.length === 0) return;

    const timer = setInterval(() => {
      slideNext();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, trackProjects.length, currentIndex, loopLength]);

  const jumpToProject = (idx) => {
    setIsTransitioning(true);
    setCurrentIndex(idx);
  };

  const activeDotIndex = filteredProjects.length > 0 
    ? (currentIndex % filteredProjects.length) 
    : 0;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 border-t border-[#384c28] dark:border-white/[0.08] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-[#182212] dark:bg-[#8ea86d]/15 text-[#ffd875] dark:text-[#8ea86d] border-[#384c28] dark:border-[#8ea86d]/30 shadow-xs">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-[#f5f2ea]">
            Featured Projects & PWAs
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/85 dark:text-[#a3a99a] max-w-2xl font-normal">
            Installable Progressive Web Apps, Agentic AI systems, and production platforms delivering measurable business impact.
          </p>
        </div>

        {/* Filter Tabs & Auto Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#384c28] dark:border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08]">
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
                    : "text-white/80 hover:text-white dark:text-[#a3a99a] dark:hover:text-[#f5f2ea]"
                }`}
              >
                {tab.id === "pwa" && <Smartphone className="w-3 h-3" />}
                {tab.id === "ai" && <Cpu className="w-3 h-3" />}
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === tab.id 
                    ? "bg-black/20 text-[#162010]" 
                    : "bg-[#24331b] text-white dark:bg-[#1a2016] dark:text-[#9ea695]"
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
              className="px-3 py-1.5 rounded-lg border text-xs font-semibold bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] text-white dark:text-[#a3a99a] hover:border-[#ffd875] dark:hover:border-[#8ea86d] cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
              title={isPaused ? "Resume Auto Slideshow" : "Pause Auto Slideshow"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#ffd875]" /> : <Pause className="w-3.5 h-3.5 text-[#ffd875]" />}
              <span>{isPaused ? "Paused" : "Auto Slideshow"}</span>
            </button>

            <button
              onClick={slidePrev}
              className="p-2 rounded-lg border bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] text-white dark:text-[#f5f2ea] hover:border-[#ffd875] dark:hover:border-[#8ea86d] cursor-pointer transition-colors shadow-xs active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-[#ffd875]" />
            </button>

            <button
              onClick={slideNext}
              className="p-2 rounded-lg border bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] text-white dark:text-[#f5f2ea] hover:border-[#ffd875] dark:hover:border-[#8ea86d] cursor-pointer transition-colors shadow-xs active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-[#ffd875]" />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL CAROUSEL WITH 3-TILE VIEW & FADING CORNERS ONLY --- */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Fading Corner: Left */}
          <div 
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-32 z-20 transition-colors"
            style={{
              background: darkMode 
                ? "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" 
                : "linear-gradient(to right, rgba(34,47,24,1) 0%, rgba(34,47,24,0) 100%)"
            }}
          />

          {/* Fading Corner: Right */}
          <div 
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-32 z-20 transition-colors"
            style={{
              background: darkMode 
                ? "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" 
                : "linear-gradient(to left, rgba(34,47,24,1) 0%, rgba(34,47,24,0) 100%)"
            }}
          />

          {/* Carousel Track Container */}
          <div className="overflow-hidden py-3">
            <div 
              onTransitionEnd={handleTransitionEnd}
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                transition: isTransitioning 
                  ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)" 
                  : "none"
              }}
            >
              {trackProjects.map((project, i) => (
                <div
                  key={`${project.title}-${i}`}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-none px-3"
                >
                  <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl border bg-[#182212] dark:bg-[#0c0f0b] border-[#384c28] dark:border-white/[0.08] hover:border-[#ffd875] dark:hover:border-[#8ea86d]/40 transition-all shadow-md group">
                    <div>
                      {/* Category & Status */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-md font-bold border flex items-center gap-1 bg-[#24331b] text-[#ffd875] border-[#384c28] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                          {project.category === "pwa" && <Smartphone className="w-3 h-3 text-[#ffd875]" />}
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
                      <h3 className="text-lg sm:text-xl font-bold text-white hover:text-[#ffd875] dark:text-[#f5f2ea] leading-snug mb-2.5">
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
                        <div className="mb-3.5 px-3 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold bg-[#24331b] dark:bg-black border-[#384c28] dark:border-white/[0.08] text-[#ffd875] dark:text-[#d0d8cb]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#ffd875] dark:text-[#8ea86d]" />
                          <span>{project.metric}</span>
                        </div>
                      )}

                      {/* High-Contrast Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-white/90 dark:text-[#a3a99a] mb-5 font-normal">
                        {project.desc}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.slice(0, 4).map((tech, j) => (
                          <span
                            key={j}
                            className="text-[11px] px-2 py-0.5 rounded-md font-semibold border bg-[#24331b] dark:bg-[#181e15] text-white/90 dark:text-[#cbd4c3] border-[#384c28] dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold text-[#ffd875]/80 dark:text-[#9ea695]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-2 pt-3.5 border-t border-[#384c28] dark:border-white/[0.06]">
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
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg border border-[#384c28] dark:border-white/15 hover:border-[#ffd875] dark:hover:border-[#8ea86d] text-xs font-bold text-white dark:text-[#f5f2ea] bg-[#24331b] dark:bg-transparent transition-colors shadow-xs"
                            title="View Source Code"
                          >
                            <Github className="w-3.5 h-3.5 text-[#ffd875]" />
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
            {filteredProjects.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => jumpToProject(dotIdx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeDotIndex === dotIdx
                    ? "w-7 bg-[#d4a838] dark:bg-[#8ea86d]"
                    : "w-1.5 bg-white/20 dark:bg-white/20 hover:bg-[#d4a838]/60"
                }`}
                title={`Jump to project ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
