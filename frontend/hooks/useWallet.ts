'use client'

import { useState, useCallback, useEffect } from 'react'
import { ethers } from 'ethers'

interface WalletState {
  address: string | null
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  connected: boolean
  loading: boolean
  error: string | null
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    provider: null,
    signer: null,
    connected: false,
    loading: false,
    error: null,
  })

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          })
          if (accounts.length > 0) {
            connectWallet()
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err)
        }
      }
    }
    
    checkConnection()
  }, [])

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setWallet(prev => ({
        ...prev,
        error: 'MetaMask not installed. Please install it to continue.',
      }))
      return
    }

    setWallet(prev => ({ ...prev, loading: true, error: null }))

    try {
      // Request accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      setWallet({
        address,
        provider,
        signer,
        connected: true,
        loading: false,
        error: null,
      })

      // Listen for account changes
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          disconnectWallet()
        } else {
          connectWallet()
        }
      })

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet'
      setWallet(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        connected: false,
      }))
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      provider: null,
      signer: null,
      connected: false,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
  }
}

// Type augmentation for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
