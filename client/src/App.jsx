import NavBar from "./components/NavBar";
import ProjectCard from "./components/ProjectCard";
import "./index.css";

const projects = [
  {
    title: "ChatGPT Clone",
    description: "A minimal React + Node chatbot with OpenAI API.",
    link: "#",
  },
  {
    title: "Weather Dashboard",
    description: "Live weather data visualised with Chart.js.",
    link: "#",
  },
];

export default function App() {
  return (
    <>
      <NavBar />
      <section className="container py-12" id="projects">
        <h2 style={{ color: "var(--accent-olive)", marginBottom: "1rem" }}>
          Projects
        </h2>
        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
