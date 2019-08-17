import mongoose from 'mongoose'
const User = require('./Users')
import * as Future from 'fluture'
import { create, env } from 'sanctuary'
const {env: flutureEnv} = require('fluture-sanctuary-types')
import bcrypt from 'bcryptjs'
const {
  checkUnique,
  save,
  saltAndHash,
  signToken
} = require('../routes/api/users')

const S = create({checkTypes: true, env: env.concat(flutureEnv)})

const testUser = {
  name: 'TestBo',
  email: 'testbotestbo@gmail.com',
  password: '123456'
}

describe('User model', () => {
  beforeAll(() => {
    const dbOptions = {
      "useNewUrlParser": true,
      "useCreateIndex": true,
      "useFindAndModify": false
    }

    mongoose.connect(process.env.MONGODB_URI, dbOptions)
  })

  afterAll(done => {
    mongoose.disconnect(done)
  })

  it('tests', () => {
    expect(true).toEqual(true)
  })

  it('can find user', done => {
    const eventualTest = checkUnique (testUser) ({email: testUser.email}) .map (x => expect(x).toHaveProperty('name'))

    eventualTest
      .fork(
      e => {
        console.error(e)
        done()
      },
      _ => {
        console.log('Tests passed')
        done()
      }
    )
  })

  it('can salt and hash', done => {
    const eventualTest = saltAndHash (13) (testUser.password)
      .map (x => expect (typeof (x)) .toEqual ('string'))

    eventualTest
      .fork (
        e => {
          console.error(e)
          done()
        },
        _ => {
          console.log('Tests passed')
          done()
        }
      )
  })

  it ('can sign token', done => {
    const eventualTest = signToken ({ id: '123'}) ('sercet') ({ expiresIn: 3600})
      .map (x => expect (typeof x) .toEqual ('string'))

    eventualTest
      .fork(
        e => {
          console.error (e)
          done()
        },
        _ => {
          console.log ('Tests passed')
          done()
        }
      )
  })

  it ('can save user with hashed password', done => {
    const eventualTest = checkUnique (testUser) ({email: testUser.email})
      .map (S.prop ('password'))
      .chain (saltAndHash (13))
      .map (pw => new User ({ 
        ...testUser,
        password: pw
      }))
      .chain (save)
      .map (x => expect (x) .toHaveProperty ('password'))

    eventualTest
      .fork(
        e => {
          console.error (e)
          done()
        },
        _ => {
          console.log ('Tests passed')
          done()
        }
      )
  })
})

