'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { TokenTable } from '@/components/TokenTable'
import { PieChartCard } from '@/components/PieChartCard'
import { LineChartCard } from '@/components/LineChartCard'
import { PrimaryButton, Toast } from '@/components/UIComponents'
import { mockPortfolio, mockPriceHistory, mockAIInsights, mockRebalanceSuggestion } from '@/lib/mockData'
import { AlertBox, Badge } from '@/components/UIComponents'
import { TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleRebalance = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-bgMain text-textPrimary">
      <Sidebar />
      <Navbar />

      <main className="ml-64 mt-20 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-textPrimary mb-2">Portfolio Dashboard</h1>
            <p className="text-textMuted">Track your assets and get AI-powered insights</p>
          </div>

          {/* Overview Cards */}
          <PortfolioOverview data={mockPortfolio} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Holdings */}
            <div className="lg:col-span-2">
              <TokenTable assets={mockPortfolio.assets} />
            </div>

            {/* AI Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-bgCard rounded-2xl border-2 border-accentBlue/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤖</span>
                <h3 className="text-lg font-bold text-textPrimary">AI Insights</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-textMuted text-sm mb-2">Risk Level</p>
                  <Badge color={mockAIInsights.risk === 'High' ? 'danger' : mockAIInsights.risk === 'Medium' ? 'warning' : 'success'}>
                    {mockAIInsights.risk}
                  </Badge>
                </div>

                <div>
                  <p className="text-textMuted text-sm mb-2">Diversification</p>
                  <div className="w-full bg-bgMain rounded-full h-2">
                    <div className="h-full rounded-full bg-gradient-accent" style={{ width: `${mockAIInsights.diversification}%` }} />
                  </div>
                  <p className="text-sm text-textPrimary mt-1">{mockAIInsights.diversification}%</p>
                </div>

                <AlertBox type="warning" title="Alert" message={mockAIInsights.concentration} />
              </div>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PieChartCard assets={mockPortfolio.assets} />
            <LineChartCard data={mockPriceHistory} />
          </div>

          {/* Rebalance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-bgCard rounded-2xl border border-accentBlue/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-accentBlue" size={28} />
              <h3 className="text-2xl font-bold text-textPrimary">Rebalance Strategy</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {mockRebalanceSuggestion.suggested.map((item: any, idx: number) => (
                <motion.div key={idx} whileHover={{ y: -5 }} className="p-4 bg-bgMain rounded-lg border border-accentBlue/10">
                  <p className="text-textMuted text-sm mb-2">{item.symbol}</p>
                  <p className="text-2xl font-bold text-textPrimary">{item.percentage}%</p>
                  <p className={`text-sm font-semibold ${item.change > 0 ? 'text-success' : 'text-warning'}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                  </p>
                </motion.div>
              ))}
            </div>

            <PrimaryButton onClick={handleRebalance} loading={loading}>
              {loading ? 'Applying...' : 'Apply AI Strategy'}
            </PrimaryButton>
          </motion.div>

          <p className="text-center text-textMuted text-sm">Demo with mock data • No real transactions</p>
        </motion.div>
      </main>

      {showToast && <Toast message="✅ Strategy applied successfully!" type="success" onClose={() => setShowToast(false)} />}
    </div>
  )
}
