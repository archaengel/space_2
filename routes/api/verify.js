import express from 'express'
import jwt from 'jsonwebtoken'
import * as Future from 'fluture'
import {create, env} from 'sanctuary'
import {env as flutureEnv} from 'fluture-sanctuary-types'
import {
  err,
  getToken,
  getUser,
  maybeToFuture,
} from '../../utils/helpers'

const S = create ({
  checkTypes: true,
  env: env.concat (flutureEnv),
})

const router = express.Router ()

//    verify :: String -> String -> Object
const verify = secret => token => Future.encaseN2 (jwt.verify) (token) (secret)

//           verifyToken :: String -> Object
export const verifyToken = verify (process.env.JWT_SECRET)

//    needsVerifyOr :: Object -> Object -> Future Object Object
const needsVerifyOr = err => user =>
   S.prop ('isVerified') (user) ? Future.reject (err) :
    /* otherwise */               Future.of (user)

// @route   GET /api/verify/:token
// @desc    Display verificationg form
// @access  Public
router.get ('/:token', (req, res) => {
  // Get token
  // Send token to hidden input client side
  const {token} = req.params
  res.json ({token})

})

// @route   POST /api/verify
// @desc    Verify token and email
// @access  Public
router.post ('/', (req, res) => {
  // Change verification status to true and resave user
  const noTokenErr = err
    (400)
    ('We were unable to find a valid token. Your token may have expired.')
  const noUserErr = err
    (400)
    ('We were unable to find a user for this token.')
  const beenVerifiedErr = err
    (400)
    ('This user has already been verified')

  // Validate that token and email provided match
  const {token, email} = req.body

  // Token in db || 'token not found, it may have expired'
  const futToken = getToken ({token})
  .chain (maybeToFuture (noTokenErr))

  // Find assoc user in db || 'User not found for this token', then
  // Check if user is verified || 'This user is already verified'
  const futUser = futToken
  .chain (token => getUser ({_id: token.userId, email}))
  .chain (maybeToFuture (noUserErr))
  .chain (needsVerifyOr (beenVerifiedErr))

  futUser
  .fork (
    e => res.status (e.status).json ({msg: e.message}),
    // If there were no errors, set isVerified to true and save
    user => {
      user.isVerified = true
      user.save ()
      res.json ({msg: 'Your account has been verified, please login.'})
    }
  )
})

export default router
