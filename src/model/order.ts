import { OrderStatus } from './orderStatus'

export default interface IOrder {
  userId: string
  quantity: number
  shipDate: Date
  status: OrderStatus
  complete: Boolean
}
