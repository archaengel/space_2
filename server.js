const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')

const User = require('./models/Users')
const Planet = require('./models/Planets')

const uri = process.env.MONGODB_URI

const dbOptions = {
  "useNewUrlParser": true,
  "useCreateIndex": true
}

const db = mongoose.connect(uri, dbOptions)
  .then(() => console.log('db connected'))
  .catch(() => console.log(err.message))

const app = express()

app.use(express.json())

app.get('/config.js', (req, res) => {
  res.send("const NASA_API_KEY='"+process.env.NASA_API_KEY+"'")
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

// @route POST /api/users
// @desc Register new users
// @access Public
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' })

      const newUser = new User({
        name,
        email,
        password
      })

      // Create salt and hash
      bcrypt.genSalt(13, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(400).json({ msg: 'Error saving user' })

          newUser.password = hash
          newUser.save()
            .then(savedUser => {
              jwt.sign(
                { id: savedUser.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) return res.status(400).json({ msg: 'Error saving user' })

                  res.json({
                    token,
                    user: {
                      id: savedUser.id,
                      name: savedUser.name,
                      password: savedUser.password
                    }
                  })
                }
              )
            })
        })
      })
    })
})

app.use(express.static('client/dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`>>> Listening on ${ process.env.PORT || 5000}...`)
})
