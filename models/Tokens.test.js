/* eslint-env node, es6, jest */
import Token from './Tokens'

const mockToken = new Token ({
  userId: '1234',
  token: '5678',
})

describe ('Token', () => {
  it ('is a valid model', () => {
    expect (mockToken).toHaveProperty ('save')
    expect (typeof mockToken.save).toEqual ('function')
  })
})
