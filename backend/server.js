import express from "express";
import data from "./data.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nomaantalibportfolio.onrender.com",
    ],
    credentials: true,
  })
);

const warmupUrls = [
  "https://nomaantalibportfolio.onrender.com/",
  "https://portfolio-backend-4rls.onrender.com/api/portfolio",
  "https://fixflow-ai-l2rj.onrender.com/",
  "https://team-task-manager-jk76.onrender.com/",
  "https://schoolmind-ai-nmdp.onrender.com/",
  "https://call-audit-app-l80c.onrender.com/",
  "https://code-review-app-mlku.onrender.com/",
  "https://lead-crm-frontend.onrender.com/",
  "https://apphub-nzw8.onrender.com/",
  "https://senitel-ai-2s1x.onrender.com/"
];

const warmupServices = () => {
  console.log("Running warmup check for cold starts...");
  warmupUrls.forEach(url => {
    fetch(url)
      .then(res => console.log(`Warmup ping success: ${url} (Status: ${res.status})`))
      .catch(err => console.error(`Warmup ping failed: ${url} (${err.message})`));
  });
};

app.get("/api/portfolio", (req, res) => {
  res.json(data);
});

app.get("/api/warmup", (req, res) => {
  warmupServices();
  res.json({ message: "Warmup pings triggered successfully." });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

