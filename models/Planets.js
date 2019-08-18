const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PlanetSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Planet = mongoose.model('planet', PlanetSchema)

export default Planet
