// Import modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')

// Import routes
const usersRouter = require('./routes/api/users')
const planetsRouter = require('./routes/api/planets')
const authRouter = require('./routes/api/auth')
const postRouter = require('./routes/api/posts')

// Connect to db
const uri = process.env.MONGODB_URI

const dbOptions = {
  "useNewUrlParser": true,
  "useCreateIndex": true,
  "useFindAndModify": false
}

const db = mongoose.connect(uri, dbOptions)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err.message))


app.use(express.json())

app.get('/config.js', (req, res) => {
  res.send("const NASA_API_KEY='"+process.env.NASA_API_KEY+"'")
})

// Add api routers
app.use('/api/users', usersRouter)
app.use('/api/planets', planetsRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

app.use(express.static('client/dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

// Listen on port
app.listen(process.env.PORT || 5000, () => {
  console.log(`>>> Listening on ${ process.env.PORT || 5000}...`)
})
