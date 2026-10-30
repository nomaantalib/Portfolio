import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { GraduationCap, Calendar, FileText, ExternalLink, Award } from "lucide-react";
import { localData } from "../localData";

export default function Education({ educationList: propEducationList = localData.education }) {
  const { darkMode } = useTheme();
  const [educationList, setEducationList] = useState(propEducationList);

  useEffect(() => {
    setEducationList(propEducationList);
  }, [propEducationList]);

  const getWebsiteLink = (edu) => {
    if (edu.websiteLink) return edu.websiteLink;
    const name = edu.institution.toLowerCase();
    if (name.includes("integral university")) return "https://www.iul.ac.in/";
    if (name.includes("sumitra modern school")) return "https://www.sumitraschools.com/sumitra-modern-school/";
    return null;
  };

  return (
    <section id="education" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#485b2e] dark:text-[#8ea86d] mb-2">
            Academics
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2214] dark:text-[#f5f2ea]">
            Education & Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#566049] dark:text-[#a3a99a] max-w-2xl">
            Verified academic credentials, rank holder distinction, and industry certifications.
          </p>
        </div>

        {/* Minimal Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-[#dcd1bc] dark:border-white/10 space-y-8">
          {educationList.map((edu, i) => {
            const schoolLink = getWebsiteLink(edu);
            return (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#f7f3ea] dark:border-black bg-[#4a5c30] dark:bg-[#8ea86d]" />

                {/* Card */}
                <div className="p-6 sm:p-7 rounded-2xl border bg-[#fcfbf7] dark:bg-[#0c0f0b] border-[#ded5c2] dark:border-white/[0.08] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1b2214] dark:text-[#f5f2ea]">
                        {edu.degree}
                      </h3>
                      <p className="font-semibold text-sm text-[#485b2e] dark:text-[#8ea86d] mt-0.5">
                        {schoolLink ? (
                          <a 
                            href={schoolLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline inline-flex items-center gap-1 group/link"
                          >
                            <span>{edu.institution}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100" />
                          </a>
                        ) : (
                          edu.institution
                        )}
                      </p>
                      {edu.association && (
                        <p className="text-xs text-[#6e7664] dark:text-[#9ea695] mt-0.5">
                          {edu.association}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#6c7661] dark:text-[#9ea695]">
                      <Calendar className="w-3.5 h-3.5 text-[#485b2e] dark:text-[#8ea86d]" />
                      <span>{edu.duration}</span>
                    </div>
                  </div>

                  {/* Standing / Score */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-[#eee7d7] text-[#364622] border border-[#dcd1bc] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
                      {edu.details}
                    </span>
                  </div>

                  {/* Hyperlinks */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {edu.marksheetLink && (
                      <a
                        href={edu.marksheetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#cfc3ab] dark:border-white/15 hover:border-[#485b2e] dark:hover:border-[#8ea86d] text-xs font-medium text-[#222b17] dark:text-[#f5f2ea] bg-[#f7f3ea] dark:bg-[#151a13] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#485b2e] dark:text-[#8ea86d]" />
                        <span>View Verified Marksheet</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {edu.ibmCertificateLink && (
                      <a
                        href={edu.ibmCertificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#364421] hover:bg-[#2b371a] text-[#f7f3ea] dark:bg-[#8ea86d] dark:text-black dark:hover:bg-[#9cb67a] transition-colors shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>IBM Cloud & AI Credentials</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
