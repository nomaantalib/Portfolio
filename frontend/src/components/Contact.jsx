import { useEffect, useState } from "react";
import { api } from "../api";
import { useTheme } from "../ThemeContext";

export default function Contact() {
  const [contact, setContact] = useState({});
  const { darkMode } = useTheme();

  useEffect(() => {
    api.get("/portfolio").then(res => {
      if (res.data && res.data.contact) {
        setContact(res.data.contact);
      }
    }).catch(err => console.error(err));
  }, []);

  if (!contact || typeof contact !== 'object') return null;

  return (
    <section id="contact" className={`p-10 ${
      darkMode ? "bg-linear-to-br from-gray-900 to-black" : "bg-linear-to-br from-gray-100 to-white"
    }`}>
      <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Contact</h2>
      <div className="max-w-4xl mx-auto text-center">
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>Get In Touch</h3>
        <p className={`mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}><strong>Email:</strong> <a href={`mailto:${contact.email}`} className={`${
          darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
        }`}>{contact.email}</a></p>
        <p className={`mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}><strong>Phone:</strong> {contact.phone}</p>
        <p className={`mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}><strong>Location:</strong> {contact.location}</p>
        <p className={`mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}><strong>GitHub:</strong> <a href={contact.github} target="_blank" rel="noopener noreferrer" className={`${
          darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
        }`}>GitHub</a></p>
        <p className={`mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}><strong>LinkedIn:</strong> <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`${
          darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
        }`}>LinkedIn</a></p>
      </div>
    </section>
  );
}