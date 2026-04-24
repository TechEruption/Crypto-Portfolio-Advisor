const express = require("express");
const router = express.Router();
const priceService = require("../services/priceService");

/**
 * GET /api/prices/crypto
 * Fetch current prices of cryptocurrencies
 * Query params: tokens (comma-separated symbol list)
 */
router.get("/crypto", async (req, res) => {
  try {
    const { tokens = "ethereum,bitcoin,solana" } = req.query;
    const tokenList = tokens.split(",").map(t => t.trim());
    
    const prices = await priceService.getCryptoPrices(tokenList);
    
    res.json({
      success: true,
      data: prices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/prices/portfolio-value
 * Calculate total portfolio value based on tokens and amounts
 */
router.post("/portfolio-value", async (req, res) => {
  try {
    const { portfolio } = req.body; // Array of { symbol, amount }
    
    if (!Array.isArray(portfolio) || portfolio.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Portfolio must be a non-empty array"
      });
    }
    
    const totalValue = await priceService.calculatePortfolioValue(portfolio);
    
    res.json({
      success: true,
      totalValue,
      currency: "USD",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error calculating portfolio value:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
