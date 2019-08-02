const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/Users')

// @route POST /api/users
// @desc Register new users
// @access Public
router.post('/', (req, res) => {
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

module.exports = router
