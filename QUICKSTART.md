/**
 * QUICK START GUIDE
 * 
 * This is your AI-Powered Crypto Portfolio Advisor MVP!
 * Follow these steps to get running in minutes.
 */

// ============== STEP 1: INSTALL DEPENDENCIES ==============

/*
Windows:
  1. Open PowerShell in project directory
  2. Run: setup.bat

macOS/Linux:
  1. Open Terminal in project directory
  2. Run: bash setup.sh

Manual:
  npm install
  cd backend && npm install && cd ..
  cd frontend && npm install && cd ..
*/

// ============== STEP 2: CONFIGURE ENVIRONMENT ==============

/*
1. Copy .env.example to .env.local
2. Fill in required values:

SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
  → Get from: https://www.alchemy.com/

PRIVATE_KEY=your_wallet_private_key
  → From MetaMask: Settings → Security & Privacy → Export Private Key

OPENAI_API_KEY=sk-your_key_here
  → Get from: https://platform.openai.com/api-keys

ETHERSCAN_API_KEY=your_etherscan_key
  → Get from: https://etherscan.io/apis
*/

// ============== STEP 3: DEPLOY SMART CONTRACT ==============

/*
Windows Command:
  npx hardhat compile
  npx hardhat run scripts/deploy.js --network sepolia

macOS/Linux:
  npx hardhat compile
  npx hardhat run scripts/deploy.js --network sepolia

Output will show:
  ✅ PortfolioAdvisor deployed to: 0x...

IMPORTANT: Copy this address and update .env.local:
  NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
*/

// ============== STEP 4: START BACKEND ==============

/*
Terminal 1:
  cd backend
  npm run dev
  
Output:
  ╔════════════════════════════════════════╗
  ║   Crypto Portfolio Advisor - Backend   ║
  ║   Server running on port 5000          ║
  ╚════════════════════════════════════════╝

Test it:
  curl http://localhost:5000/api/health
*/

// ============== STEP 5: START FRONTEND ==============

/*
Terminal 2:
  cd frontend
  npm run dev
  
Output:
  > ready - started server on 0.0.0.0:3000

Open browser:
  http://localhost:3000
*/

// ============== STEP 6: USE THE APP ==============

/*
1. Click "Launch App" or "Connect Wallet"
2. MetaMask will popup - approve it
3. Make sure you're on Sepolia network
4. Dashboard loads with sample portfolio
5. You'll see:
   ✓ Portfolio Overview (assets and values)
   ✓ Risk Analysis (risk level, diversification score)
   ✓ Portfolio Chart (pie chart of allocation)
   ✓ Rebalancing Suggestions (AI-powered)
6. Click "Apply AI Strategy" to execute
7. Success message appears
*/

// ============== PROJECT FEATURES ==============

/*
✅ FRONTEND FEATURES:
  - Home page with landing info
  - Dashboard with portfolio overview
  - Pie chart visualization
  - Risk analysis panel
  - Rebalancing suggestions
  - Dark theme UI
  - Responsive design
  - Error handling
  - Loading states

✅ BACKEND FEATURES:
  - Express REST API
  - CoinGecko price integration
  - OpenAI AI analysis
  - Portfolio management
  - Risk assessment
  - Rebalancing suggestions
  - Health checks

✅ BLOCKCHAIN FEATURES:
  - Solidity smart contract
  - Store portfolio data
  - Set risk profiles
  - Log rebalancing actions
  - View portfolio history
  - Deployed on Sepolia testnet
  - Gas-efficient
  - Event logging

✅ AI FEATURES:
  - Portfolio risk analysis
  - Diversification scoring
  - Rebalancing suggestions
  - Market sentiment analysis
  - Structured JSON responses
  - Fallback logic if AI unavailable
*/

// ============== API ENDPOINTS ==============

/*
GET  /api/health                    → Server health
GET  /api/prices/crypto             → Crypto prices
POST /api/prices/portfolio-value    → Calculate portfolio value
POST /api/portfolio/save            → Save portfolio
GET  /api/portfolio/:address        → Get portfolio
POST /api/ai/analyze-portfolio      → Analyze risk
POST /api/ai/rebalance-suggestion   → Get suggestions
POST /api/ai/market-sentiment       → Market analysis
*/

// ============== SAMPLE PORTFOLIO ==============

/*
The app comes with sample data:
  ETH:  5 units @ $2,000  = $10,000   (60%)
  BTC:  0.5 units @ $40,000 = $20,000 (20%)
  SOL:  100 units @ $100   = $10,000   (20%)
  
  Total: $40,000 USD

You can modify in: frontend/app/dashboard/page.tsx
*/

