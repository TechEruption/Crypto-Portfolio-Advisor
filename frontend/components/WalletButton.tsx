'use client'

import React, { useState } from 'react'
import { Wallet, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

interface WalletButtonProps {
  onConnect?: () => void
}

export function WalletButton({ onConnect }: WalletButtonProps) {
  const { address, connected, loading, error, connectWallet, disconnectWallet } = useWallet()
  const [showMenu, setShowMenu] = useState(false)

  const handleConnect = async () => {
    await connectWallet()
    onConnect?.()
  }

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  if (loading) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
        <Loader className="w-4 h-4 animate-spin" />
        <span>Connecting...</span>
      </button>
    )
  }

  if (connected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{shortAddress}</span>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-lg overflow-hidden z-10">
            <div className="px-4 py-3 border-b border-dark-700">
              <p className="text-sm text-gray-400">Connected Wallet</p>
              <p className="text-sm font-mono">{address}</p>
            </div>
            <button
              onClick={() => {
                disconnectWallet()
                setShowMenu(false)
              }}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-dark-700 transition"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Wallet className="w-4 h-4" />
        <span>Connect Wallet</span>
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-900 border border-red-700 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  )
}
