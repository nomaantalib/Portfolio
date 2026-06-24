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
import { useState } from "react";
import { localData } from "./localData";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(localData);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 origin-left z-[100] pointer-events-none shadow-[0_2px_10px_rgba(99,102,241,0.4)]"
          />
          <Navbar />
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
        </motion.div>
      )}
    </>
  );
}

