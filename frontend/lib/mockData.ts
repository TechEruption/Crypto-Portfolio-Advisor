// Mock Portfolio Data
export const mockPortfolio = {
  totalValue: 12540.50,
  change24h: 2.3,
  changeColor: 'success',
  assets: [
    {
      id: 1,
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 5.25,
      price: 1880.5,
      value: 9872.625,
      change: 3.2,
      changeColor: 'success',
      color: '#3B82F6',
    },
    {
      id: 2,
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.15,
      price: 41250.0,
      value: 6187.5,
      change: -1.5,
      changeColor: 'danger',
      color: '#F59E0B',
    },
    {
      id: 3,
      symbol: 'SOL',
      name: 'Solana',
      balance: 125.5,
      price: 22.3,
      value: 2798.65,
      change: 5.8,
      changeColor: 'success',
      color: '#9F7AEA',
    },
    {
      id: 4,
      symbol: 'USDC',
      name: 'USDC',
      balance: 500,
      price: 1.0,
      value: 500,
      change: 0.0,
      changeColor: 'warning',
      color: '#22C55E',
    },
  ],
};

// Mock AI Insights
export const mockAIInsights = {
  risk: 'Medium',
  riskScore: 65,
  diversification: 72,
  concentration: 'ETH dominates at 78.6% of portfolio',
  suggestions: [
    'Consider reducing ETH exposure by 15-20%',
    'Increase stablecoin allocation to 25-30%',
    'Add emerging L2 solutions to diversify',
    'Rebalance quarterly or when any asset exceeds 50%',
  ],
  recommendation: 'Your portfolio shows good diversification but is heavily weighted towards ETH. Consider a tactical rebalance to reduce concentration risk.',
};

// Mock Price History (last 7 days)
export const mockPriceHistory = [
  { date: 'Mon', ETH: 1820, BTC: 40800, SOL: 21.2 },
  { date: 'Tue', ETH: 1845, BTC: 41050, SOL: 21.8 },
  { date: 'Wed', ETH: 1865, BTC: 41200, SOL: 22.1 },
  { date: 'Thu', ETH: 1852, BTC: 41100, SOL: 21.9 },
  { date: 'Fri', ETH: 1890, BTC: 41250, SOL: 22.3 },
  { date: 'Sat', ETH: 1875, BTC: 41150, SOL: 22.0 },
  { date: 'Sun', ETH: 1880.5, BTC: 41250, SOL: 22.3 },
];

// Mock Activity Feed
export const mockActivityFeed = [
  {
    id: 1,
    type: 'rebalance',
    title: 'Portfolio Rebalanced',
    description: 'Applied AI strategy to reduce ETH exposure',
    timestamp: '2 hours ago',
    icon: '⚖️',
  },
  {
    id: 2,
    type: 'view',
    title: 'Portfolio Viewed',
    description: 'Dashboard analysis completed',
    timestamp: '4 hours ago',
    icon: '👁️',
  },
  {
    id: 3,
    type: 'insight',
    title: 'New AI Insight',
    description: 'High volatility detected in SOL',
    timestamp: '1 day ago',
    icon: '💡',
  },
  {
    id: 4,
    type: 'rebalance',
    title: 'Previous Rebalance',
    description: 'Strategic allocation update',
    timestamp: '3 days ago',
    icon: '⚖️',
  },
];

// Rebalance Suggestion
export const mockRebalanceSuggestion = {
  current: [
    { symbol: 'ETH', percentage: 78.6 },
    { symbol: 'BTC', percentage: 12.3 },
    { symbol: 'SOL', percentage: 5.8 },
    { symbol: 'USDC', percentage: 3.3 },
  ],
  suggested: [
    { symbol: 'ETH', percentage: 60, change: -18.6 },
    { symbol: 'BTC', percentage: 20, change: 7.7 },
    { symbol: 'SOL', percentage: 10, change: 4.2 },
    { symbol: 'USDC', percentage: 10, change: 6.7 },
  ],
  reasoning: 'Reduces concentration risk while maintaining growth potential.',
  expectedOutcome: 'Improved risk-adjusted returns with lower volatility.',
};

// Stats for Dashboard
export const mockStats = [
  { label: 'Total Assets', value: mockPortfolio.assets.length.toString() },
  { label: '24h Change', value: `${mockPortfolio.change24h > 0 ? '+' : ''}${mockPortfolio.change24h}%`, color: 'success' },
  { label: 'Diversification', value: `${mockAIInsights.diversification}%` },
  { label: 'Risk Level', value: mockAIInsights.risk },
];
