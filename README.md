# AI-Powered Crypto Portfolio Advisor

A modern Web3 application that connects to crypto wallets, analyzes portfolio risk, and provides AI-powered rebalancing suggestions.

## 🚀 Features

- **Wallet Integration**: Connect MetaMask and fetch real-time portfolio data
- **Portfolio Dashboard**: Visualize assets with pie charts and stats
- **AI Risk Analysis**: Get comprehensive risk assessment and diversification scores
- **Rebalancing Suggestions**: AI-powered portfolio rebalancing recommendations
- **Smart Contract Integration**: Log strategies and actions on Sepolia testnet
- **Modern UI**: Beautiful dark-themed dashboard with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- Next.js 13+ (App Router)
- React 18
- Tailwind CSS
- Recharts (visualizations)
- Ethers.js (Web3)
- Lucide React (icons)

### Backend
- Node.js + Express
- Axios (HTTP)
- OpenAI API (AI analysis)
- CoinGecko API (pricing)

### Blockchain
- Solidity smart contract
- Hardhat (development framework)
- Sepolia testnet deployment
- MetaMask integration

## 📋 Project Structure

```
.
├── contracts/
│   ├── PortfolioAdvisor.sol    # Main smart contract
│   └── artifacts/               # Compiled contracts
├── scripts/
│   └── deploy.js               # Deployment script
├── backend/
│   ├── server.js               # Express server
│   ├── routes/
│   │   ├── prices.js           # Pricing endpoints
│   │   ├── ai.js               # AI analysis endpoints
│   │   └── portfolio.js        # Portfolio endpoints
│   ├── services/
│   │   ├── priceService.js     # CoinGecko API
│   │   └── aiService.js        # OpenAI integration
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Home page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── WalletButton.tsx    # Wallet connection
│   │   ├── PortfolioChart.tsx  # Pie chart
│   │   ├── PriceChart.tsx      # Line chart
│   │   ├── RiskAnalysis.tsx    # Risk display
│   │   ├── RebalancePanel.tsx  # Rebalancing UI
│   │   ├── PortfolioOverview.tsx # Portfolio table
│   │   └── Common.tsx          # Shared components
│   ├── hooks/
│   │   └── useWallet.ts        # Wallet connection hook
│   ├── lib/
│   │   ├── apiService.ts       # API client
│   │   └── contractService.ts  # Smart contract interaction
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── package.json                # Root package.json
├── hardhat.config.js           # Hardhat config
└── .env.example                # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- MetaMask browser extension
- Alchemy RPC endpoint (for Sepolia testnet)

### 1. Install Dependencies

```bash
# Root dependencies
npm install

# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and add:
# - SEPOLIA_RPC_URL (from Alchemy/Infura)
# - PRIVATE_KEY (your wallet key for deployment)
# - OPENAI_API_KEY (for AI features)
# - ETHERSCAN_API_KEY (for verification)
```

### 3. Deploy Smart Contract

```bash
# Compile contract
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local with deployed address
```

### 4. Start Backend

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### 5. Start Frontend

```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## 🔑 API Endpoints

### Portfolio
- `POST /api/portfolio/save` - Save user portfolio
- `GET /api/portfolio/:userAddress` - Get portfolio data

### Pricing
- `GET /api/prices/crypto?tokens=ETH,BTC,SOL` - Get crypto prices
- `POST /api/prices/portfolio-value` - Calculate portfolio value

### AI Analysis
- `POST /api/ai/analyze-portfolio` - Analyze risk and diversification
- `POST /api/ai/rebalance-suggestion` - Get rebalancing suggestions
- `POST /api/ai/market-sentiment` - Analyze market sentiment

## 📊 Smart Contract Functions

```solidity
// Store portfolio data
storePortfolio(address user, string data, uint256 totalValue)

// Set risk profile
setRiskProfile(address user, string level)

// Log rebalancing action
rebalance(address user, string data, string suggestion)

// View functions
getUserPortfolio(address user)
getRiskProfile(address user)
getRebalanceHistory(address user)
portfolioExists(address user)
```

## 🧠 AI Integration

The app uses OpenAI to analyze portfolios:

```
Prompt Structure:
- Current portfolio allocation
- Risk profile preference
- Requested analysis type

Returns:
- Risk level (Low/Medium/High)
- Diversification score (0-100)
- Concentration risks
- Suggested improvements
- Rebalancing recommendations
```

## 🎨 UI Features

- **Dark Theme**: Web3-optimized dark interface
- **Responsive Design**: Works on mobile, tablet, desktop
- **Live Charts**: Real-time portfolio visualization
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions and interactions

## ⚙️ Configuration

### Network Configuration
- Default: Sepolia Testnet (ChainId: 11155111)
- Environment: `NEXT_PUBLIC_NETWORK=sepolia`
- RPC: Configure in `hardhat.config.js`

### AI Configuration
- Model: `gpt-3.5-turbo` (configurable)
- Temperature: `0.7` (can adjust in .env)
- Max tokens: `1000`

### API Timeouts
- Backend: 30 seconds
- Frontend: 30 seconds

## 🧪 Testing

### Sample Portfolio Data
```json
{
  "ETH": 60,
  "BTC": 20,
  "SOL": 20
}
```

### Test Risk Profiles
- Low: Stable, diversified (< 40% concentration)
- Medium: Balanced approach
- High: Concentrated or speculative (> 60% concentration)

## 📝 Sample AI Output

```json
{
  "riskLevel": "High",
  "diversificationScore": 45,
  "concentrationRisk": "Portfolio heavily concentrated in ETH (60%)",
  "improvements": [
    "Reduce ETH allocation to 40%",
    "Add stablecoins (USDC/DAI) for stability",
    "Diversify into additional assets"
  ],
  "suggestion": {
    "changes": [
      { "token": "ETH", "from": 60, "to": 40, "action": "Reduce" },
      { "token": "USDC", "from": 0, "to": 20, "action": "Add" },
      { "token": "SOL", "from": 20, "to": 30, "action": "Increase" }
    ]
  }
}
```

## 🔐 Security Notes

⚠️ **Important**: This is an MVP for testing on Sepolia testnet only!

- Never expose private keys
- Use environment variables for sensitive data
- Test thoroughly before mainnet deployment
- Contract is not audited - use at your own risk

## 🐛 Troubleshooting

### MetaMask Not Connecting
- Ensure MetaMask is installed
- Check if you're on Sepolia network
- Clear browser cache and reconnect

### Contract Deployment Fails
- Verify Alchemy RPC URL is correct
- Ensure account has Sepolia ETH for gas
- Check private key format

### AI API Errors
- Verify OpenAI API key is valid
- Check API usage and quota
- Ensure prompt format is correct

### Backend Not Starting
- Check if port 5000 is available
- Verify all dependencies installed
- Check environment variables

## 📚 Additional Resources

- [Ethers.js Documentation](https://docs.ethers.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Solidity Documentation](https://docs.soliditylang.org)

## 🤝 Contributing

This is an MVP project. Contributions welcome!

## 📄 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This application is provided as-is for educational and testing purposes. Do not use with real funds on mainnet. Users are responsible for understanding the risks of cryptocurrency trading and portfolio management.

---

**Built with ❤️ for Web3 developers**
