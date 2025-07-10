import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Gateway from './Gateway'
import TransactionProduct from './TransactionProduct'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public gatewayId: number

  @column()
  public externalId: string

  @column()
  public status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'

  @column()
  public amount: number

  @column()
  public cardLastNumbers: string

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Gateway)
  public gateway: BelongsTo<typeof Gateway>
  
  @hasMany(() => TransactionProduct)
  public products: HasMany<typeof TransactionProduct>
}