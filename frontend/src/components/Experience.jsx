import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { Briefcase, Calendar, FileText, ExternalLink, CheckCircle2 } from "lucide-react";
import { localData } from "../localData";

export default function Experience({ experienceList: propExperienceList = localData.experience }) {
  const { darkMode } = useTheme();
  const [experienceList, setExperienceList] = useState(propExperienceList);

  useEffect(() => {
    setExperienceList(propExperienceList);
  }, [propExperienceList]);

  return (
    <section id="experience" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#485b2e] dark:text-[#8ea86d] mb-2">
            Career
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2214] dark:text-[#f5f2ea]">
            Work Experience
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#566049] dark:text-[#a3a99a] max-w-2xl">
            Engineering track record in enterprise AI benchmarking, full-stack application development, and production pipelines.
          </p>
        </div>

        {/* Minimal Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-[#dcd1bc] dark:border-white/10 space-y-10">
          {experienceList.map((exp, i) => {
            const companyLink = exp.companyLink || (
              exp.company.toLowerCase().includes("turing") ? "https://www.turing.com/" :
              exp.company.toLowerCase().includes("sipher web") ? "https://www.sipherweb.com/" : null
            );

            return (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#f7f3ea] dark:border-black bg-[#4a5c30] dark:bg-[#8ea86d]" />

                {/* Experience Card */}
                <div className="p-6 sm:p-7 rounded-2xl border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] shadow-xs">
                  {/* Top Bar: Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#1b2214] dark:text-[#f5f2ea]">
                          {exp.title}
                        </h3>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#eee7d7] text-[#3e5026] border border-[#dcd1bc] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#465a2b] dark:bg-[#8ea86d]" />
                            Current Role
                          </span>
                        )}
                      </div>

                      <p className="font-semibold text-sm text-[#485b2e] dark:text-[#8ea86d] mt-1">
                        {companyLink ? (
                          <a 
                            href={companyLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline inline-flex items-center gap-1 group/link"
                          >
                            <span>{exp.company}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100" />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#6c7661] dark:text-[#9ea695]">
                      <Calendar className="w-3.5 h-3.5 text-[#485b2e] dark:text-[#8ea86d]" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Summary / Tagline */}
                  {exp.description && (
                    <p className="text-xs sm:text-sm font-medium mb-4 text-[#576249] dark:text-[#abb2a4]">
                      {exp.description}
                    </p>
                  )}

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {(exp.details || [exp.description]).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#4a5c30] dark:text-[#8ea86d]" />
                        <p className="text-xs sm:text-sm leading-relaxed text-[#4f5844] dark:text-[#b4bbad]">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Skills Pills */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md font-medium border bg-[#f3ede1] dark:bg-[#181e15] text-[#2c361e] dark:text-[#cbd4c3] border-[#ded5c2] dark:border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Certificate Link */}
                  {exp.certificateLink && (
                    <div className="pt-3 border-t border-[#ede6d6] dark:border-white/[0.06]">
                      <a
                        href={exp.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#485b2e] hover:text-[#324020] dark:text-[#8ea86d] dark:hover:text-[#a0bc7c] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Internship Certificate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
