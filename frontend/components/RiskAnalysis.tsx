'use client'

import React from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

interface RiskAnalysisProps {
  riskLevel: 'Low' | 'Medium' | 'High'
  diversificationScore: number
  concentrationRisk: string
  improvements: string[]
}

export function RiskAnalysis({
  riskLevel,
  diversificationScore,
  concentrationRisk,
  improvements,
}: RiskAnalysisProps) {
  const riskColors = {
    Low: 'text-green-400 bg-green-900',
    Medium: 'text-yellow-400 bg-yellow-900',
    High: 'text-red-400 bg-red-900',
  }

  const riskBgColors = {
    Low: 'bg-green-900/20 border-green-700',
    Medium: 'bg-yellow-900/20 border-yellow-700',
    High: 'bg-red-900/20 border-red-700',
  }

  return (
    <div className="space-y-4">
      {/* Risk Level */}
      <div className={`p-4 rounded-lg border ${riskBgColors[riskLevel]}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Risk Level</h3>
          <span className={`font-bold text-lg ${riskColors[riskLevel]}`}>{riskLevel}</span>
        </div>
        <p className="text-sm text-gray-400">{concentrationRisk}</p>
      </div>

      {/* Diversification Score */}
      <div className="p-4 rounded-lg bg-dark-800 border border-dark-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Diversification Score</h3>
          <span className="text-2xl font-bold text-blue-400">{diversificationScore}</span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${diversificationScore}%` }}
          />
        </div>
      </div>

      {/* Improvements */}
      <div className="p-4 rounded-lg bg-dark-800 border border-dark-700">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Suggested Improvements
        </h3>
        <ul className="space-y-2">
          {improvements.map((improvement, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{improvement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
