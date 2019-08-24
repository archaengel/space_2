/* eslint-env node, jest */
import {
  saltAndHash,
  genToken,
} from '../utils/helpers'

import {
  logErr,
  logPass,
} from '../utils/testHelpers'

const testUser = {
  name: 'TestBo',
  email: 'testbotestbo@gmail.com',
  password: '123456',
}

describe ('User model', () => {
  it ('can salt and hash', done => {
    const eventualTest = saltAndHash (13) (testUser.password)
      .map (x => expect (typeof (x)).toEqual ('string'))

    eventualTest
      .fork (logErr (done), logPass (done))
  })

  it ('can sign token', done => {
    const eventualTest = genToken ({...testUser, id: '1234'})
      .map (x => expect (typeof x).toEqual ('string'))

    eventualTest
      .fork (logErr (done), logPass (done))
  })
})
