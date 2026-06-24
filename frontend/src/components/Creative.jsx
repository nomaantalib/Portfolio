import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";
import { useTheme } from "../ThemeContext";
import { Sparkles, ExternalLink, Play } from "lucide-react";
import { localData } from "../localData";

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z" fill="none" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="none" />
  </svg>
);

export default function Creative({ creativeData: propCreativeData = localData.creative }) {
  const { darkMode } = useTheme();
  const [creativeData, setCreativeData] = useState(propCreativeData);

  useEffect(() => {
    setCreativeData(propCreativeData);
  }, [propCreativeData]);

  if (!creativeData) return null;

  return (
    <section id="creative" className={`py-20 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95" : "bg-white"
    }`}>
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 radial-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 radial-glow-2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold mb-4 border border-red-500/20">
            <Youtube className="w-4 h-4" />
            <span>Creative Projects</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
            {creativeData.title}
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-black"}`}>
            {creativeData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {creativeData.channels.map((channel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`flex flex-col justify-between p-8 rounded-3xl glow-card-red transition-all duration-500 border relative overflow-hidden group ${
                darkMode 
                  ? "glass-panel bg-gradient-to-br from-gray-900/40 to-gray-950/40 border-white/5" 
                  : "glass-panel-light bg-gradient-to-br from-white to-gray-50/50 border-black/5 shadow-xl"
              }`}
            >
              {/* Corner Youtube Play Icon Deco */}
              <div className="absolute -top-6 -right-6 text-red-500/5 group-hover:text-red-500/10 transition-colors duration-500 pointer-events-none">
                <Youtube className="w-24 h-24" />
              </div>

              <div>
                {/* Niche Badge */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${
                    darkMode 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}>
                    {channel.niche}
                  </span>
                  <Play className="w-5 h-5 text-red-500 animate-pulse" />
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-black mb-3 ${darkMode ? "text-white" : "text-black"}`}>
                  {channel.name}
                </h3>

                {/* Description */}
                <p className={`text-sm md:text-base leading-relaxed mb-6 ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}>
                  {channel.description}
                </p>

                {/* Tech/Method Tags */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-1.5">
                    {channel.tags.map((tag, j) => (
                      <span
                        key={j}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          darkMode
                            ? "bg-red-950/20 text-red-300 border-red-500/20"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold text-sm transition shadow-lg shadow-red-600/20"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Visit Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
