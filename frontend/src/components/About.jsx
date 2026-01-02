import { useEffect, useState } from "react";
import { api } from "../api";
import { useTheme } from "../ThemeContext";

export default function About() {
  const { darkMode } = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data) {
        setData(res.data);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <section id="about" className={`p-10 text-center ${
      darkMode ? "bg-linear-to-r from-gray-800 to-gray-900" : "bg-linear-to-r from-gray-100 to-gray-200"
    }`}>
      <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>About Me</h2>
      <div className={`max-w-4xl mx-auto ${
        darkMode ? "bg-linear-to-br from-gray-700 to-gray-800" : "bg-linear-to-br from-white to-gray-100"
      } p-8 rounded-3xl shadow-lg`}>
        <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
          {data.summary}
        </p>
      </div>
    </section>
  );
}
