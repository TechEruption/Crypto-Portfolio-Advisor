require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// ============== MIDDLEWARE ==============
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============== ROUTES ==============

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Import route modules
const portfolioRoutes = require("./routes/portfolio");
const aiRoutes = require("./routes/ai");
const priceRoutes = require("./routes/prices");

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/prices", priceRoutes);

// ============== ERROR HANDLING ==============

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Not found",
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    timestamp: new Date().toISOString()
  });
});

// ============== SERVER START ==============

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Crypto Portfolio Advisor - Backend   ║
║   Server running on port ${PORT}           ║
║   Environment: ${process.env.NODE_ENV || "development"}      ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
