import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { ExternalLink, Play, Sparkles, Clapperboard } from "lucide-react";
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
    <section id="creative" className={`py-24 px-6 md:px-12 relative overflow-hidden ${
      darkMode ? "bg-[#0b0f19]/95 text-white" : "bg-transparent text-slate-900"
    }`}>
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 radial-glow-1 pointer-events-none ambient-orb-1" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 radial-glow-2 pointer-events-none ambient-orb-2" />

      <div className="max-w-6xl mx-auto relative z-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold mb-4 border border-red-500/20">
            <Clapperboard className="w-4 h-4" />
            <span>AI Content & Digital Storytelling</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
            {creativeData.title}
          </h2>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-slate-700"}`}>
            {creativeData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {creativeData.channels.map((channel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`flex flex-col justify-between p-8 md:p-10 rounded-3xl glow-card-red cinematic-sweep transition-all duration-300 border relative overflow-hidden group ${
                darkMode 
                  ? "glass-panel bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-white/10" 
                  : "glass-panel-light bg-gradient-to-br from-white to-gray-50/70 border-black/5 shadow-xl"
              }`}
            >
              {/* Corner Youtube Play Icon Deco */}
              <div className="absolute -top-6 -right-6 text-red-500/5 group-hover:text-red-500/15 transition-colors duration-500 pointer-events-none">
                <Youtube className="w-28 h-28" />
              </div>

              <div>
                {/* Niche Badge */}
                <div className="flex justify-between items-start gap-4 mb-5">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${
                    darkMode 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}>
                    {channel.niche}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-black mb-3 ${darkMode ? "text-white" : "text-black"}`}>
                  {channel.name}
                </h3>

                {/* Description */}
                <p className={`text-sm md:text-base leading-relaxed mb-6 ${
                  darkMode ? "text-gray-300" : "text-slate-700"
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
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-red-600/25"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Visit YouTube Channel</span>
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
