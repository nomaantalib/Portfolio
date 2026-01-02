import { useEffect, useState } from "react";
import { api } from "../api";
import { useTheme } from "../ThemeContext";

export default function Education() {
  const { darkMode } = useTheme();
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.education) {
        setEducation(res.data.education);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!Array.isArray(education)) return null;

  return (
    <section id="education" className={`p-10 ${
      darkMode ? "bg-linear-to-br from-indigo-900 to-purple-900" : "bg-linear-to-br from-indigo-100 to-purple-100"
    }`}>
      <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Education</h2>
      <div className="max-w-4xl mx-auto relative">
        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full ${
          darkMode ? "bg-purple-400" : "bg-purple-300"
        }`}></div>
        {education.map((edu, i) => (
          <div key={i} className={`mb-8 flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'} relative`}>
            <div className={`w-1/2 p-6 ${
              darkMode ? "bg-linear-to-br from-purple-700 to-indigo-800" : "bg-linear-to-br from-purple-100 to-indigo-100"
            } rounded-3xl hover:scale-105 transition-transform ml-4 mr-4 shadow-lg`}>
              <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{edu.degree}</h3>
              <p className={`${darkMode ? "text-purple-300" : "text-purple-600"}`}>{edu.institution} {edu.association}</p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{edu.duration}</p>
              <p className={`mt-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{edu.details}</p>
            </div>
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 ${
              darkMode ? "bg-purple-400 border-indigo-900" : "bg-purple-300 border-indigo-100"
            }`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}