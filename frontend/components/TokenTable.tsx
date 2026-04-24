'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function TokenTable({ assets }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-bg-card rounded-2xl border border-accent-blue/10"
    >
      <h3 className="text-lg font-bold text-text-primary mb-6">Holdings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent-blue/10">
              <th className="text-left py-3 px-4 text-text-muted text-sm font-semibold">Token</th>
              <th className="text-right py-3 px-4 text-text-muted text-sm font-semibold">Balance</th>
              <th className="text-right py-3 px-4 text-text-muted text-sm font-semibold">Price</th>
              <th className="text-right py-3 px-4 text-text-muted text-sm font-semibold">Value</th>
              <th className="text-right py-3 px-4 text-text-muted text-sm font-semibold">Change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset: any, idx: number) => (
              <motion.tr
                key={idx}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className="border-b border-accent-blue/5 hover:bg-accent-blue/5 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: asset.color }}
                    />
                    <div>
                      <p className="font-semibold text-text-primary">{asset.symbol}</p>
                      <p className="text-xs text-text-muted">{asset.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-text-primary">{asset.balance.toFixed(2)}</td>
                <td className="py-4 px-4 text-right text-text-primary">${asset.price.toLocaleString()}</td>
                <td className="py-4 px-4 text-right font-semibold text-text-primary">
                  ${asset.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {asset.change >= 0 ? (
                      <TrendingUp size={16} className="text-success" />
                    ) : (
                      <TrendingDown size={16} className="text-danger" />
                    )}
                    <span className={asset.change >= 0 ? 'text-success' : 'text-danger'}>
                      {asset.change > 0 ? '+' : ''}{asset.change}%
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
