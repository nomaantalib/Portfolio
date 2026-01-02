import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`p-6 text-center rounded-t-3xl ${
      darkMode ? "text-gray-300 bg-linear-to-r from-gray-900 to-black" : "text-gray-700 bg-linear-to-r from-gray-100 to-white"
    }`}>
      © {new Date().getFullYear()} Mohd Nomaan Talib
    </footer>
  );
}
