'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Settings, Eye, EyeOff } from 'lucide-react'

export function Navbar() {
  const [showBalance, setShowBalance] = React.useState(true)

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-64 right-0 h-20 bg-bg-main/95 backdrop-blur-md border-b border-accent-blue/10 px-8 flex items-center justify-between z-30"
    >
      {/* Left Side - Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
        <p className="text-sm text-text-muted">Welcome back to your portfolio</p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex items-center gap-4">
        {/* Wallet Status */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-bg-card rounded-lg border border-accent-blue/20 flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <div className="text-sm">
            <p className="text-text-muted text-xs">Connected</p>
            <p className="text-text-primary font-mono text-sm">0x12ab...9CdE</p>
          </div>
        </motion.div>

        {/* Toggle Balance Visibility */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 rounded-lg bg-bg-card border border-accent-blue/10 hover:border-accent-blue/30 transition-all text-text-muted hover:text-accent-blue"
        >
          {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-bg-card border border-accent-blue/10 hover:border-accent-blue/30 transition-all text-text-muted hover:text-accent-blue relative"
        >
          <Bell size={20} />
          <motion.div
            animate={{ scale: 1.2 }}
            className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"
          />
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-bg-card border border-accent-blue/10 hover:border-accent-blue/30 transition-all text-text-muted hover:text-accent-blue"
        >
          <Settings size={20} />
        </motion.button>
      </div>
    </motion.nav>
  )
}
