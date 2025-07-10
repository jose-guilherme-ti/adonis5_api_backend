import test from 'japa'
import RefundService from 'App/Services/RefundService'
import Transaction from 'App/Models/Transaction'

test.group('RefundService', (group) => {
  let refundService: RefundService

  group.before(() => {
    refundService = new RefundService()
  })

  test('should process refund for a completed transaction', async (assert) => {
    const transactionMock = {
      id: 1,
      status: 'COMPLETED',
      save: async () => {},
    }

    Transaction.findOrFail = async (id: number) => {
      assert.equal(id, 1)
      return transactionMock as any
    }

    const refundedTransaction = await refundService.processRefund(1)

    assert.equal(refundedTransaction.status, 'REFUNDED')
  })

  test('should throw error if transaction not completed', async (assert) => {
    const transactionMock = {
      id: 2,
      status: 'PENDING',
      save: async () => {},
    }

    Transaction.findOrFail = async (id: number) => {
      assert.equal(id, 2)
      return transactionMock as any
    }

    try {
      await refundService.processRefund(2)
      assert.fail('Expected error was not thrown')
    } catch (error) {
      assert.equal(error.message, 'Only completed transactions can be refunded')
    }
  })

  test('should throw error if transaction not found', async (assert) => {
    Transaction.findOrFail = async () => {
      throw new Error('Not found')
    }

    try {
      await refundService.processRefund(999)
      assert.fail('Expected error was not thrown')
    } catch (error) {
      assert.equal(error.message, 'Not found')
    }
  })
})
