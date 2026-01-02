import { useEffect, useState } from "react";
import { api } from "../api";
import { useTheme } from "../ThemeContext";

export default function Experience() {
  const { darkMode } = useTheme();
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.experience) {
        setExperience(res.data.experience);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!Array.isArray(experience)) return null;

  return (
    <section id="experience" className={`p-10 ${
      darkMode ? "bg-linear-to-br from-gray-900 to-black" : "bg-linear-to-br from-gray-100 to-white"
    }`}>
      <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Experience</h2>
      <div className="max-w-4xl mx-auto relative">
        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full ${
          darkMode ? "bg-blue-500" : "bg-blue-300"
        }`}></div>
        {experience.map((exp, i) => (
          <div key={i} className={`mb-8 flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}>
            <div className={`w-1/2 p-6 ${
              darkMode ? "bg-linear-to-br from-gray-700 to-gray-800" : "bg-linear-to-br from-white to-gray-100"
            } rounded-3xl hover:scale-105 transition-transform ml-4 mr-4 shadow-lg`}>
              <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{exp.title}</h3>
              <p className="text-blue-400">{exp.company}</p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{exp.duration}</p>
              <p className={`mt-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{exp.description}</p>
            </div>
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 ${
              darkMode ? "bg-blue-500 border-gray-900" : "bg-blue-300 border-white"
            }`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}