import mongoose from 'mongoose'
import User from './Users'
import * as Future from 'fluture'
import { create, env } from 'sanctuary'
import { env as flutureEnv } from 'fluture-sanctuary-types'
import bcrypt from 'bcryptjs'
import {
  checkUnique,
  save,
  saltAndHash,
  signToken
} from '../routes/api/users'
import {
  dbOptions,
  uri
} from '../server.js'

const S = create({checkTypes: true, env: env.concat(flutureEnv)})

const testUser = {
  name: 'TestBo',
  email: 'testbotestbo@gmail.com',
  password: '123456'
}

describe('User model', () => {
  beforeAll(() => {
    mongoose.connect(uri, dbOptions)
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

