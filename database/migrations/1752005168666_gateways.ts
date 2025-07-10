import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gateways extends BaseSchema {
  protected tableName = 'gateways'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.boolean('is_active').defaultTo(true)
      table.integer('priority').unsigned().defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
