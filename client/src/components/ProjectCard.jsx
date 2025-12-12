import { motion } from "framer-motion";

export default function ProjectCard({ title, description, link }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.03, boxShadow: "0 0 15px var(--accent-olive)" }}
    >
      <h3 style={{ color: "var(--accent-olive)" }}>{title}</h3>
      <p>{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener" style={{ color: "var(--accent-olive)" }}>
          View ↗
        </a>
      )}
    </motion.div>
  );
}
