import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

   public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.integer('gateway_id').unsigned().references('id').inTable('gateways').onDelete('CASCADE')
      table.string('external_id', 255).notNullable()
      table.enum('status', ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED']).defaultTo('PENDING')
      table.integer('amount').unsigned().notNullable()
      table.string('card_last_numbers', 4).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
