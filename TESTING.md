# Testing Guide

## 🧪 Unit Testing Backend

```bash
cd backend

# Create test file
npm install --save-dev jest

# Run tests
npm test
```

## 🔗 Manual API Testing

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-23T...",
  "uptime": 123.456
}
```

### 2. Get Crypto Prices
```bash
curl "http://localhost:5000/api/prices/crypto?tokens=ethereum,bitcoin,solana"
```

### 3. Analyze Portfolio
```bash
curl -X POST http://localhost:5000/api/ai/analyze-portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "ETH": 60,
      "BTC": 20,
      "SOL": 20
    },
    "riskProfile": "Medium"
  }'
```

### 4. Get Rebalance Suggestion
```bash
curl -X POST http://localhost:5000/api/ai/rebalance-suggestion \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "ETH": 60,
      "BTC": 20,
      "SOL": 20
    },
    "targetRisk": "Low"
  }'
```

### 5. Calculate Portfolio Value
```bash
curl -X POST http://localhost:5000/api/prices/portfolio-value \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": [
      {"symbol": "ETH", "amount": 5, "price": 2000},
      {"symbol": "BTC", "amount": 0.5, "price": 40000},
      {"symbol": "SOL", "amount": 100, "price": 100}
    ]
  }'
```

## 🧬 Smart Contract Testing

### 1. Deploy Locally
```bash
npx hardhat node
```

### 2. Deploy to Local Network (in another terminal)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Test Contract Functions
```bash
npx hardhat console --network localhost
```

```javascript
> const PortfolioAdvisor = await ethers.getContractFactory("PortfolioAdvisor");
> const contract = await PortfolioAdvisor.attach("0x...");
> await contract.storePortfolio("0xUserAddress", '{"ETH":60,"BTC":20}', "10000");
> await contract.getRiskProfile("0xUserAddress");
```

## 🎯 Frontend Testing

### 1. Test Wallet Connection
- Open http://localhost:3000/dashboard
- Click "Connect Wallet"
- Approve MetaMask connection
- Should show wallet address

### 2. Test Portfolio Display
- After connecting, portfolio should show sample data
- Charts should render correctly
- All components should load without errors

### 3. Test Risk Analysis
- Risk level should display correctly
- Diversification score bar should animate
- Improvements list should show suggestions

### 4. Test Rebalance Panel
- "Refresh" button should fetch new suggestions
- "Apply AI Strategy" button should process
- Success message should appear

## 🔍 Browser DevTools Testing

### Check Console for Errors
```javascript
// Should see no red errors
// Check for API call logs
console.log('API calls logged')
```

### Check Network Tab
- All API calls should be 200 OK
- Response times < 1 second
- No CORS errors

### Check Performance
- Page load < 2 seconds
- Charts render smooth
- No memory leaks

## 📊 Performance Testing

### Load Testing
```bash
# Install Apache Bench
ab -n 100 -c 10 http://localhost:5000/api/health
```

### Response Time Check
```bash
time curl http://localhost:5000/api/health
```

## 🐛 Debugging

### Backend Debugging
```javascript
// Add debug logs
console.log('Portfolio:', portfolio);
console.log('Analysis:', analysis);

// Run with debug flag
DEBUG=* npm run dev
```

### Frontend Debugging
```javascript
// React DevTools
// Check component state
// Verify hook calls

// Browser console
localStorage.clear() // Clear cache
window.location.reload() // Hard refresh
```

### Contract Debugging
```bash
# Verbose logging
npx hardhat run scripts/deploy.js --network localhost --verbose

# Gas estimation
npx hardhat run scripts/deploy.js --network localhost --estimate-gas
```

## ✅ Test Scenarios

### Scenario 1: Happy Path
1. Connect wallet ✅
2. View portfolio ✅
3. Get AI analysis ✅
4. Apply strategy ✅
5. See success message ✅

### Scenario 2: Error Handling
1. Disconnect wallet ✅
2. Try to access dashboard ✅
3. See "Connect Wallet" message ✅

### Scenario 3: Network Issues
1. Stop backend ✅
2. Try to fetch data ✅
3. See error message ✅
4. Restart backend ✅
5. Retry ✅

### Scenario 4: AI Integration
1. Valid portfolio ✅
2. Get analysis ✅
3. Response is JSON ✅
4. All fields present ✅

## 📈 Sample Test Data

### Portfolio 1: Concentrated
```json
{
  "ETH": 70,
  "BTC": 20,
  "SOL": 10
}
```
Expected: High risk, 45-50 diversification score

### Portfolio 2: Balanced
```json
{
  "ETH": 40,
  "BTC": 30,
  "SOL": 20,
  "LINK": 10
}
```
Expected: Medium risk, 70-75 diversification score

### Portfolio 3: Diversified with Stables
```json
{
  "ETH": 30,
  "BTC": 20,
  "SOL": 15,
  "USDC": 20,
  "LINK": 10,
  "AAVE": 5
}
```
Expected: Low risk, 85-90 diversification score

## 🎬 Visual Testing Checklist

- [ ] Home page loads correctly
- [ ] Dashboard displays after wallet connect
- [ ] Portfolio table shows all assets
- [ ] Pie chart renders properly
- [ ] Risk analysis displays
- [ ] Rebalance panel shows suggestions
- [ ] All buttons are clickable
- [ ] Loading states work
- [ ] Error messages display
- [ ] Success messages appear
- [ ] Responsive on mobile/tablet
- [ ] No console errors
- [ ] Dark theme looks good

## 🚀 Ready for Testing!

Your application is ready for thorough testing. Start with the happy path scenario, then test edge cases and error handling.

---

**Happy Testing! 🎉**
