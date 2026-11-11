import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import letterRoutes from "./routes/letters.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve Frontend Static Files (from frontend/dist)
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

// SPA Catch-all: kirim index.html untuk semua route selain /api
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Start Server (listening on 0.0.0.0 agar bisa diakses Tailscale dan LAN)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`===============================================`);
  console.log(` SPDT Full-Stack Server is running on port ${PORT}`);
  console.log(` Local URL     : http://localhost:${PORT}`);
  console.log(` Tailscale URL : http://100.90.63.47:${PORT}`);
  console.log(`===============================================`);
});
