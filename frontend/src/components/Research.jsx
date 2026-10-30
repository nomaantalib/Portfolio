import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { ExternalLink, CheckCircle2, Award } from "lucide-react";
import { localData } from "../localData";

export default function Research({ researchList: propResearchList = localData.research }) {
  const { darkMode } = useTheme();
  const [researchList, setResearchList] = useState(propResearchList);

  useEffect(() => {
    setResearchList(propResearchList);
  }, [propResearchList]);

  return (
    <section id="research" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-[#24331b] dark:bg-[#8ea86d]/15 text-[#eed07b] dark:text-[#8ea86d] border-[#3e522b] dark:border-[#8ea86d]/30">
            <span>Publication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#12180d] dark:text-[#f5f2ea]">
            Scientific Research
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#25321c] dark:text-[#a3a99a] max-w-2xl font-normal">
            Peer-reviewed research exploring Cognitive Architectures, Affective AI, and Dual-Memory RAG systems.
          </p>
        </div>

        <div className="space-y-6">
          {researchList.map((paper, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] shadow-md"
            >
              {/* Top Row: Conference Badge & Read Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border bg-[#2f4021] text-[#eed07b] border-[#465e34] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30 w-fit">
                  <Award className="w-3.5 h-3.5 text-[#e5be53]" />
                  <span>{paper.conference}</span>
                </span>

                {paper.link && (
                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#d4a838] hover:bg-[#c4982a] text-[#162010] dark:bg-[#8ea86d] dark:text-black dark:hover:bg-[#9cb67a] transition-all cursor-pointer shadow-xs w-fit"
                  >
                    <span>Read IEEE Paper</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#eed07b] dark:text-[#f5f2ea] leading-snug mb-4">
                {paper.title}
              </h3>

              {/* Metadata strip */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl border bg-[#2f4021] dark:bg-black border-[#465e34] dark:border-white/[0.08] mb-5 text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#e5be53] dark:text-[#979f90]">IEEE Record</p>
                  <p className="font-bold text-[#eed07b] dark:text-[#f5f2ea] mt-0.5">{paper.record}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#e5be53] dark:text-[#979f90]">Paper ID</p>
                  <p className="font-bold text-[#eed07b] dark:text-[#f5f2ea] mt-0.5">{paper.paperId}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#e5be53] dark:text-[#979f90]">Status</p>
                  <p className="font-bold text-[#ffd875] dark:text-[#8ea86d] mt-0.5">{paper.status}</p>
                </div>
              </div>

              {/* Bullets */}
              {paper.details && (
                <ul className="space-y-2">
                  {paper.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#e5be53] dark:text-[#8ea86d]" />
                      <p className="text-xs sm:text-sm leading-relaxed text-[#f6ecd5] dark:text-[#b4bbad]">
                        {detail}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
