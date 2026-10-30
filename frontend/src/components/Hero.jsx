import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { FileText, ArrowRight, Award, Terminal } from "lucide-react";
import profilePic from '../asset/profile.jpeg';
import { localData } from "../localData";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const titles = [
  "Associate Product Manager",
  "Full-Stack AI Engineer",
  "IEEE CE2CT-2026 Researcher",
  "Progressive Web App Architect"
];

export default function Hero({ data: propData = localData }) {
  const { darkMode } = useTheme();
  const [data, setData] = useState(propData);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setData(propData);
  }, [propData]);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(
          currentTitle.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-[#24331b] dark:bg-black border-b border-[#3e522b] dark:border-white/[0.08] transition-colors duration-300">
      {/* Subtle ambient lighting */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[140px] pointer-events-none rounded-full ${
        darkMode ? "bg-[#8ea86d]/5" : "bg-[#d4a838]/12"
      }`} />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-1">
        
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-colors shadow-xs ${
            darkMode 
              ? "bg-[#8ea86d]/15 text-[#8ea86d] border-[#8ea86d]/30" 
              : "bg-black/25 text-white border-white/25"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-[#8ea86d]" : "bg-white"}`} />
            <span>Available for APM & Engineering Roles</span>
          </div>

          {/* Primary Name */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-[#f5f2ea]">
              Mohd Nomaan Talib
            </h1>
            <div className="h-8 flex items-center justify-center md:justify-start">
              <p className="text-lg sm:text-xl font-bold text-white dark:text-[#8ea86d]">
                {displayText}
                <span className="inline-block w-[2px] h-5 ml-1 bg-white dark:bg-[#8ea86d] animate-pulse align-middle" />
              </p>
            </div>
          </div>

          {/* High-Contrast Summary */}
          <p className="text-sm sm:text-base leading-relaxed text-white/90 dark:text-[#a8af9f] font-normal max-w-xl mx-auto md:mx-0">
            Final-year Computer Science student (<span className="font-semibold text-white dark:text-[#f5f2ea]">CGPA 9.8/10, Silver Medalist</span>) with hands-on experience driving AI products from 0-to-1. Proven engineering impact at <span className="font-semibold text-white dark:text-[#f5f2ea]">Turing</span>, peer-reviewed <span className="font-semibold text-white dark:text-[#f5f2ea]">IEEE CE2CT-2026</span> research, and production PWAs delivering a <span className="font-semibold text-white dark:text-[#f5f2ea]">90% reduction</span> in reporting time.
          </p>

          {/* Key Metric Chips */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
            <div className="px-3 py-1.5 rounded-md border font-semibold bg-black/25 dark:bg-[#0d100c] border-white/20 dark:border-white/[0.08] text-white dark:text-[#d5ddcc] flex items-center gap-1.5 shadow-xs">
              <Award className="w-3.5 h-3.5 text-white dark:text-[#8ea86d]" />
              <span>Silver Medalist (9.8 CGPA)</span>
            </div>
            <div className="px-3 py-1.5 rounded-md border font-semibold bg-black/25 dark:bg-[#0d100c] border-white/20 dark:border-white/[0.08] text-white dark:text-[#d5ddcc] flex items-center gap-1.5 shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-white dark:text-[#a0bc7c]" />
              <span>Turing AI Engineer</span>
            </div>
            <div className="px-3 py-1.5 rounded-md border font-semibold bg-black/25 dark:bg-[#0d100c] border-white/20 dark:border-white/[0.08] text-white dark:text-[#d5ddcc] shadow-xs">
              IEEE CE2CT-2026 Accepted
            </div>
            <div className="px-3 py-1.5 rounded-md border font-semibold bg-black/25 dark:bg-[#0d100c] border-white/20 dark:border-white/[0.08] text-white dark:text-[#d5ddcc] shadow-xs">
              3 Live PWAs
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white hover:bg-white/90 text-[#1b2614] shadow-md dark:bg-[#8ea86d] dark:text-black dark:border-transparent dark:hover:bg-[#9cb67a] transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-[#1b2614] dark:text-black" />
            </button>

            {data?.contact?.resume && (
              <a
                href={data.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-white/30 hover:border-white dark:border-white/15 dark:hover:border-[#8ea86d] text-white dark:text-[#f5f2ea] transition-all cursor-pointer bg-black/20 dark:bg-transparent shadow-xs"
              >
                <FileText className="w-4 h-4 text-white dark:text-[#8ea86d]" />
                <span>Resume</span>
              </a>
            )}

            {/* Social Icons */}
            {data?.contact && (
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/30 hover:border-white dark:border-white/10 dark:hover:bg-white/[0.08] text-white dark:text-[#a3a99a] bg-black/20 dark:bg-transparent transition-colors shadow-xs"
                  aria-label="GitHub profile"
                >
                  <Github />
                </a>
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/30 hover:border-white dark:border-white/10 dark:hover:bg-white/[0.08] text-white dark:text-[#a3a99a] bg-black/20 dark:bg-transparent transition-colors shadow-xs"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin />
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Profile Frame */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative">
            <div 
              style={{ borderRadius: "50%" }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/30 dark:border-white/15 shadow-xl bg-black/20 dark:bg-[#0d100c]"
            >
              <img
                src={profilePic}
                alt="Mohd Nomaan Talib"
                style={{ borderRadius: "50%" }}
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>

            {/* Bottom tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap bg-[#1b2614]/95 dark:bg-black/95 backdrop-blur-md border-white/25 dark:border-white/15 text-white dark:text-[#f5f2ea] shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white dark:bg-[#8ea86d]" />
              <span>Integral University • Silver Medalist</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
