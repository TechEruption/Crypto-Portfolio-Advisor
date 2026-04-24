'use client'

import { ethers } from 'ethers'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

const CONTRACT_ABI = [
  'function storePortfolio(address user, string memory portfolioData, uint256 totalValue) external',
  'function setRiskProfile(address user, string memory riskLevel) external',
  'function rebalance(address user, string memory actionData, string memory aiSuggestion) external',
  'function getUserPortfolio(address user) external view returns (tuple(string portfolioData, string riskProfile, uint256 timestamp, uint256 totalValue))',
  'function getRiskProfile(address user) external view returns (string)',
  'function getRebalanceHistory(address user) external view returns (tuple(address user, string actionData, string aiSuggestion, uint256 timestamp, bool executed)[])',
  'function portfolioExists(address user) external view returns (bool)',
]

interface PortfolioAdvisor {
  storePortfolio: (address: string, data: string, value: string) => Promise<any>
  setRiskProfile: (address: string, level: string) => Promise<any>
  rebalance: (address: string, data: string, suggestion: string) => Promise<any>
  getUserPortfolio: (address: string) => Promise<any>
  getRiskProfile: (address: string) => Promise<any>
  getRebalanceHistory: (address: string) => Promise<any>
}

export function getContract(signer: ethers.Signer): PortfolioAdvisor {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Contract address not configured')
  }

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  )

  return {
    async storePortfolio(address: string, data: string, value: string) {
      return await contract.storePortfolio(address, data, value)
    },
    async setRiskProfile(address: string, level: string) {
      return await contract.setRiskProfile(address, level)
    },
    async rebalance(address: string, data: string, suggestion: string) {
      return await contract.rebalance(address, data, suggestion)
    },
    async getUserPortfolio(address: string) {
      return await contract.getUserPortfolio(address)
    },
    async getRiskProfile(address: string) {
      return await contract.getRiskProfile(address)
    },
    async getRebalanceHistory(address: string) {
      return await contract.getRebalanceHistory(address)
    },
  }
}
