
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gateway extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public isActive: boolean

  @column()
  public priority: number
}