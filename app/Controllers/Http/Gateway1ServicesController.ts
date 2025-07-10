import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gateway1Service from 'App/Services/Gateway1Service'

export default class Gateway1Controller {
  private service = new Gateway1Service()

  public async login({ request, response }: HttpContextContract) {
    const { email, token } = request.only(['email', 'token'])
    try {
      const bearerToken = await this.service.login(email, token)
      return response.ok({ token: bearerToken })
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  public async listTransactions({ response }: HttpContextContract) {
    try {
      const data = await this.service.listTransactions()
      return response.ok(data)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  public async createTransaction({ request, response }: HttpContextContract) {
    const payload = request.only(['amount', 'name', 'email', 'cardNumber', 'cvv'])
    try {
      const data = await this.service.createTransaction(payload)
      return response.created(data)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  public async chargeBack({ params, response }: HttpContextContract) {
    try {
      const data = await this.service.chargeBack(params.id)
      return response.ok(data)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }
}
