// Import modules
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path from 'path'
import Future from 'fluture'
import { create, env } from 'sanctuary'
import { env as flutureEnv } from 'fluture-sanctuary-types'

const S = create({ checkTypes: true, env: env.concat(flutureEnv) })

// Import routes
import usersRouter, { toMaybe, eitherToFuture } from './routes/api/users'
import planetsRouter from './routes/api/planets'
import authRouter from './routes/api/auth'
import postRouter from './routes/api/posts'

const port = process.env.PORT || 5000

const isMain = (main) => S.isJust (toMaybe (main)) 

// initialize server
const app = express()

// Connect to db
export const uri = process.env.MONGODB_URI

export const dbOptions = {
  "useNewUrlParser": true,
  "useCreateIndex": true,
  "useFindAndModify": false
}

const eventualConnection = Future.encaseN2 (mongoose.connect)

const startDBIfCommandline = (uri) =>
  (options) =>
  (main) => S.compose (eitherToFuture) (S.maybeToEither ('Testing')) (toMaybe (main))
    .chain (_ => eventualConnection (uri) (options))

startDBIfCommandline (uri) (dbOptions) (process.mainModule)
  .fork(
    console.error,
    _ => console.log('>>> 🛢  DB connected...')
  )

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
const startServerIfCommandline = (main) =>
  (app) =>
  (port) => isMain (main) ?
    S.Just (app.listen(port, () => console.log (`>>> 📡 Listening on ${port}...`))) :
    S.Nothing

startServerIfCommandline (process.mainModule) (app) (port)

