import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`py-8 text-center border-t text-sm font-semibold tracking-wide transition-colors duration-300 ${
      darkMode 
        ? "text-gray-400 bg-[#080b12] border-white/5" 
        : "text-slate-800 bg-white/40 backdrop-blur-md border-indigo-200/40"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Mohd Nomaan Talib. All rights reserved.</p>
        <p className={`text-xs ${darkMode ? "text-gray-500" : "text-slate-600 font-bold"}`}>
          Associate Product Manager & AI Engineer • Built with React, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  );
}
