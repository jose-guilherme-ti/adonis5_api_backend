import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index() {
    return await Product.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'amount'])
    return await Product.create(data)
  }
}
