const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const User = require('./models/Users')

const uri = process.env.MONGODB_URI

const options = {
  "useNewUrlParser": true,
  "dbName": 'socialUsers',
}

const db = mongoose.connect(uri, options)
  .then(() => console.log('db connected'))
  .catch(() => console.log(err.message))

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('<h1>Hello, World!</h1>'))

app.post('/api/user/new', (req, res) => {
  let newUser = new User({
    username: req.body.username || req.query.username
  })

  newUser.save((err, savedUser) => {
    if (err) {
      console.log(err)
    } else {
      console.log(savedUser)
      res.json(savedUser)
    }
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on ${ process.env.PORT || 5000}...`)
})
