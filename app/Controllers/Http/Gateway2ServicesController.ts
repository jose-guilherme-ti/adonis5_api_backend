import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gateway2Service from 'App/Services/Gateway2Service'

export default class Gateway2Controller {
  private service = new Gateway2Service()

  public async listTransactions({ response }: HttpContextContract) {
    try {
      const data = await this.service.listTransactions()
      return response.ok(data)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  public async createTransaction({ request, response }: HttpContextContract) {
    const payload = request.only(['valor', 'nome', 'email', 'numeroCartao', 'cvv'])
    try {
      const data = await this.service.createTransaction(payload)
      return response.created(data)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  public async refund({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    try {
      const data = await this.service.refund(id)
      return response.ok(data)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }
}
