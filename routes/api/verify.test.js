/* eslint-env node, jest, es6 */
import {verifyToken} from './verify'
import {
  genToken,
} from '../../utils/helpers'
import {
  logErr,
  logPass,
} from '../../utils/testHelpers'

describe ('Verify', () => {
  it ('returns payload of token', done => {
    const futToken = genToken ({email: 'test@mock.kcom'})
    .chain (verifyToken)

    const futTest1 = futToken
    .map (x => expect (x).toHaveProperty ('email'))

    const futTest2 = futToken
    .map (x => expect (x.email).toEqual ('test@mock.kcom'))

    futTest1
    .and (futTest2)
    .fork (logErr (done), logPass (done))
  })
})
