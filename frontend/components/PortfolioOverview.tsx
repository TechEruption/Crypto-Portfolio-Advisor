'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Coins, Zap } from 'lucide-react'

export function PortfolioOverview({ data }: any) {
  const stats = [
    {
      label: 'Total Value',
      value: `$${data.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      change: data.change24h,
      icon: Coins,
    },
    {
      label: '24h Change',
      value: `${data.change24h > 0 ? '+' : ''}${data.change24h}%`,
      color: data.change24h >= 0 ? 'success' : 'danger',
      icon: data.change24h >= 0 ? TrendingUp : TrendingDown,
    },
    {
      label: 'Total Assets',
      value: data.assets.length.toString(),
      icon: Coins,
    },
    {
      label: 'Portfolio Health',
      value: 'Good',
      icon: Zap,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        const colorClass =
          stat.color === 'success'
            ? 'text-success'
            : stat.color === 'danger'
              ? 'text-danger'
              : 'text-accent-blue'

        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 bg-gradient-to-br from-bg-card to-bg-main rounded-2xl border border-accent-blue/10 hover:border-accent-blue/30 transition-all overflow-hidden group"
          >
            {/* Gradient background glow */}
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 transition-opacity" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-muted text-sm font-medium">{stat.label}</h3>
                <Icon className={`${colorClass} opacity-60 group-hover:opacity-100 transition-opacity`} />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-2">{stat.value}</p>
              {stat.change !== undefined && (
                <p className={`text-sm font-semibold ${stat.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change).toFixed(2)}%
                </p>
              )}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
