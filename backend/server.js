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

app.get("/api/portfolio", (req, res) => {
  res.json(data);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
