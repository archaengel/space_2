import express from 'express'
const router = express.Router ()
import bcrypt from 'bcryptjs'
import * as Future from 'fluture'
import {env as flutureEnv} from 'fluture-sanctuary-types'
import {create, env} from 'sanctuary'
import {
  getUser,
  genToken,
  maybeToFuture,
  toMaybe,
} from '../../utils/helpers'

const S = create ({checkTypes: true, env: env.concat (flutureEnv)})

import auth from '../../middleware/auth'
import User from '../../models/Users'

// compare :: String -> String -> Future Error Boolean
export const compare = Future.encaseP2 (bcrypt.compare)

// validateUser :: String -> {} -> Future Error {}
export const validateUser = unhashed => user => S.compose
  (S.compose
    (S.chain (x => x ? Future.of (user) :
       /* otherwise */ Future.reject ({
         status: 400,
         message: 'Invalid credentials',
       })))
    (compare (unhashed)))
  (S.prop ('password')) (user)

// getUserById :: String -> Future (Maybe {})
const getUserById = id => Future.Future ((rej, res) => {
  User
    .findById ({id})
    .select ('-password')
    .then (toMaybe (res))
    .catch (rej)
})

// @route  POST /api/auth
// @desc   Authorize user
// @access Public
router.post ('/', (req, res) => {
  const {email, password} = req.body

  // Simple validation
  if (!email || !password) {
    res.status (400).json ({msg: 'Please enter all fields'})
  }

  const eventualResponse = getUser ({email})
    .chain (maybeToFuture ({status: 400, message: 'User does not exist'}))
    .chain (validateUser (password))
    .chain (r => genToken (S.prop ('id') (r))
      .bimap (
        _ => ({status: 400, message: 'Error signing token'}),
        token => ({token, user: {id: r._id, name: r.name, email: r.email}})))

  eventualResponse
    .fork (
      e => res.status (e.status).json ({msg: e.message}),
      obj => res.json (obj)
    )
})

// @route  GET /api/auth/user
// @desc   Get user data
// @access Private
router.get ('/user', auth, (req, res) => {
  const eventualResponse = getUserById (req.user.id)
    .chain (maybeToFuture ({status: 400, message: 'User not found'}))

  eventualResponse
    .fork (
      e => res.status (e.status).json ({msg: e.message}),
      obj => res.json (obj)
    )
})

export default router
