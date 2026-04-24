'use client'

import React from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

interface AlertBoxProps {
  type: 'info' | 'success' | 'error' | 'warning'
  title: string
  message: string
  onDismiss?: () => void
}

export function AlertBox({ type, title, message, onDismiss }: AlertBoxProps) {
  const styles = {
    info: 'bg-blue-900/20 border-blue-700 text-blue-300',
    success: 'bg-green-900/20 border-green-700 text-green-300',
    error: 'bg-red-900/20 border-red-700 text-red-300',
    warning: 'bg-yellow-900/20 border-yellow-700 text-yellow-300',
  }

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  }

  return (
    <div className={`p-4 rounded-lg border flex items-start gap-3 ${styles[type]}`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition"
        >
          ✕
        </button>
      )}
    </div>
  )
}

interface LoadingSkeletonProps {
  count?: number
}

export function LoadingSkeleton({ count = 1 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-dark-700 rounded-lg h-20 animate-pulse" />
      ))}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down'
}

export function StatCard({ label, value, change, trend }: StatCardProps) {
  return (
    <div className="bg-dark-800 rounded-lg border border-dark-700 p-4">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold text-white">{value}</p>
        {change && (
          <span
            className={`text-sm font-semibold ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </div>
  )
}
