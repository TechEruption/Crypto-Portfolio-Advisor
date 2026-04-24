"""
ARCHITECTURE OVERVIEW - AI-Powered Crypto Portfolio Advisor MVP
"""

# System Architecture Diagram
# ==========================

SYSTEM_ARCHITECTURE = """

                    ╔════════════════════════════════════════════╗
                    ║         USER (Web Browser)                  ║
                    ║     http://localhost:3000                  ║
                    ╚════════════════════════════════════════════╝
                                        ▲
                                        │ HTTP/WebSocket
                                        ▼
    ┌──────────────────────────────────────────────────────────────┐
    │                     FRONTEND (Next.js)                        │
    │              Port 3000 | App Router | TypeScript             │
    ├──────────────────────────────────────────────────────────────┤
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Pages                                                   │ │
    │  │  - page.tsx (Home)                                      │ │
    │  │  - dashboard/page.tsx (Dashboard)                       │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Components                                              │ │
    │  │  ├─ WalletButton (MetaMask)                             │ │
    │  │  ├─ PortfolioOverview (Table)                           │ │
    │  │  ├─ PortfolioChart (Pie Chart)                          │ │
    │  │  ├─ PriceChart (Line Chart)                             │ │
    │  │  ├─ RiskAnalysis (Risk Panel)                           │ │
    │  │  ├─ RebalancePanel (Suggestions)                        │ │
    │  │  └─ Common (Shared UI)                                  │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Hooks & Libraries                                      │ │
    │  │  ├─ useWallet.ts (Web3 Connection)                      │ │
    │  │  ├─ apiService.ts (REST Client)                         │ │
    │  │  └─ contractService.ts (Smart Contract)                 │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Styling                                                │ │
    │  │  ├─ Tailwind CSS (Utilities)                            │ │
    │  │  ├─ globals.css (Global Styles)                         │ │
    │  │  └─ Dark Theme (Web3 Style)                             │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    └──────────────────────────────────────────────────────────────┘
                                        ▲
                                        │ REST API
                                        │ JSON/HTTP
                                        ▼
    ┌──────────────────────────────────────────────────────────────┐
    │                   BACKEND (Express.js)                        │
    │              Port 5000 | Node.js | REST API                 │
    ├──────────────────────────────────────────────────────────────┤
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Routes                                                 │ │
    │  │  ├─ /api/health                                        │ │
    │  │  ├─ /api/portfolio/*                                   │ │
    │  │  ├─ /api/prices/*                                      │ │
    │  │  └─ /api/ai/*                                          │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Services                                               │ │
    │  │  ├─ priceService.js (CoinGecko API)                    │ │
    │  │  ├─ aiService.js (OpenAI Integration)                  │ │
    │  │  └─ portfolio_analyzer.py (Analysis Engine)            │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Middleware                                             │ │
    │  │  ├─ CORS (Cross-Origin)                                │ │
    │  │  ├─ JSON Parser                                         │ │
    │  │  └─ Error Handler                                       │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    └──────────────────────────────────────────────────────────────┘
            ▲              ▲              ▲              ▲
            │              │              │              │
            │              │              │              │
    ┌───────┴──┐    ┌──────┴──┐   ┌──────┴───┐   ┌──────┴───┐
    │           │    │         │   │          │   │          │
    ▼           ▼    ▼         ▼   ▼          ▼   ▼          ▼
  
    MetaMask   Sepolia   CoinGecko   OpenAI   Ethers.js   Hardhat
    Wallet     Network   API         API      Library     Deploy
    
    ┌──────────────────────────────────────────────────────────────┐
    │              BLOCKCHAIN (Sepolia Testnet)                     │
    │                   Ethereum L1 Network                         │
    ├──────────────────────────────────────────────────────────────┤
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Smart Contract: PortfolioAdvisor                        │ │
    │  │  Address: 0x...                                         │ │
    │  │                                                          │ │
    │  │  Functions:                                             │ │
    │  │  ├─ storePortfolio(user, data, value)                  │ │
    │  │  ├─ setRiskProfile(user, level)                        │ │
    │  │  ├─ rebalance(user, data, suggestion)                  │ │
    │  │  ├─ getUserPortfolio(user)                             │ │
    │  │  ├─ getRebalanceHistory(user)                          │ │
    │  │  └─ getRebalanceCount(user)                            │ │
    │  │                                                          │ │
    │  │  Events Logged:                                         │ │
    │  │  ├─ PortfolioStored                                    │ │
    │  │  ├─ RiskProfileSet                                     │ │
    │  │  └─ RebalanceExecuted                                  │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │  Contract Storage                                        │ │
    │  │  ├─ portfolios[user] → Portfolio Data                  │ │
    │  │  ├─ rebalanceHistory[user] → Actions                   │ │
    │  │  ├─ userRiskProfiles[user] → Risk Level                │ │
    │  │  └─ users[] → Active Users List                        │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    └──────────────────────────────────────────────────────────────┘

"""

