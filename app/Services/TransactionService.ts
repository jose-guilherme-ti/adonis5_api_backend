import Transaction from 'App/Models/Transaction'

export default class TransactionService {
  public async getById(id: number) {
    return Transaction.query().where('id', id).preload('products').firstOrFail()
  }

  public async listByClient(clientId: number) {
    return Transaction.query().where('client_id', clientId).preload('products')
  }
}
