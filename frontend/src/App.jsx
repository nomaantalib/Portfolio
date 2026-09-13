import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Research from "./components/Research";
import Creative from "./components/Creative";
import Loader from "./components/Loader";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { localData } from "./localData";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(localData);
  const { darkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div
          className={`min-h-screen transition-colors duration-500 relative ${
            darkMode 
              ? "bg-[#060913] text-white" 
              : "bg-gradient-to-br from-indigo-100/90 via-sky-100/80 to-cyan-100/90 text-slate-900"
          }`}
        >
          {/* Top scroll progress indicator with gradient shimmer */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 origin-left z-[1000] pointer-events-none shadow-[0_2px_12px_rgba(99,102,241,0.5)]"
          />
          <Navbar />

          <motion.main
            initial={{ opacity: 0, scale: 0.97, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero data={portfolioData} />
            <About data={portfolioData} />
            <Experience experienceList={portfolioData.experience} />
            <Research researchList={portfolioData.research} />
            <Education educationList={portfolioData.education} />
            <Skills skills={portfolioData.skills} />
            <Projects projects={portfolioData.projects} />
            <Creative creativeData={portfolioData.creative} />
            <Contact contact={portfolioData.contact} />
            <Footer />
          </motion.main>

          <PWAInstallPrompt />
        </div>
      )}
    </>
  );
}
