import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { ExternalLink, Play } from "lucide-react";
import { localData } from "../localData";

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
    <section id="creative" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#485b2e] dark:text-[#8ea86d] mb-2">
            Media & Storytelling
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2214] dark:text-[#f5f2ea]">
            {creativeData.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#566049] dark:text-[#a3a99a] max-w-2xl">
            {creativeData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {creativeData.channels.map((channel, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] shadow-xs"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md border bg-[#eee7d7] text-[#3e5026] border-[#dcd1bc] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                    {channel.niche}
                  </span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#f4efe3] dark:bg-black text-[#485b2e] dark:text-[#8ea86d]">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1b2214] dark:text-[#f5f2ea] mb-2">
                  {channel.name}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-[#566049] dark:text-[#a3a99a] mb-4">
                  {channel.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {channel.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[11px] px-2.5 py-0.5 rounded-md font-medium border bg-[#f3ede1] dark:bg-[#181e15] text-[#2c361e] dark:text-[#cbd4c3] border-[#ded5c2] dark:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium bg-[#364421] hover:bg-[#2b371a] text-[#f7f3ea] dark:bg-[#8ea86d] dark:text-black dark:hover:bg-[#9cb67a] transition-colors shadow-xs"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Visit YouTube Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
