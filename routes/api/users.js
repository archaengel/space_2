// Import dependencies
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import Future from 'fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'   // Type defs for Fluture
import { create, env } from 'sanctuary'

const router = express.Router()                             // Initialize router
const S = create({                                          // Initialize type environment
  checkTypes: true,
  env: env.concat(flutureEnv)
})

import User from '../../models/Users'

// toMaybe :: a -> Maybe a
export const toMaybe = (x) => x === null || x === undefined ? S.Nothing : S.Just (x)

// eitherToFuture :: Either e r -> Future e r
export const eitherToFuture = S.either (Future.reject) (Future.of)

// getModel :: String -> {} -> Future Error (Maybe {})
export const getModel = (model) => (params) => Future ((rej, res) => {
  model
    .findOne({ ...params })
    .then (S.compose (res) (toMaybe))
    .catch(rej)
})

// getUser :: {} -> Future Error (Maybe {})
export const getUser = getModel (User)

// eitherNewUser :: {} -> Maybe {} -> Either String {}
const eitherNewUser = (user) => S.maybe
  (S.Right ({...user}))
  (_ => S.Left ({
    status: 400,
    message: 'User already exists'
  }))

// checkUnique :: {} -> String -> Future Error {}
export const checkUnique = (user) => S.compose 
  (S.chain (S.compose (eitherToFuture) (eitherNewUser (user))))
  (getUser)

// salt :: Number -> Future Error String
const salt = Future.encaseN (bcrypt.genSalt)

// hash :: String -> String -> Future Error String
const hash = Future.encaseN2 (bcrypt.hash)

// saltAndHash :: Number -> String -> Future Error String
export const saltAndHash = (n) => (pw) => salt (n) .chain (hash (pw))

// save :: {} -> Future Error {}
export const save = (user) => Future ((rej, res) => {
  user.save().then(res).catch(rej)
})

// signToken :: {} -> String -> {} | nil -> Future Error String
export const signToken = Future.encaseN3 (jwt.sign)

// @route POST /api/users
// @desc Register new users
// @access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' })
  }

  const eventualToken = checkUnique ({ password }) ({ email })
    .map (S.prop ('password'))
    .chain (saltAndHash (13))
    .map (pw => new User({ name, email, password: pw }))
    .chain (save)
    .chain (r => signToken ({ id: r.id }) (process.env.JWT_SECRET) ({ expiresIn: 3600 })
      .bimap (
        _ => ({ status: 400, message: 'Error signing token' }),
        token => ({ token, user: { name: r.name, email: r.email, password: r.password } }))
    )

  eventualToken
    .fork(
      e => res.status(e.status).json({ msg: e.message }),
      obj => res.json(obj)
    )
})

export default router
