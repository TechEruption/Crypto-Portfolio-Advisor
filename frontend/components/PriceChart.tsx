'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PriceChartProps {
  data: Array<{
    time: string
    price: number
    symbol: string
  }>
  symbol: string
}

export function PriceChart({ data, symbol }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-dark-800 rounded-lg">
        <p className="text-gray-400">No price data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-80 bg-dark-800 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
            formatter={(value) => `$${value.toFixed(2)}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#667eea"
            strokeWidth={2}
            dot={false}
            name={`${symbol} Price`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
