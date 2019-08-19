// Import dependencies
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import Future from 'fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'   // Type defs for Fluture
import { create, env } from 'sanctuary'

import {
  checkUnique,
  eitherNewUser,
  eitherToFuture,
  genToken,
  getUser,
  saltAndHash,
  save,
  toMaybe
} from '../../utils/helpers'

const router = express.Router()                             // Initialize router
const S = create({                                          // Initialize type environment
  checkTypes: true,
  env: env.concat(flutureEnv)
})

import User from '../../models/Users'

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
    .chain (r => genToken (r)
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
