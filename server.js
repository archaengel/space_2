const express = require('express')
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

const options = {
  "useNewUrlParser": true,
  "dbName": 'socialUsers',
}

mongoose.connect(uri, options)

const db = mongoose.connect(uri, options)
  .then(() => console.log('db connected'))
  .catch(() => console.log(err.message))

const app = express()

app.get('/', (req, res) => res.send('<h1>Hello, World!</h1>'))

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on ${ process.env.PORT || 5000}...`)
})
