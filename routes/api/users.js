const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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
          if (err) throw err

          newUser.password = hash
          newUser.save()
            .then(savedUser => {
              jwt.sign(
                { id: savedUser.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err

                  const transport = nodemailer.createTransport({ port: process.env.MAIL_PORT })

                  const message = {
                    to: savedUser.email,
                    from: `no-reply@space_II.com`,
                    subject: `{ ${savedUser.name} }, please verify your email.`,
                    html: '<h1>' + token + '</h1>'
                  }

                  transport.sendMail(message)
                    .then((info) => {
                      res.json({
                        token,
                        user: {
                          id: savedUser.id,
                          name: savedUser.name,
                          password: savedUser.password
                        }
                      })
                    })
                    .catch((err) => res.status(400).json({ msg: 'Error sending verification email' }))
                }
              )
            })
            .catch(err => {
              res.status(400).json({ msg: 'Error saving user' })
            })
        })
      })
    })
    .catch(err => res.status(400).json({msg: 'Error creating user' }))
})

module.exports = router
