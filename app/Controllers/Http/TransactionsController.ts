import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'

export default class TransactionsController {
  public async index() {
    return await Transaction.query().preload('client').preload('gateway')
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only([
      'client_id',
      'gateway_id',
      'external_id',
      'amount',
      'card_last_numbers'
    ])
    return await Transaction.create(data)
  }
}
