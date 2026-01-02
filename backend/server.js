import express from "express";
import cors from "cors";
import data from "./data.js";

const app = express();
app.use(cors());

app.get("/api/portfolio", (req, res) => {
  res.json(data);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
