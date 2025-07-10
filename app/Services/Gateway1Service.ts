import axios from 'axios'

export default class Gateway1Service {
  private baseUrl = 'http://localhost:3001'
  private token: string | null = null

  public async login(email: string, token: string) {
    const response = await axios.post(`${this.baseUrl}/login`, { email, token })
    this.token = response.data.token
    return this.token
  }

  private get authHeaders() {
    if (!this.token) throw new Error('Not authenticated with Gateway1')
    return { Authorization: `Bearer ${this.token}` }
  }

  public async listTransactions() {
    const response = await axios.get(`${this.baseUrl}/transactions`, {
      headers: this.authHeaders,
    })
    return response.data
  }

  public async createTransaction(data: {
    amount: number
    name: string
    email: string
    cardNumber: string
    cvv: string
  }) {
    const response = await axios.post(`${this.baseUrl}/transactions`, data, {
      headers: this.authHeaders,
    })
    return response.data
  }

  public async chargeBack(id: string) {
    const response = await axios.post(
      `${this.baseUrl}/transactions/${id}/charge_back`,
      null,
      { headers: this.authHeaders }
    )
    return response.data
  }
}
