'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Shield, Sparkles, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bgMain text-textPrimary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-bgMain/95 backdrop-blur-md border-b border-accentBlue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-textPrimary">Portfolio Advisor</h1>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-gradient-accent text-white rounded-lg transition font-semibold hover:shadow-glow"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-textPrimary mb-6">
            Your AI-Powered Crypto <span className="bg-gradient-accent bg-clip-text text-transparent">Portfolio Advisor</span>
          </h2>
          <p className="text-xl text-textMuted mb-8 max-w-2xl mx-auto">
            Get intelligent insights, risk analysis, and rebalancing suggestions powered by advanced AI.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-accent text-white rounded-lg font-semibold transition hover:shadow-glow"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BarChart3, title: 'Analytics', desc: 'Real-time portfolio analysis' },
            { icon: Shield, title: 'Risk Assessment', desc: 'Comprehensive risk scoring' },
            { icon: Sparkles, title: 'AI Suggestions', desc: 'Smart rebalancing recommendations' },
            { icon: Zap, title: 'Blockchain', desc: 'Execute actions on-chain' },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="p-6 bg-bgCard rounded-2xl border border-accentBlue/10 hover:border-accentBlue/30 transition">
                <Icon className="w-8 h-8 text-accentBlue mb-4" />
                <h3 className="text-lg font-semibold text-textPrimary mb-2">{feature.title}</h3>
                <p className="text-sm text-textMuted">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-bgCard border-y border-accentBlue/10 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-textPrimary text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Connect Wallet', desc: 'Link your MetaMask' },
              { step: 2, title: 'Analyze', desc: 'AI analyzes portfolio' },
              { step: 3, title: 'Insights', desc: 'Get smart suggestions' },
              { step: 4, title: 'Execute', desc: 'Apply strategies' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-accent text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-textPrimary mb-2">{item.title}</h3>
                <p className="text-sm text-textMuted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-accentBlue/10 to-accentPurple/10 border border-accentBlue/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-textPrimary mb-4">Ready to optimize?</h2>
          <p className="text-textMuted mb-8">Start analyzing with AI-powered insights today.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-accent text-white rounded-lg font-semibold transition hover:shadow-glow"
          >
            Launch Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bgCard border-t border-accentBlue/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-textMuted">
          <p>© 2026 Crypto Portfolio Advisor. Built for Web3 investors.</p>
          <p className="mt-2 text-xs">⚠️ Demo Version - Mock Data Only</p>
        </div>
      </footer>
    </div>
  )
}
