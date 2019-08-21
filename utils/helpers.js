/* eslint-env es6, node */
// Import dependencies
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Future from 'fluture'
import {env as flutureEnv} from 'fluture-sanctuary-types'
import {create, env} from 'sanctuary'

const S = create ({// Initialize type environment
  checkTypes: true,
  env: env.concat (flutureEnv),
})

import User from '../models/Users'

// toMaybe :: a -> Maybe a
export const toMaybe = x => x === null || x === undefined ? S.Nothing :
  /* otherwise */                                           S.Just (x)

// eitherToFuture :: Either e r -> Future e r
export const eitherToFuture = S.either (Future.reject) (Future.of)

// maybeToFuture :: b -> Maybe a -> Future b a
export const maybeToFuture = left => S.compose
  (eitherToFuture)
  (S.maybeToEither (left))

// getModel :: String -> {} -> Future Error (Maybe {})
export const getModel = model => params => Future ((rej, res) => {
  model
    .findOne ({...params})
    .then (S.compose (res) (toMaybe))
    .catch (rej)
})

// getUser :: {} -> Future Error (Maybe {})
export const getUser = getModel (User)

// eitherNewUser :: {} -> Maybe {} -> Either String {}
const eitherNewUser = user => S.maybe
  (S.Right ({...user}))
  (_ => S.Left ({
    status: 400,
    message: 'User already exists',
  }))

// checkUnique :: {} -> String -> Future Error {}
export const checkUnique = user => S.compose
  (S.chain (S.compose (eitherToFuture) (eitherNewUser (user))))
  (getUser)

// salt :: Number -> Future Error String
const salt = Future.encaseN (bcrypt.genSalt)

// hash :: String -> String -> Future Error String
const hash = Future.encaseN2 (bcrypt.hash)

// saltAndHash :: Number -> String -> Future Error String
export const saltAndHash = n => pw => salt (n).chain (hash (pw))

// save :: {} -> Future Error {}
export const save = model => Future ((rej, res) => {
  model.save ().then (res).catch (rej)
})

//    saveOr :: Object -> Object -> Future Object Object
export const saveOr = error => user => save (user)
  .mapRej (S.K (error))

// signToken :: String -> {} | nil -> {} -> Future Error String
export const signToken = secret => params => user => Future.encaseN3
  (jwt.sign)
  ({id: S.prop ('id') (user)})
  (secret)
  (params)

// genToken :: {} -> Future Error String
export const genToken = signToken (process.env.JWT_SECRET) ({expiresIn: 3600})
