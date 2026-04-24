# Deployment Instructions

## 📋 Prerequisites

- Node.js 16+
- npm/yarn
- MetaMask wallet
- Alchemy account for RPC
- OpenAI API key (for AI features)

## 🔧 Step 1: Environment Setup

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local with your values:
```

**Required values:**

```env
# Blockchain (from https://www.alchemy.com/)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key

# API Keys
OPENAI_API_KEY=sk-your_key_here
ETHERSCAN_API_KEY=your_etherscan_key

# Frontend
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... (set after deployment)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📦 Step 2: Install Dependencies

```bash
# Root
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

## 🚀 Step 3: Deploy Smart Contract

```bash
# Compile
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

**Save the contract address from output!** Update it in `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## ▶️ Step 4: Start Services

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Server: `http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
App: `http://localhost:3000`

## 🌐 Access Application

1. Open `http://localhost:3000`
2. Click "Launch App" or "Connect Wallet"
3. MetaMask will prompt for connection
4. Ensure you're on **Sepolia Testnet**
5. View your portfolio and get AI suggestions

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can connect MetaMask wallet
- [ ] Portfolio data loads
- [ ] AI analysis works
- [ ] Can apply strategy
- [ ] No console errors

## 🐛 Common Issues

### MetaMask Not Connecting
```
Solution: Switch to Sepolia in MetaMask
Settings → Networks → Sepolia
```

### Contract Address Invalid
```
Solution: Redeploy contract and update .env.local
npx hardhat run scripts/deploy.js --network sepolia
```

### Backend Not Responding
```
Solution: Check port 5000 is available
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

### Frontend Build Error
```
Solution: Clear cache and reinstall
rm -rf frontend/node_modules frontend/.next
cd frontend && npm install && npm run dev
```

## 📊 Sample Portfolio for Testing

The app includes sample data:
- **ETH**: 5 units @ $2,000 (60%)
- **BTC**: 0.5 units @ $40,000 (20%)
- **SOL**: 100 units @ $100 (20%)

This totals $10,000 USD.

## 🧪 Testing AI Features

Send requests to backend:

```bash
# Get crypto prices
curl http://localhost:5000/api/prices/crypto

# Analyze portfolio
curl -X POST http://localhost:5000/api/ai/analyze-portfolio \
  -H "Content-Type: application/json" \
  -d '{"portfolio":{"ETH":60,"BTC":20,"SOL":20}}'

# Get rebalance suggestion
curl -X POST http://localhost:5000/api/ai/rebalance-suggestion \
  -H "Content-Type: application/json" \
  -d '{"portfolio":{"ETH":60,"BTC":20,"SOL":20},"targetRisk":"Medium"}'
```

## 📱 Mobile Testing

```bash
# Get local IP
ipconfig getifaddr en0  # macOS
hostname -I  # Linux
ipconfig | findstr "IPv4" # Windows

# Access from mobile on same network
http://YOUR_IP:3000
```

## 🔗 Useful Links

- **Alchemy Dashboard**: https://dashboard.alchemy.com
- **Sepolia Faucet**: https://sepoliafaucet.com
- **Etherscan Sepolia**: https://sepolia.etherscan.io
- **OpenAI API**: https://platform.openai.com/docs

## 🎯 Next Steps

1. **Customize AI prompts** in `backend/services/aiService.js`
2. **Add database** for portfolio history (MongoDB/PostgreSQL)
3. **Implement real wallet** token fetching
4. **Add more charts** (line, bar, area charts)
5. **Deploy frontend** to Vercel
6. **Deploy backend** to Render/Railway
7. **Deploy contract** to mainnet (after testing)

## ⚠️ Security Reminders

- Never commit `.env.local` to git
- Never share private keys
- Test thoroughly on testnet first
- Don't use real funds in MVP
- Add rate limiting before production
- Validate all user inputs
- Use HTTPS in production

## 📝 Notes

- This is an MVP for educational purposes
- Sepolia testnet is for testing only
- No real value - use only for learning
- Full auditing needed before mainnet
- Consider adding rate limiting, authentication, etc.

---

**Deployment complete! 🎉**

For support or issues, check the README.md or troubleshooting section.
