import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import letterRoutes from "./routes/letters.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup for dynamic origins (local development and production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  process.env.CLIENT_ORIGIN
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      // Check if origin matches allowed static list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview/production deployments (*.vercel.app)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Allow local network IP or localhost on any port
      if (/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|100\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // Fallback: allow request while maintaining header reflections
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
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
