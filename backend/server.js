import express from "express";
import cors from "cors";
import letterRoutes from "./routes/letters.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "SPDT - Sistem Persuratan Digital Terintegrasi API",
    time: new Date().toISOString()
  });
});

// Letter Routes
app.use("/api/letters", letterRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("SPDT API Server is running. Access letter endpoints via /api/letters");
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` SPDT Backend Server is running on port ${PORT}`);
  console.log(` API URL: http://localhost:${PORT}/api/letters`);
  console.log(`===============================================`);
});
