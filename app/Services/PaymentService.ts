import Gateway from 'App/Models/Gateway'
import Transaction from 'App/Models/Transaction'
import TransactionProduct from 'App/Models/TransactionProduct'
import Product from 'App/Models/Product'
import { v4 as uuidv4 } from 'uuid'

type PaymentPayload = {
  clientId: number
  cardNumber: string
  products: Array<{ productId: number; quantity: number }>
}

export default class PaymentService {
  public async process(payload: PaymentPayload) {
    const gateway = await Gateway.query().where('is_active', true).orderBy('priority', 'asc').firstOrFail()

    const products = await Product.query().whereIn('id', payload.products.map(p => p.productId))
    const total = payload.products.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId)
      return acc + (product?.amount || 0) * item.quantity
    }, 0)

    const transaction = await Transaction.create({
      clientId: payload.clientId,
      gatewayId: gateway.id,
      amount: total,
      cardLastNumbers: payload.cardNumber.slice(-4),
      status: 'PENDING',
      externalId: uuidv4(),
    })

    for (const item of payload.products) {
      await TransactionProduct.create({
        transactionId: transaction.id,
        productId: item.productId,
        quantity: item.quantity,
      })
    }

    return transaction
  }
}
