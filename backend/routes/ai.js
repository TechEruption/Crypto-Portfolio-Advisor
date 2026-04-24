const express = require("express");
const router = express.Router();
const aiService = require("../services/aiService");

/**
 * POST /api/ai/analyze-portfolio
 * Analyze user portfolio for risk and diversification
 */
router.post("/analyze-portfolio", async (req, res) => {
  try {
    const { portfolio, riskProfile } = req.body;
    
    if (!portfolio || Object.keys(portfolio).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Portfolio data is required"
      });
    }
    
    const analysis = await aiService.analyzePortfolio(portfolio, riskProfile);
    
    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error analyzing portfolio:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/ai/rebalance-suggestion
 * Get AI suggestion for portfolio rebalancing
 */
router.post("/rebalance-suggestion", async (req, res) => {
  try {
    const { portfolio, targetRisk } = req.body;
    
    if (!portfolio || Object.keys(portfolio).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Portfolio data is required"
      });
    }
    
    const suggestion = await aiService.getRebalanceSuggestion(
      portfolio,
      targetRisk || "Medium"
    );
    
    res.json({
      success: true,
      suggestion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error generating rebalance suggestion:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/ai/market-sentiment
 * Get AI analysis of current market sentiment
 */
router.post("/market-sentiment", async (req, res) => {
  try {
    const { tokens } = req.body;
    
    if (!Array.isArray(tokens) || tokens.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Tokens array is required"
      });
    }
    
    const sentiment = await aiService.analyzeMarketSentiment(tokens);
    
    res.json({
      success: true,
      sentiment,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error analyzing market sentiment:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
