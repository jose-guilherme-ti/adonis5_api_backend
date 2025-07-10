import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientsController {
  public async index() {
    return await Client.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email'])
    return await Client.create(data)
  }
}