// ============== TESTING FLOW ==============

/*
1. Connect Wallet
   - Click "Connect Wallet"
   - Approve MetaMask request
   - Should see your address

2. View Portfolio
   - Table with ETH, BTC, SOL
   - Total value: $40,000
   - Pie chart showing allocation

3. Check Risk Analysis
   - Risk Level: Medium/High
   - Diversification Score: 45-50
   - Concentration Risk: Warning
   - Improvements: Suggestions

4. Get Rebalancing Suggestion
   - Current allocation shown
   - Suggested allocation shown
   - Changes listed (Increase/Reduce)
   - Timeline: 1-2 weeks

5. Apply Strategy
   - Click "Apply AI Strategy"
   - Loading animation
   - Success message
   - Dashboard refreshes
*/

// ============== TROUBLESHOOTING ==============

/*
❌ MetaMask not connecting?
  → Check MetaMask is installed
  → Switch to Sepolia network
  → Allow site to access wallet

❌ Backend not responding?
  → Check port 5000 is available
  → Restart backend: npm run dev
  → Check for errors in console

❌ Frontend build error?
  → Clear cache: rm -rf .next node_modules
  → Reinstall: npm install
  → Restart: npm run dev

❌ Contract address invalid?
  → Redeploy: npx hardhat run scripts/deploy.js --network sepolia
  → Copy new address to .env.local

❌ AI features not working?
  → Check OPENAI_API_KEY is set
  → Check API quota/balance
  → See fallback logic working
*/

// ============== SECURITY TIPS ==============

/*
🔒 IMPORTANT:
  ✓ Never commit .env.local to git
  ✓ Never share private keys
  ✓ Only use testnet funds
  ✓ This is MVP - not production ready
  ✓ Add authentication before mainnet
  ✓ Validate all inputs
  ✓ Use HTTPS in production
  ✓ Implement rate limiting
  ✓ Add database for real data
*/

// ============== FILE STRUCTURE ==============

/*
new project 1/
├── contracts/
│   └── PortfolioAdvisor.sol       ← Smart contract
├── scripts/
│   └── deploy.js                   ← Deployment script
├── backend/
│   ├── server.js                   ← Express server
│   ├── routes/                     ← API endpoints
│   │   ├── prices.js
│   │   ├── ai.js
│   │   └── portfolio.js
│   └── services/                   ← Business logic
│       ├── priceService.js
│       └── aiService.js
├── frontend/
│   ├── app/
│   │   ├── page.tsx               ← Home page
│   │   └── dashboard/
│   │       └── page.tsx           ← Dashboard
│   ├── components/
│   │   ├── WalletButton.tsx
│   │   ├── PortfolioChart.tsx
│   │   ├── RiskAnalysis.tsx
│   │   └── RebalancePanel.tsx
│   ├── hooks/
│   │   └── useWallet.ts
│   └── lib/
│       ├── apiService.ts
│       └── contractService.ts
├── .env.example                    ← Environment template
├── README.md                        ← Full documentation
├── DEPLOYMENT.md                    ← Deployment guide
└── TESTING.md                       ← Testing guide
*/

// ============== NEXT STEPS ==============

/*
After getting the MVP running:

1. Add Database
   → MongoDB/PostgreSQL for portfolio history
   → Store user preferences
   → Track rebalancing history

2. Real Wallet Integration
   → Fetch real token balances
   → Use real prices from API
   → Execute real transactions (testnet first!)

3. More Analytics
   → Historical performance charts
   → P&L calculations
   → Tax reporting
   → Portfolio comparisons

4. Enhanced AI
   → Fine-tuned model for crypto
   → Real-time alerts
   → Predictive analytics
   → Natural language queries

5. Deployment
   → Deploy frontend to Vercel
   → Deploy backend to Render
   → Deploy contract to mainnet
   → Set up monitoring/alerts
*/

// ============== USEFUL LINKS ==============

/*
📚 Documentation:
  Next.js: https://nextjs.org/docs
  Ethers.js: https://docs.ethers.org
  Hardhat: https://hardhat.org
  OpenAI: https://platform.openai.com/docs

🔗 Networks & Tools:
  Alchemy: https://www.alchemy.com/
  Etherscan: https://etherscan.io
  MetaMask: https://metamask.io
  Sepolia Faucet: https://sepoliafaucet.com

💬 Community:
  Ethereum Discord: https://discord.gg/ethereum
  Web3 Twitter: @web3
  Stack Overflow: #solidity #web3
*/

console.log("✅ Quick Start Guide Ready!");
console.log("Follow the steps above to launch your app!");
