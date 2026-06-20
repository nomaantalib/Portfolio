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
  "https://fixflow-ai-z7zj.onrender.com/",
  "https://team-task-manager-m34e.onrender.com/",
  "https://schoolmind-ai-nmdp.onrender.com/",
  "https://call-audit-app-brrj.onrender.com/",
  "https://code-review-app-mlku.onrender.com/",
  "https://lead-crm-frontend.onrender.com/",
  "https://apphub-3dwi.onrender.com/"
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
  // Trigger background ping to projects when portfolio is accessed
  warmupServices();
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

