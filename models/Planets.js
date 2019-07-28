const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PlanetSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = Planet = mongoose.model('planet', PlanetSchema)
