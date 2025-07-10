import test from 'japa'
import TransactionService from 'App/Services/TransactionService'
import Transaction from 'App/Models/Transaction'

test.group('TransactionService', (group) => {
  let transactionService: TransactionService

  group.before(() => {
    transactionService = new TransactionService()
  })

  test('should get transaction by id', async (assert) => {
    const transactionMock = { id: 1, amount: 100 }

    Transaction.findOrFail = async (id: number) => {
      assert.equal(id, 1)
      return transactionMock as any
    }

    const transaction = await transactionService.getById(1)
    assert.deepEqual(transaction, transactionMock)
  })

  test('should throw error if transaction not found', async (assert) => {
    Transaction.findOrFail = async () => {
      throw new Error('Not found')
    }

    try {
      await transactionService.getById(999)
      assert.fail('Expected error was not thrown')
    } catch (error) {
      assert.equal(error.message, 'Not found')
    }
  })

  test('should list all transactions', async (assert) => {
    const transactionsMock = [{ id: 1 }, { id: 2 }]

    Transaction.all = async () => transactionsMock as any

    const transactions = await transactionService.listAll()
    assert.deepEqual(transactions, transactionsMock)
  })
})
