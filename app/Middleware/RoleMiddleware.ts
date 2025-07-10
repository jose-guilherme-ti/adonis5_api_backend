import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleMiddleware {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string[]
  ) {
    await auth.use('api').authenticate()

    const user = auth.user!

    if (!user || !allowedRoles.includes(user.role)) {
      return response.forbidden({ message: 'Acesso negado' })
    }

    await next()
  }
}
