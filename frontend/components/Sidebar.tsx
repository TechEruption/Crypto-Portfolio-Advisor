'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { BarChart3, Wallet, Zap, Activity, LogOut } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/portfolio', label: 'Portfolio', icon: Wallet },
    { href: '/insights', label: 'AI Insights', icon: Zap },
    { href: '/activity', label: 'Activity', icon: Activity },
  ]

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-bgMain border-r border-accentBlue/10 p-6 flex flex-col z-40"
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">◆</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-textPrimary">Portfolio</h1>
            <p className="text-xs text-textMuted">Advisor</p>
          </div>
        </Link>
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link key={idx} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`p-3 rounded-lg flex items-center gap-3 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-accent text-white'
                    : 'text-textMuted hover:bg-bgCard hover:text-textPrimary'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full" />}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full p-3 rounded-lg bg-bgCard border border-danger/20 text-danger hover:border-danger/50 transition-all flex items-center gap-2"
      >
        <LogOut size={18} />
        <span className="font-medium">Disconnect</span>
      </motion.button>
    </motion.aside>
  )
}
