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
      className="fixed top-0 left-64 right-0 h-20 bg-bgMain/95 backdrop-blur-md border-b border-accentBlue/10 px-8 flex items-center justify-between z-30"
    >
      {/* Left Side - Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-textPrimary">Dashboard</h2>
        <p className="text-sm text-textMuted">Welcome back to your portfolio</p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex items-center gap-4">
        {/* Wallet Status */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-bgCard rounded-lg border border-accentBlue/20 flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <div className="text-sm">
            <p className="text-textMuted text-xs">Connected</p>
            <p className="text-textPrimary font-mono text-sm">0x12ab...9CdE</p>
          </div>
        </motion.div>

        {/* Toggle Balance Visibility */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 rounded-lg bg-bgCard border border-accentBlue/10 hover:border-accentBlue/30 transition-all text-textMuted hover:text-accentBlue"
        >
          {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-bgCard border border-accentBlue/10 hover:border-accentBlue/30 transition-all text-textMuted hover:text-accentBlue relative"
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
          className="p-2 rounded-lg bg-bgCard border border-accentBlue/10 hover:border-accentBlue/30 transition-all text-textMuted hover:text-accentBlue"
        >
          <Settings size={20} />
        </motion.button>
      </div>
    </motion.nav>
  )
}
