import { Document, Model, model, Schema } from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { IUser } from '../model/user'

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  userStatus: Number,
  username: String,
})

UserSchema.plugin(uniqueValidator)

export const UserModel: Model<IUserModel> = model<IUserModel>(
  'User',
  UserSchema
)