# Data Flow Diagram
# =================

DATA_FLOW = """

    USER INTERACTION FLOW:
    
    1. CONNECT WALLET
       User → [Connect Button] → MetaMask Popup → [Approve] → Frontend
                                                                    ↓
                                                    useWallet Hook Activated
                                                                    ↓
                                                    Address Stored in State
                                                                    ↓
                                                    Dashboard Rendered
    
    2. LOAD PORTFOLIO
       Frontend → [API Call] → Backend
                                    ↓
                          /api/prices/crypto
                          /api/ai/analyze-portfolio
                          /api/ai/rebalance-suggestion
                                    ↓
                            Backend Services
                            ├─ priceService.js
                            ├─ aiService.js
                            └─ portfolio_analyzer.py
                                    ↓
                          External APIs
                          ├─ CoinGecko
                          └─ OpenAI
                                    ↓
                          JSON Responses
                                    ↓
                            Backend Returns
                                    ↓
                        Frontend Updates State
                                    ↓
                    Components Re-render with Data
                                    ↓
                    Charts, Tables, Analysis Display
    
    3. APPLY STRATEGY
       User → [Apply Button] → Frontend
                                   ↓
                        [Smart Contract Call via Ethers.js]
                                   ↓
                        MetaMask Signs Transaction
                                   ↓
                        Transaction Sent to Sepolia
                                   ↓
                        PortfolioAdvisor.rebalance()
                                   ↓
                        Event: RebalanceExecuted
                                   ↓
                        Data Stored on Blockchain
                                   ↓
                        Frontend Shows Success
                                   ↓
                        Dashboard Refreshes

"""

# Component Interaction Matrix
# =============================

COMPONENT_MATRIX = """

    FRONTEND COMPONENTS INTERACTION:

    ┌─────────────────────────────────────────────────────────────┐
    │  Page: dashboard/page.tsx                                   │
    ├─────────────────────────────────────────────────────────────┤
    │  Hooks:                                                      │
    │  ├─ useWallet() → Gets wallet address & connection state   │
    │  ├─ useState() → Portfolio, analysis, rebalancing data      │
    │  └─ useEffect() → Load data on mount                        │
    │                                                              │
    │  Uses Components:                                            │
    │  ├─ <WalletButton /> → Connect/Disconnect wallet            │
    │  ├─ <PortfolioOverview /> → Shows assets table              │
    │  ├─ <PortfolioChart /> → Displays pie chart                 │
    │  ├─ <RiskAnalysis /> → Shows risk metrics                   │
    │  ├─ <RebalancePanel /> → Rebalancing suggestions            │
    │  ├─ <AlertBox /> → Error/Success messages                   │
    │  ├─ <StatCard /> → Summary statistics                       │
    │  └─ <LoadingSkeleton /> → Loading states                    │
    │                                                              │
    │  Calls Services:                                             │
    │  ├─ apiService.analyzePortfolio() → Get risk analysis       │
    │  ├─ apiService.getRebalanceSuggestion() → Get suggestions   │
    │  ├─ apiService.savePortfolio() → Save to backend            │
    │  └─ contractService.rebalance() → Call smart contract       │
    │                                                              │
    │  Manages State:                                              │
    │  ├─ assets[] → Array of portfolio assets                    │
    │  ├─ totalValue → Total portfolio value                      │
    │  ├─ riskAnalysis → Risk metrics                             │
    │  ├─ rebalanceSuggestion → Suggested allocation              │
    │  ├─ error → Error messages                                  │
    │  └─ successMessage → Success notifications                  │
    └─────────────────────────────────────────────────────────────┘

"""

