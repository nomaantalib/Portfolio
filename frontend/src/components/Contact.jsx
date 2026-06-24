import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";
import { useTheme } from "../ThemeContext";
import { Mail, Phone, MapPin, ExternalLink, MessageCircle, FileText, AppWindow } from "lucide-react";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


import { localData } from "../localData";

export default function Contact({ contact: propContact = localData.contact }) {
  const [contact, setContact] = useState(propContact);
  const { darkMode } = useTheme();

  useEffect(() => {
    setContact(propContact);
  }, [propContact]);

  const contactItems = [
    {
      label: "Email",
      value: contact.email,
      icon: Mail,
      link: `mailto:${contact.email}`,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50"
    },
    {
      label: "Phone",
      value: contact.phone,
      icon: Phone,
      link: `tel:${contact.phone}`,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50"
    },
    {
      label: "Location",
      value: contact.location,
      icon: MapPin,
      link: null,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      label: "GitHub",
      value: "nomaantalib",
      icon: Github,
      link: contact.github,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20 hover:border-pink-500/50"
    },
    {
      label: "LinkedIn",
      value: "Mohd Nomaan Talib",
      icon: Linkedin,
      link: contact.linkedin,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/50"
    },
    {
      label: "App Hub",
      value: "SmartKeyboard App (Paid)",
      icon: AppWindow,
      link: contact.apphub,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20 hover:border-rose-500/50"
    },
    {
      label: "Resume",
      value: "View Resume",
      icon: FileText,
      link: contact.resume,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50"
    }
  ];

  return (
    <section id="contact" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19] text-white" : "bg-gray-50 text-black"
    }`}>
      {/* Background Radial Glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 radial-glow-2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            <MessageCircle className="w-4 h-4" />
            <span>Connect</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            Get In Touch
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            Feel free to reach out for internship opportunities, project collaborations, or research discussions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactItems.map((item, idx) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className={`p-4 rounded-2xl border shrink-0 transition-colors ${item.color.split(" ").slice(0, 3).join(" ")}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className={`text-xs uppercase tracking-wider font-semibold ${darkMode ? "text-gray-500" : "text-black"}`}>
                    {item.label}
                  </p>
                  <p className={`text-base font-bold mt-1 truncate ${
                    darkMode ? "text-gray-200" : "text-black"
                  }`}>
                    {item.value}
                  </p>
                </div>
                {item.link && (
                  <ExternalLink className={`w-4 h-4 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    darkMode ? "text-gray-500" : "text-black"
                  }`} />
                )}
              </>
            );

            if (item.link) {
              return (
                <motion.a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: idx * 0.04, ease: "easeOut" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-5 p-6 rounded-3xl border transition-all duration-300 group cursor-pointer ${
                    darkMode 
                      ? "border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 hover:border-gray-700" 
                      : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-md hover:shadow-lg"
                  }`}
                >
                  {content}
                </motion.a>
              );
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: idx * 0.04, ease: "easeOut" }}
                className={`flex items-center gap-5 p-6 rounded-3xl border transition-all duration-300 ${
                  darkMode 
                    ? "border-gray-800 bg-gray-900/30" 
                    : "border-gray-200 bg-white shadow-md"
                }`}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}