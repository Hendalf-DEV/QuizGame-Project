import mongoose from 'mongoose'
const { Schema } = mongoose
import { v6 as uuidv6 } from 'uuid'

const userSchema = new Schema({
  _id: { type: String, default: uuidv6 },
  username: { type: String, required: true },
  email: {
    type: String,
    required: false,
    default: undefined
  },
  passwordHash: { type: String, required: true },
  score: { type: Number, default: 0 }
})

userSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } })
userSchema.index({ email: 1 }, { unique: true, sparse: true, collation: { locale: 'en', strength: 2 } })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)