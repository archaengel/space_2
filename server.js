// Import modules
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import {node} from 'fluture'
import {create, env} from 'sanctuary'
import {env as flutureEnv} from 'fluture-sanctuary-types'
import {maybeToFuture, toMaybe} from './utils/helpers'
import forceSsl from './middleware/forceSsl'

const S = create ({checkTypes: true, env: env.concat (flutureEnv)})

// Import routes
import authRouter from './routes/api/auth'
import planetsRouter from './routes/api/planets'
import postRouter from './routes/api/posts'
import usersRouter from './routes/api/users'
import verifyRouter from './routes/api/verify'

const port = process.env.PORT || 5000
const nodeEnv = process.env.NODE_ENV || 'development'

const isMain = main => S.isJust (toMaybe (main))

// initialize server
const app = express ()

// Connect to db
export const uri = process.env.MONGODB_URI

export const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false,
}

const eventualConnection =  uri => options =>
  node (cb => mongoose.connect (uri, options, cb))

const startDBIfCommandline = uri => options => main =>
  maybeToFuture ('Testing') (toMaybe (main)).chain (_ =>
    eventualConnection (uri) (options)
  )

startDBIfCommandline (uri) (dbOptions) (process.mainModule).fork (
  console.error,
  _ => console.log ('>>> 🛢  DB connected...')
)

if (nodeEnv === 'production') {
  app.use (forceSsl)
}

app.use (express.json ())

app.get ('/config.js', (req, res) => {
  res.send ("const NASA_API_KEY='" + process.env.NASA_API_KEY + "'")
})

// Add api routers
app.use ('/api/users', usersRouter)
app.use ('/api/planets', planetsRouter)
app.use ('/api/auth', authRouter)
app.use ('/api/verify', verifyRouter)
app.use ('/api/posts', postRouter)

app.use (express.static ('client/dist'))

app.get ('*', (req, res) => {
  res.sendFile (path.resolve (__dirname, 'client', 'dist', 'index.html'))
})

// Listen on port
const startServerIfCommandline = main => app => port =>
  isMain (main)
    ? S.Just (
        app.listen (port, _ => console.log (`>>> 📡 Listening on ${port}...`))
      )
    : /* otherwise */ S.Nothing

startServerIfCommandline (process.mainModule) (app) (port)
