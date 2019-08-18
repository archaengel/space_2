import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Future from 'fluture'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import { create, env } from 'sanctuary'

const S = create({ checkTypes: true, env: env.concat(flutureEnv) })

import auth from '../../middleware/auth'

import User from '../../models/Users'

// compare :: String -> String -> Future Error Boolean
export const compare = Future.encaseP2 (bcrypt.compare)

// @route  POST /api/auth
// @desc   Authorize user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body

  // Simple validation
  if (!email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' })

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' })

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })
    })
})

// @route  GET /api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(returnedUser => res.json(returnedUser))
})

export default router
