'use client'

import React, { useState, useEffect } from 'react'
import { WalletButton } from '@/components/WalletButton'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { PortfolioChart } from '@/components/PortfolioChart'
import { RiskAnalysis } from '@/components/RiskAnalysis'
import { RebalancePanel } from '@/components/RebalancePanel'
import { AlertBox, StatCard, LoadingSkeleton } from '@/components/Common'
import { useWallet } from '@/hooks/useWallet'
import { apiService } from '@/lib/apiService'
import { TrendingUp, BarChart3, Zap } from 'lucide-react'

interface PortfolioAsset {
  symbol: string
  amount: number
  percentage: number
  price: number
  value: number
}

export default function DashboardPage() {
  const { address, connected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState<PortfolioAsset[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null)
  const [rebalanceSuggestion, setRebalanceSuggestion] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Sample portfolio data - in real app, this would come from wallet
  const samplePortfolio = [
    { symbol: 'ETH', amount: 5, price: 2000, percentage: 60 },
    { symbol: 'BTC', amount: 0.5, price: 40000, percentage: 20 },
    { symbol: 'SOL', amount: 100, price: 100, percentage: 20 },
  ]

  // Load data on mount
  useEffect(() => {
    if (connected && address) {
      loadPortfolioData()
    }
  }, [connected, address])

  const loadPortfolioData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Set sample data
      const calculated = samplePortfolio.map(asset => ({
        ...asset,
        value: asset.amount * asset.price,
      }))

      const total = calculated.reduce((sum, asset) => sum + asset.value, 0)

      setAssets(calculated)
      setTotalValue(total)

      // Analyze portfolio
      const portfolio = Object.fromEntries(
        calculated.map(a => [a.symbol, a.percentage])
      )

      const analysis = await apiService.analyzePortfolio(portfolio, 'Medium')
      setRiskAnalysis(analysis.analysis || analysis)

      // Get rebalance suggestion
      const suggestion = await apiService.getRebalanceSuggestion(portfolio, 'Medium')
      setRebalanceSuggestion(suggestion.suggestion || suggestion)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load portfolio data'
      setError(message)
      console.error('Error loading portfolio:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyStrategy = async (suggestion: any) => {
    try {
      setError(null)

      // Simulate contract interaction
      console.log('Applying strategy:', suggestion)

      // In real app, this would call the smart contract
      setSuccessMessage('Strategy applied successfully! Transaction logged on blockchain.')

      // Reload data
      setTimeout(() => {
        loadPortfolioData()
        setSuccessMessage(null)
      }, 3000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to apply strategy'
      setError(message)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Portfolio Advisor</h1>
              <p className="text-xs text-gray-400">AI-Powered Crypto Portfolio Management</p>
            </div>
          </div>
          <WalletButton onConnect={loadPortfolioData} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!connected ? (
          // Not Connected State
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-dark-800 rounded-lg mb-6">
              <TrendingUp className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Connect your MetaMask wallet to start analyzing your cryptocurrency portfolio and
              receive AI-powered rebalancing suggestions.
            </p>
            <WalletButton />
          </div>
        ) : (
          // Connected State
          <>
            {/* Alerts */}
            <div className="mb-6 space-y-3">
              {error && (
                <AlertBox
                  type="error"
                  title="Error"
                  message={error}
                  onDismiss={() => setError(null)}
                />
              )}
              {successMessage && (
                <AlertBox
                  type="success"
                  title="Success"
                  message={successMessage}
                  onDismiss={() => setSuccessMessage(null)}
                />
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Portfolio Value" value={`$${totalValue.toFixed(2)}`} />
              <StatCard
                label="Assets"
                value={assets.length}
                change={assets.length > 0 ? '+2' : '0'}
                trend="up"
              />
              <StatCard label="Network" value="Sepolia Testnet" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Overview & Chart */}
              <div className="lg:col-span-2 space-y-6">
                {loading ? (
                  <LoadingSkeleton count={2} />
                ) : (
                  <>
                    {/* Portfolio Overview */}
                    <PortfolioOverview
                      assets={assets}
                      totalValue={totalValue}
                      address={address || ''}
                    />

                    {/* Portfolio Distribution Chart */}
                    <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
                      <h3 className="text-lg font-semibold mb-4">Portfolio Distribution</h3>
                      <PortfolioChart
                        data={assets.map(a => ({
                          name: a.symbol,
                          value: a.percentage,
                        }))}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Risk Analysis */}
              <div>
                {loading ? (
                  <LoadingSkeleton />
                ) : riskAnalysis ? (
                  <div className="sticky top-20">
                    <RiskAnalysis
                      riskLevel={riskAnalysis.riskLevel || 'Medium'}
                      diversificationScore={riskAnalysis.diversificationScore || 50}
                      concentrationRisk={riskAnalysis.concentrationRisk || 'Analyzing...'}
                      improvements={riskAnalysis.improvements || []}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Rebalancing Suggestion */}
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <RebalancePanel
                suggestion={rebalanceSuggestion}
                loading={loading}
                error={error}
                onApply={handleApplyStrategy}
                onRefresh={loadPortfolioData}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">About</h4>
              <p className="text-sm text-gray-400">
                AI-Powered Crypto Portfolio Advisor for Web3 users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Features</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Portfolio Analysis</li>
                <li>Risk Assessment</li>
                <li>Rebalancing Suggestions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Network</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Sepolia Testnet</li>
                <li>MetaMask</li>
                <li>Ethereum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Disclaimer</h4>
              <p className="text-xs text-gray-500">
                This is an MVP. Do not use with real funds on mainnet. For testing only.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-700 text-center text-sm text-gray-400">
            <p>© 2026 Crypto Portfolio Advisor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
