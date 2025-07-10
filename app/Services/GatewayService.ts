import Gateway from 'App/Models/Gateway'

export default class GatewayService {
  public async getActiveGateway() {
    return Gateway.query().where('is_active', true).orderBy('priority', 'asc').firstOrFail()
  }

  public async listAll() {
    return Gateway.all()
  }

  public async activateGateway(id: number) {
    await Gateway.query().update({ isActive: false })
    return Gateway.query().where('id', id).update({ isActive: true })
  }
}
