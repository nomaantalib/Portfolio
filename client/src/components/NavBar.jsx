import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <motion.nav
      className="container flex justify-between items-center py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h1 style={{ color: "var(--accent-olive)" }}>My Portfolio</h1>
      <ul className="flex gap-6">
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </motion.nav>
  );
}
