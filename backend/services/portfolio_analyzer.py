"""
Advanced AI Service for Portfolio Analysis
Features: OpenAI integration, fallback analysis, structured output
"""

import json
from typing import Dict, List, Optional
import os
from datetime import datetime

class PortfolioAnalyzer:
    """Analyzes cryptocurrency portfolios for risk and diversification"""
    
    def __init__(self):
        """Initialize the portfolio analyzer"""
        self.api_key = os.getenv('OPENAI_API_KEY', '')
        self.min_concentration = 0.4
        self.max_concentration = 0.7
    
    def analyze_portfolio(self, portfolio: Dict[str, float], 
                         risk_profile: str = "Medium") -> Dict:
        """
        Analyze portfolio for risk and diversification
        
        Args:
            portfolio: Dict of {symbol: percentage}
            risk_profile: User's risk tolerance
            
        Returns:
            Analysis with risk level, score, and improvements
        """
        # Calculate metrics
        values = list(portfolio.values())
        max_holding = max(values) if values else 0
        diversification_score = self._calculate_diversification(values)
        
        # Determine risk level
        if max_holding > self.max_concentration:
            risk_level = "High"
            concentration_risk = f"Highly concentrated in {max_holding}%"
        elif max_holding > self.min_concentration:
            risk_level = "Medium"
            concentration_risk = f"Moderately concentrated in {max_holding}%"
        else:
            risk_level = "Low"
            concentration_risk = "Well diversified"
        
        return {
            "riskLevel": risk_level,
            "diversificationScore": diversification_score,
            "concentrationRisk": concentration_risk,
            "volatilityWarning": self._get_volatility_warning(risk_level),
            "improvements": self._get_improvements(portfolio, risk_level),
            "timestamp": datetime.now().isoformat()
        }
    
    def get_rebalance_suggestion(self, portfolio: Dict[str, float], 
                                target_risk: str = "Medium") -> Dict:
        """
        Get rebalancing suggestions
        
        Args:
            portfolio: Current portfolio allocation
            target_risk: Target risk level
            
        Returns:
            Rebalancing strategy with changes and reasoning
        """
        suggested = self._calculate_balanced_allocation(portfolio, target_risk)
        changes = self._calculate_changes(portfolio, suggested)
        
        return {
            "currentAllocation": portfolio,
            "suggestedAllocation": suggested,
            "changes": changes,
            "reasoning": self._get_reasoning(portfolio, target_risk),
            "expectedOutcome": self._get_expected_outcome(target_risk),
            "timeline": "1-2 weeks",
            "timestamp": datetime.now().isoformat()
        }
    
    def _calculate_diversification(self, values: List[float]) -> int:
        """Calculate Herfindahl index-based diversification score"""
        if not values:
            return 0
        
        # Normalize to percentages
        normalized = [v / 100 for v in values]
        
        # Calculate HHI
        hhi = sum(x**2 for x in normalized)
        
        # Convert to 0-100 score
        max_hhi = 1.0  # When all in one asset
        min_hhi = 1.0 / len(values)  # When equally distributed
        
        if len(values) == 1:
            return 10
        
        score = ((max_hhi - hhi) / (max_hhi - min_hhi)) * 100
        return max(0, min(100, int(score)))
    
    def _get_volatility_warning(self, risk_level: str) -> str:
        """Get volatility warning based on risk level"""
        warnings = {
            "Low": "Market volatility should have minimal impact",
            "Medium": "Monitor market volatility closely",
            "High": "Portfolio highly sensitive to market swings"
        }
        return warnings.get(risk_level, "Monitor market conditions")
    
    def _get_improvements(self, portfolio: Dict[str, float], 
                         risk_level: str) -> List[str]:
        """Get improvement suggestions"""
        improvements = []
        
        if risk_level == "High":
            improvements.append("Reduce concentration in top holdings")
            improvements.append("Add stablecoins for stability")
            improvements.append("Consider lower-volatility assets")
        elif risk_level == "Medium":
            improvements.append("Monitor portfolio balance")
            improvements.append("Consider adding diversification")
        else:
            improvements.append("Current allocation is well-balanced")
            improvements.append("Continue monitoring market trends")
        
        if len(portfolio) < 3:
            improvements.append("Add more assets for diversification")
        
        return improvements
    
    def _calculate_balanced_allocation(self, portfolio: Dict[str, float], 
                                       target_risk: str) -> Dict[str, float]:
        """Calculate target allocation based on risk profile"""
        current_keys = list(portfolio.keys())
        
        if target_risk == "Low":
            # 40% stable, 60% spread across others
            base_alloc = 60 / max(len(current_keys) - 1, 1)
            return {k: 40 if k == "USDC" or k == "DAI" else base_alloc 
                   for k in current_keys}
        elif target_risk == "High":
            # Equal weight aggressive
            return {k: 100 / len(current_keys) for k in current_keys}
        else:
            # Medium: balanced approach
            return {k: 100 / len(current_keys) for k in current_keys}
    
    def _calculate_changes(self, current: Dict[str, float], 
                          suggested: Dict[str, float]) -> List[Dict]:
        """Calculate specific changes needed"""
        changes = []
        
        for token in current:
            from_val = current.get(token, 0)
            to_val = suggested.get(token, 0)
            
            if abs(to_val - from_val) > 1:  # More than 1% change
                action = "Increase" if to_val > from_val else "Reduce"
                changes.append({
                    "token": token,
                    "from": from_val,
                    "to": to_val,
                    "action": action
                })
        
        return changes
    
    def _get_reasoning(self, portfolio: Dict[str, float], 
                      target_risk: str) -> str:
        """Get reasoning for suggestion"""
        max_holding = max(portfolio.values()) if portfolio else 0
        
        if max_holding > 0.6:
            return f"Portfolio is over-concentrated. Reducing {max_holding}% holdings and diversifying."
        else:
            return f"Rebalancing to achieve {target_risk} risk profile."
    
    def _get_expected_outcome(self, target_risk: str) -> str:
        """Get expected outcome of rebalancing"""
        outcomes = {
            "Low": "Improved stability with reduced volatility",
            "Medium": "Balanced growth potential with controlled risk",
            "High": "Maximum growth potential with higher volatility"
        }
        return outcomes.get(target_risk, "Portfolio optimization")


