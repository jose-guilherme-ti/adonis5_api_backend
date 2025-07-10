import axios from 'axios'

export default class Gateway2Service {
  private baseUrl = 'http://localhost:3002'
  private authToken = 'tk_f2198cc671b5289fa856'
  private authSecret = '3d15e8ed6131446ea7e3456728b1211f'

  private get authHeaders() {
    return {
      'Gateway-Auth-Token': this.authToken,
      'Gateway-Auth-Secret': this.authSecret,
    }
  }

  public async listTransactions() {
    const response = await axios.get(`${this.baseUrl}/transacoes`, {
      headers: this.authHeaders,
    })
    return response.data
  }

  public async createTransaction(data: {
    valor: number
    nome: string
    email: string
    numeroCartao: string
    cvv: string
  }) {
    const response = await axios.post(`${this.baseUrl}/transacoes`, data, {
      headers: this.authHeaders,
    })
    return response.data
  }

  public async refund(id: string) {
    const response = await axios.post(
      `${this.baseUrl}/transacoes/reembolso`,
      { id },
      { headers: this.authHeaders }
    )
    return response.data
  }
}
