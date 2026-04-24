const axios = require("axios");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API = "https://api.openai.com/v1";

if (!OPENAI_API_KEY) {
  console.warn("Warning: OPENAI_API_KEY not set. AI features will be limited.");
}

/**
 * Analyze user portfolio for risk and diversification
 */
async function analyzePortfolio(portfolio, riskProfile = "Medium") {
  try {
    // Format portfolio data for AI
    const portfolioSummary = Object.entries(portfolio)
      .map(([token, percent]) => `${token}: ${percent}%`)
      .join(", ");
    
    const prompt = `Analyze this cryptocurrency portfolio:
${portfolioSummary}

Current Risk Profile: ${riskProfile}

Please provide a JSON response with:
1. riskLevel: "Low", "Medium", or "High"

2. diversificationScore: 0-100
3. concentrationRisk: description of concentration risks
4. volatilityWarning: any volatility concerns
5. diversificationAnalysis: brief analysis
6. improvements: list of suggested improvements

Format as valid JSON only, no markdown.`;

    const response = await callOpenAI(prompt);
    
    // Parse AI response
    let analysis;
    try {
      analysis = JSON.parse(response);
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        riskLevel: determineRiskLevel(portfolio),
        diversificationScore: calculateDiversificationScore(portfolio),
        concentrationRisk: "Portfolio analysis in progress",
        volatilityWarning: "Check market conditions",
        diversificationAnalysis: response,
        improvements: ["Consider diversifying holdings"]
      };
    }
    
    return analysis;
  } catch (error) {
    console.error("Error analyzing portfolio:", error);
    return getFallbackAnalysis(portfolio);
  }
}

/**
 * Get rebalancing suggestion from AI
 */
async function getRebalanceSuggestion(portfolio, targetRisk = "Medium") {
  try {
    const portfolioSummary = Object.entries(portfolio)
      .map(([token, percent]) => `${token}: ${percent}%`)
      .join(", ");
    
    const prompt = `Based on this portfolio:
${portfolioSummary}

Target risk level: ${targetRisk}

Suggest a rebalancing strategy in JSON format with:
1. currentAllocation: object of current holdings
2. suggestedAllocation: object of suggested holdings
3. changes: array of {token, from%, to%, action}
4. reasoning: brief explanation of why
5. expectedOutcome: what this achieves
6. timeline: recommended timeframe

Format as valid JSON only.`;

    const response = await callOpenAI(prompt);
    
    let suggestion;
    try {
      suggestion = JSON.parse(response);
    } catch {
      suggestion = {
        currentAllocation: portfolio,
        suggestedAllocation: portfolio,
        changes: [],
        reasoning: response,
        expectedOutcome: "Improved portfolio balance",
        timeline: "1-2 weeks"
      };
    }
    
    return suggestion;
  } catch (error) {
    console.error("Error getting rebalance suggestion:", error);
    return getFallbackRebalanceSuggestion(portfolio);
  }
}

/**
 * Analyze market sentiment for specific tokens
 */
async function analyzeMarketSentiment(tokens) {
  try {
    const tokenList = tokens.join(", ");
    
    const prompt = `Provide market sentiment analysis for these tokens in JSON format:
Tokens: ${tokenList}

Include:
1. sentiment: "Bullish", "Bearish", or "Neutral"
2. tokens: array with sentiment for each token
3. keyFactors: array of market factors
4. outlook: short-term outlook
5. recommendation: investment recommendation

Format as valid JSON only.`;

    const response = await callOpenAI(prompt);
    
    let sentiment;
    try {
      sentiment = JSON.parse(response);
    } catch {
      sentiment = {
        sentiment: "Neutral",
        tokens: tokens.map(t => ({ token: t, sentiment: "Neutral" })),
        keyFactors: ["Market conditions stable"],
        outlook: "Monitoring market",
        recommendation: "Hold current positions"
      };
    }
    
    return sentiment;
  } catch (error) {
    console.error("Error analyzing market sentiment:", error);
    return getFallbackSentiment(tokens);
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  
  try {
    const response = await axios.post(
      `${OPENAI_API}/chat/completions`,
      {
        model: process.env.AI_MODEL || "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a crypto portfolio advisor AI. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: parseFloat(process.env.AI_TEMPERATURE || 0.7),
        max_tokens: 1000
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    throw error;
  }
}

/**
 * Fallback analysis when AI is unavailable
 */
function getFallbackAnalysis(portfolio) {
  return {
    riskLevel: determineRiskLevel(portfolio),
    diversificationScore: calculateDiversificationScore(portfolio),
    concentrationRisk: "High concentration detected",
    volatilityWarning: "Monitor market closely",
    diversificationAnalysis: "Portfolio needs better diversification",
    improvements: [
      "Reduce top holding concentration",
      "Add stablecoins for stability",
      "Diversify across different sectors"
    ]
  };
}

/**
 * Fallback rebalance suggestion
 */
function getFallbackRebalanceSuggestion(portfolio) {
  return {
    currentAllocation: portfolio,
    suggestedAllocation: balancePortfolio(portfolio),
    changes: [],
    reasoning: "Standard portfolio balancing approach",
    expectedOutcome: "Better diversification",
    timeline: "1-2 weeks"
  };
}

/**
 * Fallback sentiment analysis
 */
function getFallbackSentiment(tokens) {
  return {
    sentiment: "Neutral",
    tokens: tokens.map(t => ({ token: t, sentiment: "Neutral" })),
    keyFactors: ["Market in consolidation phase"],
    outlook: "Monitor for breakout",
    recommendation: "Maintain positions"
  };
}

/**
 * Determine risk level from portfolio composition
 */
function determineRiskLevel(portfolio) {
  const topHolding = Math.max(...Object.values(portfolio));
  if (topHolding > 60) return "High";
  if (topHolding > 40) return "Medium";
  return "Low";
}

/**
 * Calculate diversification score (0-100)
 */
function calculateDiversificationScore(portfolio) {
  const values = Object.values(portfolio);
  const n = values.length;
  
  if (n === 0) return 0;
  if (n === 1) return 10;
  
  // Calculate Herfindahl index
  const hhi = values.reduce((sum, v) => sum + (v / 100) ** 2, 0);
  const normalized = (1 - hhi) * 100;
  
  return Math.round(normalized);
}

/**
 * Balance portfolio towards equal weight
 */
function balancePortfolio(portfolio) {
  const tokens = Object.keys(portfolio);
  const balanced = {};
  const weight = 100 / tokens.length;
  
  tokens.forEach(token => {
    balanced[token] = Math.round(weight * 10) / 10;
  });
  
  return balanced;
}

module.exports = {
  analyzePortfolio,
  getRebalanceSuggestion,
  analyzeMarketSentiment
};