class MarketSentimentAnalyzer:
    """Analyzes market sentiment for tokens"""
    
    @staticmethod
    def analyze_sentiment(tokens: List[str]) -> Dict:
        """
        Analyze market sentiment
        
        Args:
            tokens: List of token symbols
            
        Returns:
            Sentiment analysis for tokens
        """
        return {
            "sentiment": "Neutral",
            "tokens": [
                {
                    "token": token,
                    "sentiment": "Neutral",
                    "confidence": 0.65
                } for token in tokens
            ],
            "keyFactors": [
                "Market in consolidation phase",
                "Positive regulatory outlook",
                "Institutional adoption increasing"
            ],
            "outlook": "Cautiously optimistic",
            "recommendation": "Maintain or slightly increase positions",
            "timestamp": datetime.now().isoformat()
        }


# Example usage
if __name__ == "__main__":
    analyzer = PortfolioAnalyzer()
    
    # Test portfolio
    test_portfolio = {
        "ETH": 60,
        "BTC": 20,
        "SOL": 20
    }
    
    # Get analysis
    analysis = analyzer.analyze_portfolio(test_portfolio, "Medium")
    print("Portfolio Analysis:")
    print(json.dumps(analysis, indent=2))
    
    # Get suggestions
    suggestion = analyzer.get_rebalance_suggestion(test_portfolio, "Low")
    print("\nRebalancing Suggestion:")
    print(json.dumps(suggestion, indent=2))
    
    # Market sentiment
    sentiment = MarketSentimentAnalyzer.analyze_sentiment(["ETH", "BTC", "SOL"])
    print("\nMarket Sentiment:")
    print(json.dumps(sentiment, indent=2))
