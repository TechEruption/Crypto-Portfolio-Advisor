'use client'

import React, { useState } from 'react'
import { Loader, Send, AlertCircle } from 'lucide-react'

interface RebalanceSuggestion {
  currentAllocation: Record<string, number>
  suggestedAllocation: Record<string, number>
  changes: Array<{
    token: string
    from: number
    to: number
    action: string
  }>
  reasoning: string
  expectedOutcome: string
  timeline: string
}

interface RebalancePanelProps {
  suggestion: RebalanceSuggestion | null
  loading: boolean
  error: string | null
  onApply: (suggestion: RebalanceSuggestion) => Promise<void>
  onRefresh: () => Promise<void>
}

export function RebalancePanel({
  suggestion,
  loading,
  error,
  onApply,
  onRefresh,
}: RebalancePanelProps) {
  const [applying, setApplying] = useState(false)

  const handleApply = async () => {
    if (!suggestion) return
    setApplying(true)
    try {
      await onApply(suggestion)
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="bg-dark-800 rounded-lg border border-dark-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Rebalancing Suggestion</h3>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition disabled:opacity-50"
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin inline mr-2" />
          ) : null}
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {loading && !suggestion ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-400">Analyzing portfolio...</span>
        </div>
      ) : suggestion ? (
        <div className="space-y-6">
          {/* Reasoning */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Reasoning</h4>
            <p className="text-sm text-gray-400">{suggestion.reasoning}</p>
          </div>

          {/* Changes */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Suggested Changes</h4>
            <div className="space-y-2">
              {suggestion.changes.map((change, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-dark-700/50 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{change.token}</p>
                    <p className="text-xs text-gray-400">
                      {change.from}% → {change.to}%
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      change.action === 'Increase'
                        ? 'bg-green-900/30 text-green-300'
                        : 'bg-red-900/30 text-red-300'
                    }`}
                  >
                    {change.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <p className="text-xs text-gray-400">Expected Outcome</p>
            <p className="text-sm text-blue-300">{suggestion.expectedOutcome}</p>
          </div>

          {/* Timeline */}
          <div className="p-3 bg-dark-700/50 rounded-lg">
            <p className="text-xs text-gray-400">Timeline</p>
            <p className="text-sm text-gray-300">{suggestion.timeline}</p>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={applying}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {applying ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Apply AI Strategy
              </>
            )}
          </button>
        </div>
      ) : null}
    </div>
  )
}
