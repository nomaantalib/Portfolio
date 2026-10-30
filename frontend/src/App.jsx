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

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData] = useState(localData);
  const { darkMode } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
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
              ? "bg-black text-[#f5f2ea]" 
              : "bg-[#f7f3ea] text-[#12180d]"
          }`}
        >
          {/* Top Scroll Progress Bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#d4a838] dark:bg-[#8ea86d] origin-left z-[1000] pointer-events-none"
          />

          <Navbar />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionFade}
            >
              <Hero data={portfolioData} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <About data={portfolioData} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Experience experienceList={portfolioData.experience} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Research researchList={portfolioData.research} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Education educationList={portfolioData.education} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Skills skills={portfolioData.skills} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Projects projects={portfolioData.projects} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Creative creativeData={portfolioData.creative} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sectionFade}
            >
              <Contact contact={portfolioData.contact} />
            </motion.div>

            <Footer />
          </motion.main>

          <PWAInstallPrompt />
        </div>
      )}
    </>
  );
}
