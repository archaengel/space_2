import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PlanetSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
})

const Planet = mongoose.model ('planet', PlanetSchema)

export default Planet
