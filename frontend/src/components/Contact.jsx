import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { Mail, Phone, MapPin, ExternalLink, FileText, AppWindow, Award } from "lucide-react";
import { localData } from "../localData";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
    },
    {
      label: "Phone",
      value: contact.phone,
      icon: Phone,
      link: `tel:${contact.phone}`,
    },
    {
      label: "Location",
      value: contact.location,
      icon: MapPin,
      link: null,
    },
    {
      label: "GitHub",
      value: "nomaantalib",
      icon: Github,
      link: contact.github,
    },
    {
      label: "LinkedIn",
      value: "Mohd Nomaan Talib",
      icon: Linkedin,
      link: contact.linkedin,
    },
    {
      label: "App Hub",
      value: "SmartKeyboard App",
      icon: AppWindow,
      link: contact.apphub,
    },
    {
      label: "ATS Resume",
      value: "Resume Folder",
      icon: FileText,
      link: contact.resume,
    },
    {
      label: "IBM Credential",
      value: "Cloud & AI Certified",
      icon: Award,
      link: contact.ibmCertificate || "https://drive.google.com/file/d/16dzCcULMzphcaM6OiF0FUFN4WHfnV322/view?usp=drivesdk",
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-[#24331b] dark:bg-[#8ea86d]/15 text-[#eed07b] dark:text-[#8ea86d] border-[#3e522b] dark:border-[#8ea86d]/30">
            <span>Reach Out</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#12180d] dark:text-[#f5f2ea]">
            Get In Touch
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#25321c] dark:text-[#a3a99a] max-w-2xl font-normal">
            Open for Associate Product Manager roles, full-stack AI engineering, and research collaborations.
          </p>
        </div>

        {/* Minimal Contact Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item, idx) => {
            const Icon = item.icon;

            const cardContent = (
              <div className="flex items-center gap-3.5 p-4 rounded-xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] hover:border-[#d4a838] dark:hover:border-[#8ea86d]/40 transition-colors shadow-md h-full">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#2f4021] text-[#e5be53] border border-[#465e34] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d]">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 overflow-hidden flex-1">
                  <p className="text-[10px] uppercase font-bold text-[#e5be53] dark:text-[#9ea695]">
                    {item.label}
                  </p>
                  <p className="text-xs sm:text-sm font-bold truncate text-[#eed07b] dark:text-[#f5f2ea] mt-0.5">
                    {item.value}
                  </p>
                </div>
                {item.link && (
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#e5be53] dark:text-[#76806e]" />
                )}
              </div>
            );

            if (item.link) {
              return (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={idx} className="block h-full">
                {cardContent}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
