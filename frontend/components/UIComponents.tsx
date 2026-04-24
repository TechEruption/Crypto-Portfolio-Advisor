'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Primary Button
export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-3 bg-gradient-accent text-white rounded-lg font-semibold transition-all hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner size="sm" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}

// Secondary Button
export function SecondaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-3 bg-bgCard text-textPrimary rounded-lg font-semibold border border-accentBlue/20 transition-all hover:border-accentBlue/50 ${className}`}
    >
      {children}
    </motion.button>
  )
}

// Spinner Loader
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }
  return (
    <div className={`${sizes[size]} border-2 border-accentBlue/20 border-t-accentBlue rounded-full animate-spin`} />
  )
}

// Toast Notification
export function Toast({
  message,
  type = 'success',
  onClose,
}: {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColors = {
    success: 'bg-success/20 border-success',
    error: 'bg-danger/20 border-danger',
    info: 'bg-accentBlue/20 border-accentBlue',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg border ${bgColors[type]} text-textPrimary`}
    >
      {message}
    </motion.div>
  )
}

// Skeleton Loader
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-bgCard rounded-lg animate-pulse ${className}`} />
  )
}

// StatCard
export function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string
  value: string
  change?: { value: number; color: string }
  icon?: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-bgCard rounded-2xl border border-accentBlue/10 hover:border-accentBlue/30 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-textMuted text-sm font-medium">{label}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-textPrimary">{value}</p>
        {change && (
          <span className={`text-sm font-semibold ${change.color === 'success' ? 'text-success' : change.color === 'danger' ? 'text-danger' : 'text-warning'}`}>
            {change.value > 0 ? '+' : ''}{change.value}%
          </span>
        )}
      </div>
    </motion.div>
  )
}

// Alert Box
export function AlertBox({
  type = 'info',
  title,
  message,
}: {
  type?: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
}) {
  const bgColors = {
    info: 'bg-accentBlue/10 border-accentBlue text-accentBlue',
    success: 'bg-success/10 border-success text-success',
    warning: 'bg-warning/10 border-warning text-warning',
    error: 'bg-danger/10 border-danger text-danger',
  }

  return (
    <div className={`p-4 rounded-lg border ${bgColors[type]}`}>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-sm opacity-80">{message}</p>
    </div>
  )
}

// Badge
export function Badge({
  children,
  color = 'blue',
  size = 'md',
}: {
  children: React.ReactNode
  color?: 'blue' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}) {
  const colors = {
    blue: 'bg-accentBlue/20 text-accentBlue',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
  }
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }
  return (
    <span className={`${colors[color]} ${sizes[size]} rounded-full font-semibold inline-block`}>
      {children}
    </span>
  )
}
