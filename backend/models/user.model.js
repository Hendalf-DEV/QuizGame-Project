import mongoose from 'mongoose'
const { Schema } = mongoose
import { v6 as uuidv6 } from 'uuid'

const userSchema = new Schema({
  _id: { type: String, default: uuidv6 },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  score: { type: Number, default: 0 }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)