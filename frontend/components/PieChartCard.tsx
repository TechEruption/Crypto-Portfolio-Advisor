'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

export function PieChartCard({ assets }: any) {
  const chartData = assets.map((asset: any) => ({
    name: asset.symbol,
    value: parseFloat((asset.value).toFixed(2)),
    color: asset.color,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-bgCard rounded-2xl border border-accentBlue/10"
    >
      <h3 className="text-lg font-bold text-textPrimary mb-6">Portfolio Allocation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }: any) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #3B82F6',
              borderRadius: '8px',
              color: '#E5E7EB',
            }}
            formatter={(value: any) => [`${value}%`, 'Allocation']}
          />
          <Legend
            wrapperStyle={{ color: '#9CA3AF' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
