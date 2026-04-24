const express = require("express");
const router = express.Router();

/**
 * POST /api/portfolio/save
 * Save user portfolio to backend
 */
router.post("/save", (req, res) => {
  try {
    const { userAddress, portfolio, totalValue, riskProfile } = req.body;
    
    if (!userAddress || !portfolio) {
      return res.status(400).json({
        success: false,
        error: "User address and portfolio data are required"
      });
    }
    
    // In production, you'd save this to a database
    console.log("Portfolio saved for user:", userAddress);
    
    res.json({
      success: true,
      message: "Portfolio saved successfully",
      data: {
        userAddress,
        portfolio,
        totalValue,
        riskProfile,
        savedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Error saving portfolio:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/portfolio/:userAddress
 * Get user portfolio data
 */
router.get("/:userAddress", (req, res) => {
  try {
    const { userAddress } = req.params;
    
    // In production, you'd fetch from database
    res.json({
      success: true,
      data: {
        userAddress,
        portfolio: {},
        totalValue: 0,
        riskProfile: "Medium",
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
