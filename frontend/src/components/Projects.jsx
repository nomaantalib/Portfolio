import { useEffect, useState } from "react";
import { api } from "../api";
import { useTheme } from "../ThemeContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.projects) {
        setProjects(res.data.projects);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!Array.isArray(projects)) return null;

  return (
    <section id="projects" className={`p-10 ${
      darkMode ? "bg-linear-to-br from-gray-900 to-black" : "bg-linear-to-br from-gray-100 to-white"
    }`}>
      <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((p, i) => (
          <div key={i} className={`${
            darkMode ? "bg-linear-to-br from-gray-700 to-gray-800" : "bg-linear-to-br from-white to-gray-100"
          } p-6 rounded-3xl hover:scale-105 transition-all duration-300 shadow-lg ${
            darkMode ? "border border-gray-600" : "border border-gray-300"
          }`}>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>{p.title}</h3>
            <p className={`mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{p.desc}</p>
            <div className="mb-4">
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-purple-300" : "text-purple-600"}`}>Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {p.techStack.map((tech, j) => (
                  <span key={j} className="px-2 py-1 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full hover:scale-110 transition">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${
                darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"
              } transition`}>GitHub</a>}
              {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${
                darkMode ? "text-green-300 hover:text-green-200" : "text-green-600 hover:text-green-800"
              } transition`}>Live Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
