import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface ApiClient {
  getPortfolioPrices: (tokens: string[]) => Promise<any>
  analyzePortfolio: (portfolio: any, riskProfile?: string) => Promise<any>
  getRebalanceSuggestion: (portfolio: any, targetRisk?: string) => Promise<any>
  getMarketSentiment: (tokens: string[]) => Promise<any>
  savePortfolio: (data: any) => Promise<any>
  getPortfolio: (address: string) => Promise<any>
}

class APIService implements ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Error interceptor
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  async getPortfolioPrices(tokens: string[]) {
    const response = await this.client.get('/prices/crypto', {
      params: { tokens: tokens.join(',') },
    })
    return response.data
  }

  async analyzePortfolio(portfolio: any, riskProfile = 'Medium') {
    const response = await this.client.post('/ai/analyze-portfolio', {
      portfolio,
      riskProfile,
    })
    return response.data
  }

  async getRebalanceSuggestion(portfolio: any, targetRisk = 'Medium') {
    const response = await this.client.post('/ai/rebalance-suggestion', {
      portfolio,
      targetRisk,
    })
    return response.data
  }

  async getMarketSentiment(tokens: string[]) {
    const response = await this.client.post('/ai/market-sentiment', {
      tokens,
    })
    return response.data
  }

  async savePortfolio(data: any) {
    const response = await this.client.post('/portfolio/save', data)
    return response.data
  }

  async getPortfolio(address: string) {
    const response = await this.client.get(`/portfolio/${address}`)
    return response.data
  }
}

export const apiService = new APIService()
