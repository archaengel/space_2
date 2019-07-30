const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PlanetSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model('planet', PlanetSchema)
