const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model('user', UserSchema)
