import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { 
  Compass, FileText, CheckSquare, Layers, 
  Activity, Smartphone, Users, BarChart3,
  BookOpen, Award, TrendingUp, HeartHandshake, CheckCircle2
} from "lucide-react";
import { localData } from "../localData";

const competencyIcons = {
  "Product Strategy & Roadmapping": Compass,
  "PRDs & Functional Specifications": FileText,
  "Prioritization (RICE, MoSCoW)": CheckSquare,
  "MVP Scoping & 0-to-1 Delivery": Layers,
  "Agile / Scrum & OKRs / KPIs": Activity,
  "Progressive Web App (PWA) Strategy": Smartphone,
  "Cross-Functional Collaboration": Users,
  "User Research & A/B Testing": BarChart3,
};

export default function About({ data: propData = localData }) {
  const { darkMode } = useTheme();
  const [data, setData] = useState(propData);

  useEffect(() => {
    setData(propData);
  }, [propData]);

  const stats = [
    { 
      label: "B.Tech Academic Standing", 
      value: "9.8 / 10", 
      subtext: "Integral University (Silver Medalist)",
      icon: BookOpen, 
    },
    { 
      label: "Scientific Research", 
      value: "IEEE CE2CT-2026", 
      subtext: "Accepted Paper ID: 208",
      icon: Award, 
    },
    { 
      label: "Core Success Metric", 
      value: "90% Reduction", 
      subtext: "In Manual Reporting Time",
      icon: TrendingUp, 
    },
    { 
      label: "Production Deployments", 
      value: "10+ Live MVPs", 
      subtext: "AI Platforms & PWA Systems",
      icon: HeartHandshake, 
    }
  ];

  const competencies = data?.coreCompetencies || localData.coreCompetencies || [];

  return (
    <section id="about" className="py-20 px-6 border-t border-[#ded5c2] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-[#24331b] dark:bg-[#8ea86d]/15 text-[#eed07b] dark:text-[#8ea86d] border-[#3e522b] dark:border-[#8ea86d]/30">
            <span>Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#12180d] dark:text-[#f5f2ea]">
            About & Product Focus
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#25321c] dark:text-[#a3a99a] max-w-2xl font-normal">
            Bridging customer empathy, quantitative prioritization frameworks, and deep full-stack execution to build scalable AI products and progressive web apps.
          </p>
        </div>

        {/* Top Summary & Highlights Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Summary Box */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] shadow-md">
            <h3 className="text-lg font-bold text-[#eed07b] dark:text-[#f5f2ea] mb-3">
              Product Philosophy & Technical Execution
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#f6ecd5] dark:text-[#b4bbad]">
              {data.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-[#3e522b] dark:border-white/[0.06] flex flex-wrap gap-4 text-xs font-semibold text-[#eed07b] dark:text-[#c4ccbc]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#e5be53] dark:text-[#8ea86d]" />
                Full-Stack Fluency (MERN, PWA, Cloud, Docker)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#e5be53] dark:text-[#8ea86d]" />
                Measurable Impact (90% Reporting Time Reduction)
              </span>
            </div>
          </div>

          {/* 4 Clean Stats */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] shadow-md flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2f4021] text-[#e5be53] border border-[#465e34] dark:bg-[#8ea86d]/15 dark:text-[#8ea86d] dark:border-[#8ea86d]/30 mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-[#eed07b] dark:text-[#f5f2ea]">
                      {stat.value}
                    </p>
                    <p className="text-xs font-bold text-[#f6ecd5] dark:text-[#d5ddcc] mt-1">
                      {stat.label}
                    </p>
                    <p className="text-[11px] text-[#e5be53] dark:text-[#9ea695] mt-0.5 font-medium">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Core Product Competencies */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#12180d] dark:text-[#f5f2ea]">
              Core Product Competencies
            </h3>
            <p className="text-xs sm:text-sm text-[#27341c] dark:text-[#a3a99a] mt-1 font-medium">
              Methodologies and frameworks applied across 0-to-1 launches and cross-functional teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {competencies.map((comp, idx) => {
              const IconComponent = competencyIcons[comp.title] || Layers;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl border bg-[#24331b] dark:bg-[#0c0f0b] border-[#3e522b] dark:border-white/[0.08] hover:border-[#d4a838] dark:hover:border-[#8ea86d]/40 transition-colors shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2f4021] text-[#e5be53] border border-[#465e34] dark:bg-[#1a2017] dark:text-[#8ea86d] dark:border-transparent mb-3.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#eed07b] dark:text-[#f5f2ea] mb-1">
                    {comp.title}
                  </h4>
                  <p className="text-xs font-bold text-[#ffd875] dark:text-[#8ea86d] mb-2">
                    {comp.tagline}
                  </p>
                  <p className="text-xs leading-relaxed text-[#f6ecd5] dark:text-[#a7ad9f]">
                    {comp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
