import { useEffect, useState } from "react";
import { api } from "../api";
import { useTheme } from "../ThemeContext";

export default function Skills() {
  const { darkMode } = useTheme();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.skills) {
        setSkills(res.data.skills);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!Array.isArray(skills)) return null;

  const skillCategories = {
    Languages: ['JavaScript (ES6+)', 'Python', 'Java', 'C'],
    Frontend: ['React.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express.js', 'RESTful APIs', 'MongoDB', 'Mongoose', 'MySQL', 'Firebase'],
    AI: ['Generative AI', 'Gemini API', 'Prompt Engineering', 'Retrieval-Augmented Generation (RAG)', 'AI Agents', 'Agentic AI Systems', 'Machine Learning Fundamentals'],
    Tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'API Integration', 'Cloud Deployment', 'Render Deployment']
  };

  return (
    <section id="skills" className={`p-10 ${
      darkMode ? "bg-linear-to-r from-gray-900 to-black" : "bg-linear-to-r from-gray-100 to-white"
    }`}>
      <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Skills</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skillCategories).map(([category, skillsList]) => (
          <div key={category} className={`${
            darkMode ? "bg-linear-to-br from-gray-700 to-gray-800" : "bg-linear-to-br from-white to-gray-100"
          } p-6 rounded-3xl shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full hover:scale-110 transition-transform cursor-pointer text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
