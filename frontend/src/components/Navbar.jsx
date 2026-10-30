import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Smartphone } from "lucide-react";

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
      const scrollPosition = window.scrollY + 180;

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
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 78;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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
          ? "bg-black/92 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-sm" 
          : "bg-[#f7f3ea]/94 backdrop-blur-md border-b border-[#ded5c2] py-3.5 shadow-xs"
        : darkMode
          ? "bg-transparent py-5"
          : "bg-transparent py-5"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Minimalist Logo Mark */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider transition-colors shadow-xs ${
            darkMode 
              ? "bg-[#8ea86d]/15 text-[#8ea86d] border border-[#8ea86d]/30 group-hover:bg-[#8ea86d]/25" 
              : "bg-[#24331b] text-[#eed07b] border border-[#3e522b] group-hover:bg-[#1a2514]"
          }`}>
            NT
          </div>
          <span className={`font-bold tracking-tight text-sm ${darkMode ? "text-[#f5f2ea]" : "text-[#12180d]"}`}>
            Mohd Nomaan Talib
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs tracking-wide px-3 py-1.5 rounded-md transition-all relative cursor-pointer font-medium ${
                  isActive 
                    ? darkMode ? "text-[#f5f2ea] font-semibold" : "text-[#eed07b] font-bold"
                    : darkMode ? "text-[#a3a99a] hover:text-[#f5f2ea]" : "text-[#2a381e] hover:text-[#12180d]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className={`absolute inset-0 rounded-md z-[-1] shadow-xs ${
                      darkMode ? "bg-white/[0.1]" : "bg-[#24331b]"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}

          <div className={`h-4 w-[1px] mx-2 ${darkMode ? "bg-white/[0.12]" : "bg-[#d8cdb6]"}`} />

          {/* PWA Install Button */}
          {canInstall && (
            <button
              onClick={handleInstallClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition shadow-xs ${
                darkMode 
                  ? "bg-[#8ea86d]/15 text-[#8ea86d] border border-[#8ea86d]/30 hover:bg-[#8ea86d]/25" 
                  : "bg-[#24331b] text-[#eed07b] border border-[#3e522b] hover:bg-[#1a2514]"
              }`}
              title="Install App"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#e5be53]" />
              <span>Install</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              darkMode 
                ? "text-[#a3a99a] hover:text-[#f5f2ea] hover:bg-white/[0.08]" 
                : "text-[#3f4a33] hover:text-[#12180d] hover:bg-[#e8dfcb]"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {canInstall && (
            <button
              onClick={handleInstallClick}
              className="p-2 rounded-md text-xs font-medium text-[#8ea86d]"
              title="Install"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md transition-colors ${
              darkMode ? "text-[#a3a99a]" : "text-[#3f4a33]"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md transition-colors ${
              darkMode ? "text-[#f5f2ea] hover:bg-white/[0.08]" : "text-[#12180d] hover:bg-[#e8dfcb]"
            }`}
            aria-label="Open menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.2 }}
            className={`md:hidden overflow-hidden border-b ${
              darkMode ? "bg-black border-white/[0.08]" : "bg-[#f7f3ea] border-[#ded5c2]"
            }`}
          >
            <div className="flex flex-col gap-1 p-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${
                      isActive
                        ? darkMode ? "bg-white/[0.1] text-[#f5f2ea] font-semibold" : "bg-[#24331b] text-[#eed07b] font-bold shadow-xs"
                        : darkMode ? "text-[#a3a99a] hover:text-[#f5f2ea]" : "text-[#2a381e] hover:text-[#12180d]"
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
