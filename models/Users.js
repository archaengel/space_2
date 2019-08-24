import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: String,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const User = mongoose.model ('user', UserSchema)

export default User
