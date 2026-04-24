@echo off
REM Deployment script for Crypto Portfolio Advisor (Windows)

echo.
echo ╔════════════════════════════════════════╗
echo ║  Crypto Portfolio Advisor - Setup      ║
echo ╚════════════════════════════════════════╝
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Install root dependencies
echo.
echo 📦 Installing root dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 goto error

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 goto error
cd ..

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 goto error
cd ..

REM Check environment
echo.
echo 🔍 Checking environment setup...

if not exist .env.local (
    echo ⚠️  .env.local not found. Creating from template...
    copy .env.example .env.local
    echo ✅ Created .env.local
    echo 📝 Please edit .env.local with your configuration
) else (
    echo ✅ .env.local exists
)

REM Compile contracts
echo.
echo ⚙️  Compiling smart contracts...
call npx hardhat compile
if %ERRORLEVEL% NEQ 0 goto error

echo.
echo ╔════════════════════════════════════════╗
echo ║  Setup Complete! ✅                    ║
echo ╚════════════════════════════════════════╝
echo.
echo 📋 Next steps:
echo 1. Edit .env.local with your API keys
echo 2. Run: npx hardhat run scripts/deploy.js --network sepolia
echo 3. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
echo 4. Terminal 1: cd backend ^&^& npm run dev
echo 5. Terminal 2: cd frontend ^&^& npm run dev
echo 6. Open http://localhost:3000
echo.
pause
exit /b 0

:error
echo.
echo ❌ Setup failed!
pause
exit /b 1
