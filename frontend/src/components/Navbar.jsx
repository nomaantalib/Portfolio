import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Code2, Download, Smartphone } from "lucide-react";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

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

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

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
    <nav className={`fixed top-0 left-0 right-0 w-full z-[999] transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? "bg-[#060913]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl shadow-black/50" 
          : "bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 py-3 shadow-md shadow-slate-900/5"
        : darkMode
          ? "bg-[#060913]/60 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer font-black text-2xl tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${
              darkMode 
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400" 
                : "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
            }`}>
              <Code2 className="w-4 h-4" />
            </div>
            <span>Nomaan</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-semibold tracking-wide relative py-1.5 px-3.5 rounded-full transition-colors cursor-pointer ${
                  isActive 
                    ? darkMode ? "text-white" : "text-indigo-700 font-bold"
                    : darkMode ? "text-gray-300 hover:text-white" : "text-slate-700 hover:text-indigo-700 hover:bg-slate-100/70"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeSection"
                    className={`absolute inset-0 rounded-full z-[-1] ${
                      darkMode ? "bg-white/10 shadow-sm" : "bg-indigo-100 shadow-sm border border-indigo-200/70"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}

          {/* PWA Install Button in Header if installable */}
          {canInstall && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 cursor-pointer"
              title="Install Portfolio as Progressive Web App"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </motion.button>
          )}

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              darkMode 
                ? "bg-gray-800/80 text-amber-400 border border-gray-700/50 hover:bg-gray-700" 
                : "bg-white text-indigo-950 border border-slate-300 hover:bg-slate-100 shadow-sm"
            }`}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {canInstall && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-600 text-white"
            >
              <Download className="w-3 h-3" />
              <span>PWA</span>
            </button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              darkMode 
                ? "bg-gray-800/80 text-amber-400 border border-gray-700/50" 
                : "bg-white text-indigo-950 border border-slate-300 shadow-sm"
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition-all ${
              darkMode ? "text-white hover:bg-gray-800" : "text-slate-800 hover:bg-slate-100"
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
            className={`md:hidden overflow-hidden border-t backdrop-blur-2xl ${
              darkMode ? "bg-[#0b0f19]/95 border-white/10" : "bg-white/95 border-slate-200 shadow-2xl"
            }`}
          >
            <div className="flex flex-col gap-3 p-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-base font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? darkMode ? "bg-white/10 text-white pl-6 border-l-4 border-indigo-500" : "bg-indigo-100 text-indigo-700 pl-6 border-l-4 border-indigo-600"
                        : darkMode ? "text-gray-300 hover:text-indigo-400" : "text-slate-700 hover:text-indigo-700 hover:bg-slate-100"
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