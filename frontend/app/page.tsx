'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Zap, Shield, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Portfolio Advisor</h1>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your AI-Powered Crypto <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Portfolio Advisor</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Get intelligent insights, risk analysis, and rebalancing suggestions powered by advanced AI technology.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BarChart3,
              title: 'Portfolio Analytics',
              description: 'Real-time analysis of your crypto holdings',
            },
            {
              icon: Shield,
              title: 'Risk Assessment',
              description: 'Comprehensive risk and diversification scoring',
            },
            {
              icon: Sparkles,
              title: 'AI Suggestions',
              description: 'Smart rebalancing recommendations',
            },
            {
              icon: Zap,
              title: 'Smart Contracts',
              description: 'Execute actions with blockchain verification',
            },
          ].map((feature, idx) => {
            const IconComponent = feature.icon
            return (
              <div
                key={idx}
                className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:border-blue-600 transition"
              >
                <IconComponent className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-dark-800 border-y border-dark-700 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Connect Wallet', description: 'Link your MetaMask wallet' },
              { step: 2, title: 'Analyze', description: 'AI analyzes your portfolio' },
              { step: 3, title: 'Get Insights', description: 'Receive smart suggestions' },
              { step: 4, title: 'Execute', description: 'Apply strategies on blockchain' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 -right-4 text-blue-600">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to optimize your portfolio?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Start analyzing your crypto holdings with AI-powered insights today.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-400">
          <p>© 2026 Crypto Portfolio Advisor. Built for Web3 investors.</p>
          <p className="mt-2 text-xs">⚠️ MVP Version - For Testing Only - Do Not Use Real Funds</p>
        </div>
      </footer>
    </div>
  )
}
