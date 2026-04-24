const axios = require("axios");

const COINGECKO_API = "https://api.coingecko.com/api/v3";

/**
 * Map token symbols to CoinGecko IDs
 */
const tokenMap = {
  "ETH": "ethereum",
  "BTC": "bitcoin",
  "SOL": "solana",
  "USDT": "tether",
  "USDC": "usd-coin",
  "DAI": "dai",
  "LINK": "chainlink",
  "UNI": "uniswap",
  "AAVE": "aave",
  "WBTC": "wrapped-bitcoin"
};

/**
 * Get current prices for a list of tokens
 */
async function getCryptoPrices(tokens) {
  try {
    const ids = tokens
      .map(token => tokenMap[token.toUpperCase()] || token.toLowerCase())
      .join(",");
    
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids,
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("CoinGecko API error:", error.message);
    throw new Error("Failed to fetch cryptocurrency prices");
  }
}

/**
 * Calculate total portfolio value
 */
async function calculatePortfolioValue(portfolio) {
  try {
    const tokenIds = portfolio.map(item => 
      tokenMap[item.symbol.toUpperCase()] || item.symbol.toLowerCase()
    );
    
    const prices = await getCryptoPrices(portfolio.map(p => p.symbol));
    
    let totalValue = 0;
    portfolio.forEach(item => {
      const id = tokenMap[item.symbol.toUpperCase()] || item.symbol.toLowerCase();
      if (prices[id]) {
        totalValue += (prices[id].usd || 0) * (item.amount || 0);
      }
    });
    
    return totalValue;
  } catch (error) {
    console.error("Error calculating portfolio value:", error);
    throw error;
  }
}

module.exports = {
  getCryptoPrices,
  calculatePortfolioValue
};
