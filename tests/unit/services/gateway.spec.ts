import test from 'japa'
import GatewayService from 'App/Services/GatewayService'
import Gateway from 'App/Models/Gateway'

test.group('GatewayService', (group) => {
  let gatewayService: GatewayService

  group.before(() => {
    gatewayService = new GatewayService()
  })

  test('should get active gateways ordered by priority', async (assert) => {
    const gatewaysMock = [
      { id: 1, priority: 1, is_active: true },
      { id: 2, priority: 2, is_active: true },
    ]

    Gateway.query = () => ({
      where: () => ({
        orderBy: () => ({
          fetch: async () => gatewaysMock,
        }),
      }),
    }) as any

    const gateways = await gatewayService.getActiveGateways()
    assert.deepEqual(gateways, gatewaysMock)
  })

  test('should get gateway by id', async (assert) => {
    const gatewayMock = { id: 1, name: 'Gateway 1' }

    Gateway.findOrFail = async (id: number) => {
      assert.equal(id, 1)
      return gatewayMock as any
    }

    const gateway = await gatewayService.getGatewayById(1)
    assert.deepEqual(gateway, gatewayMock)
  })
})
