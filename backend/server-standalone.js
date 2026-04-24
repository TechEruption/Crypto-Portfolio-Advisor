require("dotenv").config();

// ============== EXPRESS SETUP ==============
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============== LOGGING ==============
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
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Portfolio routes
app.post("/api/portfolio/save", (req, res) => {
  const { userAddress, portfolio, totalValue, riskProfile } = req.body;

  if (!userAddress || !portfolio) {
    return res.status(400).json({
      success: false,
      error: "User address and portfolio data are required",
    });
  }

  res.json({
    success: true,
    message: "Portfolio saved successfully",
    data: {
      userAddress,
      portfolio,
      totalValue,
      riskProfile,
      savedAt: new Date().toISOString(),
    },
  });
});

app.get("/api/portfolio/:userAddress", (req, res) => {
  const { userAddress } = req.params;

  res.json({
    success: true,
    data: {
      userAddress,
      portfolio: {},
      totalValue: 0,
      riskProfile: "Medium",
      lastUpdated: new Date().toISOString(),
    },
  });
});

// Price routes
app.get("/api/prices/crypto", async (req, res) => {
  try {
    const { tokens = "ethereum,bitcoin,solana" } = req.query;

    // Mock response (in production, call CoinGecko API)
    const mockPrices = {
      ethereum: {
        usd: 2000,
        market_cap: 240000000000,
        usd_24h_change: 2.5,
      },
      bitcoin: {
        usd: 40000,
        market_cap: 780000000000,
        usd_24h_change: 1.2,
      },
      solana: {
        usd: 100,
        market_cap: 30000000000,
        usd_24h_change: -1.5,
      },
    };

    res.json({
      success: true,
      data: mockPrices,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/api/prices/portfolio-value", (req, res) => {
  try {
    const { portfolio } = req.body;

    if (!Array.isArray(portfolio) || portfolio.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Portfolio must be a non-empty array",
      });
    }

    // Calculate total value (mock)
    const totalValue = portfolio.reduce((sum, item) => {
      return sum + (item.amount || 0) * (item.price || 0);
    }, 0);

    res.json({
      success: true,
      totalValue,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// AI routes
app.post("/api/ai/analyze-portfolio", (req, res) => {
  try {
    const { portfolio, riskProfile } = req.body;

    if (!portfolio || Object.keys(portfolio).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Portfolio data is required",
      });
    }

    // Mock analysis
    const analysis = {
      riskLevel: "Medium",
      diversificationScore: 65,
      concentrationRisk: "Portfolio has moderate concentration in ETH",
      volatilityWarning: "Monitor market volatility",
      diversificationAnalysis: "Good diversification across major assets",
      improvements: [
        "Consider adding stablecoins",
        "Reduce single-asset concentration",
        "Monitor market trends",
      ],
    };

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/api/ai/rebalance-suggestion", (req, res) => {
  try {
    const { portfolio, targetRisk } = req.body;

    if (!portfolio || Object.keys(portfolio).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Portfolio data is required",
      });
    }

    // Mock suggestion
    const suggestion = {
      currentAllocation: portfolio,
      suggestedAllocation: {
        ...portfolio,
      },
      changes: [
        {
          token: "ETH",
          from: portfolio.ETH || 60,
          to: 45,
          action: "Reduce",
        },
        {
          token: "USDC",
          from: 0,
          to: 20,
          action: "Add",
        },
      ],
      reasoning: "Better risk balance with stablecoins",
      expectedOutcome: "Improved portfolio resilience",
      timeline: "1-2 weeks",
    };

    res.json({
      success: true,
      suggestion,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/api/ai/market-sentiment", (req, res) => {
  try {
    const { tokens } = req.body;

    if (!Array.isArray(tokens) || tokens.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Tokens array is required",
      });
    }

    // Mock sentiment
    const sentiment = {
      sentiment: "Neutral",
      tokens: tokens.map(t => ({
        token: t,
        sentiment: "Neutral",
      })),
      keyFactors: [
        "Market consolidation phase",
        "Positive regulatory outlook",
      ],
      outlook: "Monitor for breakout",
      recommendation: "Maintain current positions",
    };

    res.json({
      success: true,
      sentiment,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============== ERROR HANDLING ==============

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path,
    method: req.method,
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

// ============== SERVER START ==============

const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Crypto Portfolio Advisor - Backend   ║
║   Server running on port ${PORT}          ║
║   Environment: ${process.env.NODE_ENV || "development"}     ║
║   Ready for requests!                  ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
