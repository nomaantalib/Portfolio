import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "experience", "research", "education", "skills", "projects", "creative", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Research", id: "research" },
    { label: "Education", id: "education" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Creative", id: "creative" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? "bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/5 py-3 shadow-lg" 
          : "bg-white/80 backdrop-blur-md border-b border-black/5 py-3 shadow-md"
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer font-black text-2xl tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Nomaan
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-semibold tracking-wide relative py-1.5 px-4 rounded-full transition-colors cursor-pointer ${
                  isActive 
                    ? darkMode ? "text-white" : "text-blue-600"
                    : darkMode ? "text-gray-300 hover:text-white" : "text-black hover:text-blue-600"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeSection"
                    className={`absolute inset-0 rounded-full z-[-1] ${
                      darkMode ? "bg-white/10" : "bg-blue-500/10"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              darkMode 
                ? "bg-gray-800/80 text-amber-400 border border-gray-700/50 hover:bg-gray-700" 
                : "bg-gray-100 text-indigo-950 border border-gray-200 hover:bg-gray-200"
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              darkMode 
                ? "bg-gray-800/80 text-amber-400 border border-gray-700/50" 
                : "bg-gray-100 text-indigo-950 border border-gray-200"
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition-all ${
              darkMode ? "text-white hover:bg-gray-800" : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden border-t ${
              darkMode ? "bg-[#0b0f19]/95 border-white/5" : "bg-white/95 border-black/5"
            }`}
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-base font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? darkMode ? "bg-white/10 text-white pl-6 border-l-4 border-blue-500" : "bg-blue-500/10 text-blue-600 pl-6 border-l-4 border-blue-600"
                        : darkMode ? "text-gray-300 hover:text-blue-400" : "text-black hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}