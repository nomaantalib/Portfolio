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
  const [portfolioData] = useState(localData);
  const { darkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div
          className={`min-h-screen transition-colors duration-300 relative ${
            darkMode 
              ? "bg-[#131712] text-[#f5f2ea]" 
              : "bg-[#f7f5f0] text-[#1f241a]"
          }`}
        >
          {/* Minimalist Top Scroll Progress Bar - Olive */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[2px] bg-[#627742] dark:bg-[#8ea86d] origin-left z-[1000] pointer-events-none"
          />

          <Navbar />

          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
