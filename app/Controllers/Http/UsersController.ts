import Gateway from 'App/Models/Gateway'

export default class GatewaysController {
  public async index() {
    return await Gateway.all()
  }
}
