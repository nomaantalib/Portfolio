import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className="py-8 border-t border-[#ded5c2] dark:border-white/[0.08] transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2d3723] dark:text-[#9ea695]">
        <p className="font-medium">
          © {new Date().getFullYear()} Mohd Nomaan Talib. All rights reserved.
        </p>
        <p className="font-bold text-[#35451e] dark:text-[#8ea86d]">
          Associate Product Manager & AI Engineer
        </p>
      </div>
    </footer>
  );
}
