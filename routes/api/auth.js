const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')

const User = require('../../models/Users')

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
// @access Public
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(returnedUser => res.json(returnedUser))
})

module.exports = router
