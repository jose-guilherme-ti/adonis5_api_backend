import Transaction from 'App/Models/Transaction'

export default class RefundService {
  public async simulateRefund(transactionId: number) {
    const transaction = await Transaction.findOrFail(transactionId)

    // Simulação fictícia
    return {
      transactionId: transaction.id,
      refundAmount: transaction.amount,
      status: 'SIMULATED',
    }
  }

  public async processRefund(transactionId: number) {
    const transaction = await Transaction.findOrFail(transactionId)

    transaction.status = 'REFUNDED'
    await transaction.save()

    return {
      transactionId: transaction.id,
      refunded: true,
    }
  }
}
