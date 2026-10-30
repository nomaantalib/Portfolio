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
    <section id="education" className="py-20 px-6 border-t border-[#e2dcd0] dark:border-[#f5f2ea]/[0.08]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4d6133] dark:text-[#8ea86d] mb-2">
            Academics
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1f241a] dark:text-[#f5f2ea]">
            Education & Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5e6653] dark:text-[#a3a99a] max-w-2xl">
            Verified academic credentials, rank holder distinction, and industry certifications.
          </p>
        </div>

        {/* Minimal Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-[#d8d2c4] dark:border-[#2c3626] space-y-8">
          {educationList.map((edu, i) => {
            const schoolLink = getWebsiteLink(edu);
            return (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#f7f5f0] dark:border-[#131712] bg-[#4e6334] dark:bg-[#8ea86d]" />

                {/* Card */}
                <div className="p-6 sm:p-7 rounded-2xl border bg-white dark:bg-[#192016] border-[#e2dcd0] dark:border-[#f5f2ea]/[0.08] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1f241a] dark:text-[#f5f2ea]">
                        {edu.degree}
                      </h3>
                      <p className="font-semibold text-sm text-[#4e6334] dark:text-[#8ea86d] mt-0.5">
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
                        <p className="text-xs text-[#6e7565] dark:text-[#9ea695] mt-0.5">
                          {edu.association}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#6b7361] dark:text-[#9ea695]">
                      <Calendar className="w-3.5 h-3.5 text-[#4e6334] dark:text-[#8ea86d]" />
                      <span>{edu.duration}</span>
                    </div>
                  </div>

                  {/* Standing / Score */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-[#eff3ea] text-[#364622] border border-[#d2dec7] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30">
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
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#d5cfc0] dark:border-[#f5f2ea]/15 hover:border-[#4e6334] dark:hover:border-[#8ea86d] text-xs font-medium text-[#2f3923] dark:text-[#f5f2ea] bg-[#faf8f4] dark:bg-[#20271c] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#4e6334] dark:text-[#8ea86d]" />
                        <span>View Verified Marksheet</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {edu.ibmCertificateLink && (
                      <a
                        href={edu.ibmCertificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#3b4c27] hover:bg-[#313f20] text-[#f7f5f0] dark:bg-[#8ea86d] dark:text-[#131712] dark:hover:bg-[#9cb67a] transition-colors shadow-xs"
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
