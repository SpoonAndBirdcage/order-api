import { Document, Model, model, Schema } from 'mongoose'
import IOrder from '../model/order'
import { OrderStatus } from '../model/orderStatus'

export interface IOrderModel extends IOrder, Document {}

export const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  quantity: Number,
  shipDate: Date,
  status: { type: String, enum: ['PLACED', 'APPROVED', 'DELIVERED'] },
  complete: Boolean,
})

export const OrderModel: Model<IOrderModel> = model<IOrderModel>(
  'Order',
  OrderSchema
)
