#!/bin/bash
# Deployment script for Crypto Portfolio Advisor

set -e

echo "╔════════════════════════════════════════╗"
echo "║  Crypto Portfolio Advisor - Setup      ║"
echo "╚════════════════════════════════════════╝"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Check environment
echo ""
echo "🔍 Checking environment setup..."

if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo "📝 Please edit .env.local with your configuration"
else
    echo "✅ .env.local exists"
fi

# Compile contracts
echo ""
echo "⚙️  Compiling smart contracts..."
npx hardhat compile

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  Setup Complete! ✅                    ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run: npx hardhat run scripts/deploy.js --network sepolia"
echo "3. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local"
echo "4. Terminal 1: cd backend && npm run dev"
echo "5. Terminal 2: cd frontend && npm run dev"
echo "6. Open http://localhost:3000"
echo ""
