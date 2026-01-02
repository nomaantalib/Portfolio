import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full ${
      darkMode ? "bg-linear-to-r from-gray-900 to-black" : "bg-linear-to-r from-gray-100 to-white"
    } bg-opacity-90 backdrop-blur-sm z-10 p-4 flex justify-between items-center shadow-lg`}>
      <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Portfolio</h1>
      <div className="flex items-center gap-4">
        <button onClick={() => scrollToSection('about')} className={`hover:text-blue-400 transition ${darkMode ? "text-gray-200" : "text-gray-700"}`}>About</button>
        <button onClick={() => scrollToSection('experience')} className={`hover:text-blue-400 transition ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Experience</button>
        <button onClick={() => scrollToSection('education')} className={`hover:text-blue-400 transition ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Education</button>
        <button onClick={() => scrollToSection('skills')} className={`hover:text-blue-400 transition ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Skills</button>
        <button onClick={() => scrollToSection('projects')} className={`hover:text-blue-400 transition ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Projects</button>
        <button onClick={() => scrollToSection('contact')} className={`hover:text-blue-400 transition ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Contact</button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full hover:bg-gray-600 transition ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}