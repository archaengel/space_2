import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TokenSchema = new Schema ({
  userId: {
    type: String,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    // 60s * 60m * 12hr
    expiresAfterSeconds: 60 * 60 * 12,
  },
})

const Token = mongoose.model ('token', TokenSchema)

export default Token