# Technology Stack Diagram
# =========================

TECH_STACK = """

    ┌──────────────────────────────────────────────────────────────┐
    │                    TECHNOLOGY STACK                          │
    ├──────────────────────────────────────────────────────────────┤
    │                                                               │
    │  PRESENTATION LAYER                                          │
    │  ├─ React 18 (UI Components)                                │
    │  ├─ Next.js 13 (Framework)                                  │
    │  ├─ TypeScript (Type Safety)                                │
    │  ├─ Tailwind CSS (Styling)                                  │
    │  └─ Recharts (Visualizations)                               │
    │                                                               │
    │  BUSINESS LOGIC LAYER                                        │
    │  ├─ Custom Hooks (useWallet)                                │
    │  ├─ Service Classes (apiService)                            │
    │  ├─ State Management (useState, Context)                    │
    │  └─ Data Validation (Schema)                                │
    │                                                               │
    │  API LAYER                                                   │
    │  ├─ Express.js (REST Framework)                             │
    │  ├─ Axios (HTTP Client)                                     │
    │  ├─ CORS (Cross-Origin)                                     │
    │  └─ Error Handling (Middleware)                             │
    │                                                               │
    │  SERVICE LAYER                                               │
    │  ├─ CoinGecko API (Price Data)                              │
    │  ├─ OpenAI API (AI Analysis)                                │
    │  ├─ Portfolio Analyzer (Calculations)                       │
    │  └─ Price Service (Aggregation)                             │
    │                                                               │
    │  BLOCKCHAIN LAYER                                            │
    │  ├─ Solidity (Smart Contracts)                              │
    │  ├─ Ethers.js (Web3 Library)                                │
    │  ├─ MetaMask (Wallet)                                       │
    │  └─ Hardhat (Development)                                   │
    │                                                               │
    │  INFRASTRUCTURE                                              │
    │  ├─ Node.js (Runtime)                                       │
    │  ├─ npm (Package Manager)                                   │
    │  ├─ Sepolia Testnet (Network)                               │
    │  └─ Environment Variables (Config)                          │
    │                                                               │
    └──────────────────────────────────────────────────────────────┘

"""

# Database Schema (Future)
# =======================

DATABASE_SCHEMA = """

    FUTURE DATABASE STRUCTURE (MongoDB/PostgreSQL):

    Users Collection
    ├─ _id: ObjectId
    ├─ walletAddress: String (Unique)
    ├─ riskProfile: String (Low/Medium/High)
    ├─ createdAt: Date
    └─ updatedAt: Date

    Portfolios Collection
    ├─ _id: ObjectId
    ├─ userId: ObjectId → Users._id
    ├─ assets: Array
    │  └─ {symbol: String, amount: Number, percentage: Number}
    ├─ totalValue: Number
    ├─ timestamp: Date
    └─ version: Number

    Analyses Collection
    ├─ _id: ObjectId
    ├─ userId: ObjectId → Users._id
    ├─ portfolioId: ObjectId → Portfolios._id
    ├─ riskLevel: String
    ├─ diversificationScore: Number
    ├─ improvements: Array
    ├─ timestamp: Date
    └─ aiModel: String

    Rebalances Collection
    ├─ _id: ObjectId
    ├─ userId: ObjectId → Users._id
    ├─ txHash: String (Blockchain transaction)
    ├─ oldAllocation: Object
    ├─ newAllocation: Object
    ├─ status: String (Pending/Completed/Failed)
    ├─ gasUsed: Number
    └─ timestamp: Date

"""

if __name__ == "__main__":
    print(SYSTEM_ARCHITECTURE)
    print("\n" + "="*70 + "\n")
    print(DATA_FLOW)
    print("\n" + "="*70 + "\n")
    print(COMPONENT_MATRIX)
    print("\n" + "="*70 + "\n")
    print(TECH_STACK)
    print("\n" + "="*70 + "\n")
    print(DATABASE_SCHEMA)
