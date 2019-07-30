const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const User = require('./models/Users')
const Planet = require('./models/Planets')

const uri = process.env.MONGODB_URI

const options = {
  "useNewUrlParser": true
}

const db = mongoose.connect(uri, options)
  .then(() => console.log('db connected'))
  .catch(() => console.log(err.message))

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/config.js', (req, res) => {
  res.send("const NASA_API_KEY='"+process.env.NASA_API_KEY+"'")
})

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

app.get('/api/planets', (req, res) => {
  Planet.find().exec((err, planets) => {
    if (err) {
      res.end(err)
    }
    res.json(planets)
  })
})

app.post('/api/planets', (req, res) => {
  const newPlanet = new Planet({
    name: req.body.name
  })

  newPlanet.save().then(planet => res.json(planet))
})

app.delete('/api/planets/:id', (req, res) => {
  Planet
    .deleteOne({ _id: req.params.id })
    .then(res => res.json({success: true}))
    .catch(err => res.json({success: false}))
})

app.use(express.static('client/dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`>>> Listening on ${ process.env.PORT || 5000}...`)
})
